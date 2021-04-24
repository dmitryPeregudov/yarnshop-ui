import {Component} from "react";
import {validate} from "../validation/change_password_validation";
import {UserService} from "../service/user_service";

class ChangePassword extends Component {
    state = {
        id: '',
        oldPassword: '',
        newPassword: '',
        passwordConfirm: '',
        error: ''
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id;
    }

    render() {
        return (
            <div className={"container"}>
                <div className="center">
                    <table className="center">
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input className={"form-control"} type="password" placeholder="Старый Пароль"
                                           value={this.state.oldPassword}
                                           onChange={this.eventChange} name="oldPassword" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input className={"form-control"} type="password" placeholder="Новый Пароль"
                                           value={this.state.newPassword}
                                           onChange={this.eventChange} name="newPassword" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input className={"form-control"} type="password" placeholder="Подтвердите пароль"
                                           value={this.state.passwordConfirm}
                                           onChange={this.eventChange} name="passwordConfirm" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.error && <p className={"text-danger"}>{this.state.error}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary center"
                                        onClick={this.changePassword}>Сменить
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

    changePassword = async () => {
        let error = validate(this.state.newPassword, this.state.passwordConfirm)
        if (!error) {
            let result = await UserService.changePassword(this.state.oldPassword, this.state.newPassword, this.state.id);
            if (result.ok) {
                this.props.history.push('/')
            } else {
                result.json().then(json => this.setState({error: json.message}));
            }
        } else
            this.setState({error})
    }

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
}

export default ChangePassword