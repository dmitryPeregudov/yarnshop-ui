import {Component} from "react";
import {validate} from "../validation/edit_user_info_validation";
import {UserService} from "../service/user_service";

class ChangeInfo extends Component {
    state = {
        id: '',
        name: '',
        middleName: '',
        surName: '',
        address: '',
        email: '',
        post: '',
        dateOfBirth: '',
        error: ''
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id;
        this.getUserInfo();
    }

    render() {
        return (
            <div className={"container"}>
                <img alt="oops" src={process.env.PUBLIC_URL + 'img/Alpaca.jpg'}/>
                <div className="center">
                    <table className="center">
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Имя"
                                           value={this.state.name}
                                           onChange={this.eventChange} name="name" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Отчество"
                                           value={this.state.middleName}
                                           onChange={this.eventChange} name="middleName" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Фамилия"
                                           value={this.state.surName}
                                           onChange={this.eventChange} name="surName" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Адрес"
                                           value={this.state.address}
                                           onChange={this.eventChange} name="address" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="email" className={"form-control"} placeholder="Email"
                                           value={this.state.email}
                                           onChange={this.eventChange} name="email" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Почта"
                                           value={this.state.post}
                                           onChange={this.eventChange} name="post" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input onChange={this.eventChange} type="date" className={"form-control"}
                                           placeholder="Дата рождения"
                                           name="dateOfBirth" value={this.state.dateOfBirth}/>
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
                                        onClick={this.editUser}>Сохранить
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

    editUser = () => {
        let error = validate(this.state.name, this.state.middleName,
            this.state.surName, this.state.address, this.state.email, this.state.post);
        if (!error) {
            UserService.changeInfo(this.state.name, this.state.middleName, this.state.surName,
                this.state.address, this.state.email,
                this.state.post, this.state.dateOfBirth, this.state.id)
                .then(response => response.json())
                .then(data => {
                    this.props.history.push('/')
                })
                .catch(throwable => {
                    throwable.json().then(json => this.setState({error: json.message}));
                })
        } else this.setState({error})
    }

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    getUserInfo() {
        UserService.findUserById(this.state.id)
            .then(data => data.json())
            .then(user => {
                this.setState({name: user.name});
                this.setState({middleName: user.middleName})
                this.setState({surName: user.surName})
                this.setState({address: user.address})
                this.setState({email: user.email})
                this.setState({post: user.post})
                this.setState({dateOfBirth: user.dateOfBirth})
            })
            .catch(error => {
            })

    }
}

export default ChangeInfo;