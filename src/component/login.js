import {Component} from "react";
import TokenStorage from "../service/token_storage";
import {tokenService} from "../service/token_service";

class Login extends Component {
    tokenStorage = new TokenStorage();
    state = {
        login: '',
        password: '',
        error: '',
    };

    constructor(props) {
        super(props);
        if (this.tokenStorage.getRole()) {
            this.tokenStorage.logout();
        }
    }

    render() {
        return (
            <div className="container_log">
                <div className={"form-group"}>
                    <table>
                        <tr className="table_marg">
                            <td className="center">
                                <p className=" nav_f"> Авторизация</p>
                            </td>
                        </tr>
                        <tr>
                            <td><input name="login" placeholder="Логин" value={this.state.login}
                                       onChange={this.eventChange} type="login"/></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" name="password" placeholder="Пароль" value={this.state.password}
                                       onChange={this.eventChange} required="required"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary" onClick={this.login}>Войти</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.error && <p className={"text-danger"}>{this.state.error}</p>}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }

    login = () => {
        tokenService.getToken(this.state.login, this.state.password)
            .then(user => {
                this.props.history.push('/');
            }, error => {
                this.setState({error: 'Неверный логин или пароль'})
            })
    };

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    };


}

export default Login