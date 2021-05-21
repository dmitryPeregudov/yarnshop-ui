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
            <header className=" navbar navbar-expand-lg navbar-dark bg-primary ">
                <div className={'fullWidth'}>
                    <Navbar expand="lg" className={"fullWidth"}>
                        <Navbar.Collapse id="basic-navbar-nav"
                                         className="navbar navbar-expand-lg navbar-dark bg-primary fullWidth ">
                            <Nav className="mr-auto fullWidth">
                                <a className="navbar-brand" href="" onClick={this.roteToMainPage}><img
                                    className="img_size"
                                    src="img/favicon.png"/></a>
                                <Nav.Link href="/">Главная</Nav.Link>
                                {!(this.isAdminUser() || this.isSellerUser()) && this.state.productLoaded ?
                                    <NavDropdown title="Товары" id="basic-nav-dropdown">
                                        <div>
                                            {this.state.products && this.state.products.map(product =>
                                                <NavDropdown.Item key={product.id}
                                                                  onClick={() => this.routeToProduct(product.id, product.name)}>{product.name}</NavDropdown.Item>
                                            )}
                                        </div>
                                    </NavDropdown>
                                    : null}
                                <Nav.Link href="/info">О нас</Nav.Link>
                                <div className={"displayRight displayInline"}>
                                    {this.isSellerUser() ? this.renderSellerLinks() : null}
                                    {this.isAdminUser() ?
                                        <div className='displayInline'><Nav.Link href="/createAdminUser">Добавить
                                            управляющего</Nav.Link>
                                            <Nav.Link href={"/users"}>Пользователи</Nav.Link></div>
                                        : null}
                                    {this.state.storage.isAuthenticated() ?
                                        <NavDropdown title={this.state.storage.getFirstName()} id="basic-nav-dropdown">
                                            <NavDropdown.Item onClick={this.routeToChangePassword}>Сменить
                                                пароль</NavDropdown.Item>
                                            <NavDropdown.Item onClick={this.routeToChangeInfo}>Сменить
                                                информацию</NavDropdown.Item>
                                            <NavDropdown.Item href="/logout">Выйти</NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        <div className='displayInline'>
                                            <Nav.Link href="/register">Зарегистрироваться</Nav.Link>
                                            <Nav.Link href="/login">Войти</Nav.Link>
                                        </div>}
                                    {!(this.isAdminUser() || this.isSellerUser()) ?
                                        <Nav.Link href="/cart" className={"displayRight"}>Корзина</Nav.Link> : null}
                                    <Nav.Link href={"/forum"}>Форум</Nav.Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
        )
    }

    renderSellerLinks() {
        return (
            <div className='displayInline'><Nav.Link href="/productTypes">Продукты</Nav.Link>
                <Nav.Link href={"/orders"}>Заказы</Nav.Link></div>

        )
    }

    isAdminUser() {
        return this.state.storage.getRole() === "admin";
    }

    isSellerUser() {
        return this.state.storage.getRole() === "seller";
    }

    roteToMainPage = () => {
        this.props.history.push('/')
    }

    roteToInfo = () => {
        this.props.history.push('/info')
    }
    routeToProduct = (id, productName) => {
        this.props.history.push('/product/' + id + '/' + productName)
    }

    routeToChangePassword = () => {
        this.props.history.push("/changePassword/" + this.state.storage.getId())
    }
    routeToChangeInfo = () => {
        this.props.history.push("/changeInfo/" + this.state.storage.getId());
    }

}

export default withRouter(Header);