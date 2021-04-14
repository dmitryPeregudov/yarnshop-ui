import {Component} from "react";
import {withRouter} from "react-router";

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                    <a className="navbar-brand" href="" onClick={this.roteToMainPage}><img className="img_size" src="img/favicon.png"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav nav_f">
                            <li className="nav-item active ">
                                <a className="nav-link li_nav" href='' onClick={this.roteToMainPage}>Главная <span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Товары
                                </a>
                                {/*//todo fix this to call*/}
                                <div className="dropdown-menu nav_bg" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="Angora.html">Ангора</a>
                                    <a className="dropdown-item" href="Alpaca.html">Альпака</a>
                                    <a className="dropdown-item" href="Wool.html">Шерсть</a>
                                    <a className="dropdown-item" href="Merino.html">Меринос</a>
                                    <a className="dropdown-item" href="Yarn.html">Летняя пряжа</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link li_nav" onClick={this.roteToInfo} href="">О нас</a>
                            </li>
                        </ul>
                        <ul className="ml-auto">
                            <button className="button btn btn-primary"
                                    onClick="document.location='reg.html'">Зарегистрироваться
                            </button>
                            <button className="button btn btn-primary" onClick="document.location='modal.html'">Войти
                            </button>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }

    roteToMainPage = () => {
        this.props.history.push('/')
    }

    roteToInfo = () => {
        this.props.history.push('/info')
    }

}

export default withRouter(Header);