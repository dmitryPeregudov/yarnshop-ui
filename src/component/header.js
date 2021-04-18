import {Component} from "react";
import {withRouter} from "react-router";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {productService} from "../service/products_service";
import TokenStorage from "../service/token_storage";

class Header extends Component {
    state = {
        storage: new TokenStorage(),
        products: [],
        productLoaded: false,
        hasError: false,
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        productService.getProducts()
            .then(data => data.json())
            .then(products => this.setState({products}))
            .then(this.setState({productLoaded: true}))
            .catch(error => {
                this.setState({hasError: true})
            })
    }

    render() {
        return (
            <header className="navbar navbar-expand-lg navbar-dark bg-primary ">
                <div className={'fullWidth'}>
                    <Navbar expand="lg" className={"fullWidth"}>
                        <Navbar.Collapse id="basic-navbar-nav"
                                         className="navbar navbar-expand-lg navbar-dark bg-primary fullWidth ">
                            <Nav className="mr-auto fullWidth">
                                <a className="navbar-brand" href="" onClick={this.roteToMainPage}><img
                                    className="img_size"
                                    src="img/favicon.png"/></a>
                                <Nav.Link href="/">Главная</Nav.Link>
                                {this.state.productLoaded ?
                                    <NavDropdown title="Товары" id="basic-nav-dropdown">
                                        <div>
                                            {this.state.products && this.state.products.map(product =>
                                                <NavDropdown.Item key={product.id}
                                                                  onClick={() => this.routeToProduct(product.id)}>{product.name}</NavDropdown.Item>
                                            )}
                                        </div>
                                    </NavDropdown>
                                    : null}
                                <Nav.Link href="/info">О нас</Nav.Link>
                                <div className={"displayRight displayInline"}>
                                    {this.state.storage.isAuthenticated() ?
                                        <NavDropdown title={this.state.storage.getFirstName()} id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/changePassword">Сменить пароль</NavDropdown.Item>
                                            <NavDropdown.Item href="/changeInfo">Сменить информацию</NavDropdown.Item>
                                            <NavDropdown.Item href="/logout">Выйти</NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        <div className='displayInline'>
                                            <Nav.Link href="/register">Зарегистрироваться</Nav.Link>
                                            <Nav.Link href="/login">Войти</Nav.Link>
                                        </div>}
                                    <Nav.Link href="/basket" className={"displayRight"}>Корзина</Nav.Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
        )
    }

    roteToMainPage = () => {
        this.props.history.push('/')
    }

    roteToInfo = () => {
        this.props.history.push('/info')
    }
    routeToProduct = (productName) => {
        this.props.history.push('/product?product=' + productName)
    }

}

export default withRouter(Header);