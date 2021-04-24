import {Component} from "react";
import {validate} from "../validation/new_user_validation";
import {UserService} from "../service/user_service";
import {Button, Modal} from "react-bootstrap";

class CreateAdmin extends Component {
    state = {
        login: '',
        password: '',
        passwordConfirm: '',
        name: '',
        middleName: '',
        surName: '',
        address: '',
        email: '',
        post: '',
        dateOfBirth: '',
        role: '3',
        error: '',
        modalShow: false
    }

    render() {
        return (
            <div className={"container"}>
                <div className="center">
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ура</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Пользователь создан!!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Ок
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <table className="center">
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input type="login" className={"form-control"} placeholder="Логин"
                                           value={this.state.login}
                                           onChange={this.eventChange} name="login" required="required"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"form-group"}>
                                    <input className={"form-control"} type="password" placeholder="Пароль"
                                           value={this.state.password}
                                           onChange={this.eventChange} name="password" required="required"/>
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
                                <div className={"form-group"}>
                                    <p>Роль</p>
                                    <select className={'fullWidth'} name="role" value={this.state.role}
                                            onChange={this.eventChange}>
                                        <option key={3} value={3}>
                                            seller
                                        </option>
                                        <option key={1} value={1}>
                                            admin
                                        </option>
                                    </select>
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
                                        onClick={this.addUser}>Создать
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

    addUser = async () => {
        this.setState({error: ''})
        let error = validate(this.state.login, this.state.password, this.state.passwordConfirm,
            this.state.name, this.state.middleName,
            this.state.surName, this.state.address, this.state.email, this.state.post)
        if (!error) {
            let role = {
                id: this.state.role
            }
            let response = await UserService.createAdminUser(this.state.login, this.state.password, this.state.name,
                this.state.middleName, this.state.surName,
                this.state.address, this.state.email, this.state.post, this.state.dateOfBirth, role)
            if (response.ok) {
                this.showModal()
            } else {
                if (response.status === 400) {
                    error = "Пользователь уже создан"
                } else {
                    error = 'Что-то пошло не так'
                }
                this.setState({error})
            }
        } else this.setState({error})
    }

    showModal() {
        this.setState({modalShow: true})
    }

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    handleClose = () => {
        this.setState({modalShow: false});
        localStorage.removeItem("order");
        this.props.history.push('/');
    }
}

export default CreateAdmin;