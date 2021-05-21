import {Component} from "react";
import {Button, Card} from "react-bootstrap";
import TokenStorage from "../service/token_storage";
import {productService} from "../service/products_service";

class Product extends Component {

    state = {
        id: '',
        productName: '',
        storage: new TokenStorage(),
        productList: [],
        error: ''
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.id) {
            this.changeState()
        }
    }

    componentDidMount() {
        this.changeState();
    }

    changeState() {
        this.state.id = this.props.match.params.id;
        this.state.productName = this.props.match.params.productName;
        this.getProducts();
    }

    render() {
        return (
            <div>
                <center><span className="title_bg">{this.state.productName}</span></center>
                <div>
                    {this.state.error && <p className={"text-danger"}>{this.state.error}</p>}
                </div>
                <div className="container marg_top">
                    <div className="row">
                        {this.state.productList && this.state.productList.map(product => {
                            return (<div className="col-xl-3 col-lg-4 col-sm-6">
                                <Card>
                                    <Card style={{width: '18rem'}}>
                                        <Card.Img className={'size scale'} variant="top"
                                                  src={"../../" + product.picture}/>
                                        <Card.Body >
                                            <Card.Title>{product.yarnType}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted nav_f">{product.price} грн
                                                /{product.weight} г</Card.Subtitle>
                                            <Card.Text className={'smallfont'}>{product.description}</Card.Text>
                                            <Button variant="primary"
                                                    onClick={(event) => this.addProductToBash(product, event, this)}>
                                                {this.isProductAddedToOrder(product) ? "Удалить" : "Добавить в корзину"}</Button>
                                        </Card.Body>
                                    </Card>
                                </Card>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }

    getProducts() {
        productService.getProductsByType(this.state.id)
            .then(data => data.json())
            .then(productList => {
                if (!productList || productList.length === 0) {
                    this.setState({error: 'ПУСТО'})
                } else {
                    this.setState({productList})
                }
            })
            .catch(error => {
                this.setState({error: 'Что-то пошло не так'})
            })
    }

    addProductToBash(product, event, context) {
        let orders = localStorage.getItem("order");
        let orderData = {
            product: product,
            quantity: 1
        }
        if (orders && orders.length !== 0) {
            orders = JSON.parse(orders);
            if (!this.isProductAddedToOrder(product)) {

                orders.push(orderData);
            } else if (event.target.textContent === "Удалить") {
                orders = orders.filter(function (order) {
                    return order.product.id !== product.id;
                })
            } else {

                return;
            }
        } else {
            orders = [];
            orders.push(orderData);
        }
        localStorage.setItem("order", JSON.stringify(orders))
        context.forceUpdate();
    }

    isProductAddedToOrder(product) {
        let orders = localStorage.getItem("order");
        if (!orders || orders.length === 0) {
            return false
        }
        orders = JSON.parse(orders);
        return orders.find(function (order) {
            return order.product.id === product.id;
        })
    }
}

export default Product;