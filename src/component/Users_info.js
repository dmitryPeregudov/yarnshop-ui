import {Component} from "react";
import {UserService} from "../service/user_service";
import {Button, Modal} from "react-bootstrap";
import {OrderService} from "../service/order_service";

class UsersInfo extends Component {
    state = {
        users: [],
        modalShow: false,
        userToRemove: '',
        userIdToRemove: '',
        result: '',
        showModalAfterDelete: false,
        shouldUpdate: false
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.shouldUpdate) {
            this.setState({shouldUpdate: false})
            this.fetchAllUsers();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="container marg_top">
                <div className="row">
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Внимание</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы действительно желаете удалить пользователя {this.state.userToRemove}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Отмена
                            </Button>
                            <Button variant="primary" onClick={this.removeUser}>
                                Ок
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showModalAfterDelete} onHide={() => this.handleCloseResult(this)}>
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <Modal.Body>{this.state.result}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleCloseResult(this)}>
                                Ок
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <table className={'fullWidth'}>
                        <thead className={'fullWidth'}>
                        <th>
                            <td>Логин</td>
                        </th>
                        <th>
                            <td>Имя</td>
                        </th>
                        <th>
                            <td>Отчество</td>
                        </th>
                        <th>
                            <td>Фамилия</td>
                        </th>
                        <th>
                            <td>Адресс</td>
                        </th>
                        <th>
                            <td>Email</td>
                        </th>
                        <th>
                            <td>Роль</td>
                        </th>
                        <th>
                            <td>Действия</td>
                        </th>
                        </thead>
                        <tbody>
                        {this.state.users && this.state.users.map(user => {
                            return (
                                <tr>
                                    <td>{user.login}</td>
                                    <td>{user.name}</td>
                                    <td>{user.middleName}</td>
                                    <td>{user.surName}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    {
                                        this.isUserNotCustomer(user) ?
                                            <td><Button
                                                onClick={() => this.triggerRemoveUserModal(user.id, user.login)}>Удалить</Button>
                                            </td>
                                            : null
                                    }
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    triggerRemoveUserModal(id, login) {
        this.setState({userToRemove: login, modalShow: true, userIdToRemove: id})
    }

    isUserNotCustomer = (user) => {
        return user.role.name !== "customer"
    }

    handleClose = () => {
        this.setState({modalShow: false, userToRemove: '', userIdToRemove: ''});
    }

    removeUser = async () => {
        this.setState({modalShow: false})
        let response = await UserService.removeUser(this.state.userIdToRemove);
        if (response.ok) {
            this.showModal("Пользователь успешно удален")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showModal("Что-то пошло не так");
                }
                this.showModal(json.message)
            });
        }
    }

    showModal(message) {
        this.setState({result: message, showModalAfterDelete: true});
    }

    handleCloseResult = (context) => {
        context.setState({showModalAfterDelete: false, shouldUpdate: true});
    }

    fetchAllUsers() {
        UserService.getAllUsers()
            .then(data => data.json())
            .then(users => this.setState({users: users}))
            .catch(error => {
                error = 'Что-то пошло не так'
                this.setState({error})
            });
    }
}

export default UsersInfo;