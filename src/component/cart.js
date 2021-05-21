import {Component} from "react";
import TokenStorage from "../service/token_storage";
import {Button, Modal, Table} from "react-bootstrap";
import {OrderService} from "../service/order_service";

class Cart extends Component {
    state = {
        storage: new TokenStorage(),
        order: [],
        user: {},
        error: '',
        modalShow: false
    }

    render() {
        return (
            <div>
                {this.hasOrder() ? this.renderCart() : this.renderEmptyPage()}
            </div>
        )
    }

    renderCart() {
        return (
            <div className="container marg_top">
                <div className="row">
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ура</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Ваш заказ добавлен!!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Ок
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Table style={{border:'1px solid black'}} className={'fullWidth'}>
                        <thead className={'fullWidth'}>
                        <th>
                            <td>Тип пряжи</td>
                        </th>
                        <th className={'word-wrap'}>
                            <td>Описание</td>
                        </th>
                        <th>
                            <td>
                                Цена
                            </td>
                        </th>
                        <th>
                            <td>
                                Толщина
                            </td>
                        </th>
                        <th>
                            <td>
                                Цвет
                            </td>
                        </th>
                        <th>
                            <td>
                                Вес
                            </td>
                        </th>
                        <th>
                            <td>
                                Количество
                            </td>
                        </th>
                        <th>
                            <td>Действия</td>
                        </th>
                        </thead>
                        <tbody>
                        {this.state.order && this.state.order.map(order => {
                            return (<tr>
                                    <td>{order.product.yarnType}</td>
                                    <td>{order.product.description}</td>
                                    <td>{order.product.price}грн/{order.product.weight} гр</td>
                                    <td>{order.product.thickness}</td>
                                    <td>{order.product.color}</td>
                                    <td>{order.product.weight}</td>
                                    <td>
                                        <div><Button onClick={() => {
                                            this.decrementQuantity(order, this)
                                        }}>-</Button><input className={'width30'}
                                                            onChange={(event) => this.setQuantity(order, event, this)}
                                                            type='number'
                                                            value={order.quantity}/><Button onClick={() => {
                                            this.incrementQuantity(order, this)
                                        }}>+</Button>
                                        </div>
                                    </td>
                                    <td><Button
                                        onClick={() => this.removeOrder(order.product.id, this)}>Удалить</Button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <div className={'fullWidth'}>
                        <div className={'title_bg'}>Всего: {this.calculatePrice()} грн</div>
                    </div>
                    {this.isUserAuthentificated() && this.isUserRoleCustomer() ?
                        <div className={'center'} onClick={this.createOrder}><Button>Оформить заказ</Button></div>
                        : <div className={'center title_bg'}><p>
                            Войдите чтоб оформить заказ
                        </p></div>}
                    {this.state.error && <p className={"text-danger"}>{this.state.error}</p>}
                </div>
            </div>
        )
    }

    renderEmptyPage() {
        return <div><a>В корзине пусто</a></div>
    }

    componentDidMount() {
        let order = localStorage.getItem("order");
        order = JSON.parse(order);
        this.setState({order})
        let id = this.state.storage.getId();
        let user = {
            id: id
        }
        this.setState({user});
    }

    hasOrder() {
        return this.state.order && this.state.order.length > 0;
    }

    isUserAuthentificated() {
        return this.state.storage.isAuthenticated() && this.state.user.id;
    }

    isUserRoleCustomer() {
        return 'customer' === this.state.storage.getRole();
    }

    calculatePrice() {
        let price = 0;
        this.state.order.map(order => {
            price += order.quantity * order.product.price;
        })
        return price;
    }

    setQuantity(orderItem, event, context) {
        let quantity = event.target.value;
        if ('string' === typeof quantity) {
            try {
                quantity = parseInt(quantity);
            } catch (e) {
                return false;
            }
        }
        if (quantity < 0) {
            return false;
        }
        orderItem.quantity = quantity;
        this.saveOrderToStorage();
        context.forceUpdate();
    }

    incrementQuantity(order, context) {
        order.quantity += 1;
        this.saveOrderToStorage();
        context.forceUpdate();
    }

    decrementQuantity(order, context) {
        if (order.quantity === 0) {
            return
        }
        order.quantity -= 1;
        this.saveOrderToStorage();
        context.forceUpdate();
    }

    saveOrderToStorage() {
        localStorage.setItem("order", JSON.stringify(this.state.order));
    }

    removeOrder = (productId, context) => {
        this.state.order = this.state.order.filter(orderItem => {
            return orderItem.product.id !== productId;
        })
        this.saveOrderToStorage();
        context.forceUpdate();
    }

    createOrder = async () => {
        let user = this.state.user;
        let orderData = this.state.order;
        var order = {
            user: user,
            orderData: orderData
        }
        let response = await OrderService.createOrder(order);
        if (response.ok) {
            this.showModal()
        } else {
            response.json().then(json => this.setState({error: json.message}));
        }
    }

    showModal() {
        localStorage.removeItem("order");
        this.setState({modalShow: true});
    }

    handleClose = () => {
        this.setState({modalShow: false});
        this.props.history.push('/');
    }
}

export default Cart;