import {Component} from "react";
import {OrderService} from "../service/order_service";
import {Button, Modal, NavDropdown} from "react-bootstrap";

class Orders extends Component {
    state = {
        orders: [],
        shouldRefetch: false,
        newStatusModalShow: false,
        deleteOrderModalShow: false,
        orderIdToChange: '',
        newStatus: 0,
        result: '',
        showModal: false
    }

    componentDidMount() {
        this.getAllOrders();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.shouldRefetch) {
            this.setState({shouldRefetch: false})
            this.getAllOrders();
            this.forceUpdate();
        }
    }

    getAllOrders() {
        OrderService.getAllOrders()
            .then(data => data.json())
            .then(orders => this.setState({orders}))
            .catch(error => {
                this.setState({hasError: true})
            });
    }

    render() {
        return (
            <div>
                {!this.state.orders && this.state.products.orders === 0 ?
                    <p>Что-то пошло не так</p> : this.renderOrdersView()
                }
            </div>
        )
    }

    renderOrdersView() {
        return (
            <div className="container marg_top">
                <div className="row">
                    {this.renderModals()}
                    <table className={'fullWidth'}>
                        <thead className={'fullWidth'}>
                        <th>
                            <td>
                                ID
                            </td>
                        </th>
                        <th>
                            <td className={"word-wrap"}>
                                Пользователь
                            </td>
                        </th>
                        <th>
                            <td>
                                Сумма
                            </td>
                        </th>
                        <th>
                            <td>
                                Статус
                            </td>
                        </th>
                        <th>
                            <td>
                                Действия
                            </td>
                        </th>
                        </thead>
                        <tbody>
                        {this.state.orders && this.state.orders.map(order => {
                            return (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.user.login}</td>
                                    <td>{this.calculateTotal(order)} грн</td>
                                    <td>{order.orderStatus.name}</td>
                                    <td><Button onClick={() => this.showChangeStatusModal(order.id)}
                                                disabled={this.shouldDisableUpdateButtons(order.orderStatus.id)}>Изменить
                                        статус</Button>
                                        <Button onClick={() => this.showDeleteModal(order.id)}
                                                disabled={this.shouldDisableUpdateButtons(order.orderStatus.id)}>Удалить</Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderModals() {
        return (
            <div>
                <Modal show={this.state.deleteOrderModalShow} onHide={this.handleRemoveOrderClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Внимание</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно желаете удалить заказ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleRemoveOrderClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.removeOrder}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.newStatusModalShow} onHide={this.handleNewStatusCLose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Выберите статус</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-group"}>
                            <select className={'fullWidth'} name="newStatus" value={this.state.newStatus}
                                    onChange={this.eventChange}>
                                <option key={0} value={0}/>
                                <option key={1} value={1}>
                                    PROCESSING
                                </option>
                                <option key={2} value={2}>
                                    SENT
                                </option>
                                <option key={3} value={3}>
                                    DONE
                                </option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleNewStatusCLose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.updateStatus}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showModal} onHide={() => this.handleCloseResult(this)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>{this.state.result}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleCloseResult(this)}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal></div>)
    }

    showDeleteModal(id) {
        this.setState({orderIdToChange: id, deleteOrderModalShow: true})
    }

    removeOrder = async () => {
        this.setState({deleteOrderModalShow: false})
        let response = await OrderService.deleteOrder(this.state.orderIdToChange);
        if (response.ok) {
            this.showResultModal("Продукт успешно удален")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("Что-то пошло не так");
                }
                this.showResultModal(json.message)
            });
        }
    }

    handleRemoveOrderClose = () => {
        this.setState({deleteOrderModalShow: false, orderIdToChange: 0})
    }

    handleNewStatusCLose = () => {
        this.setState({newStatusModalShow: false, newStatus: 0})
    }

    showChangeStatusModal = (id) => {
        this.setState({orderIdToChange: id, newStatusModalShow: true})
    }

    updateStatus = async () => {
        this.setState({newStatusModalShow: false, newStatus: 0, orderIdToChange: 0})
        let response = await OrderService.updateOrderStatus(this.state.orderIdToChange, this.state.newStatus)
        if (response.ok) {
            this.showResultModal("Продукт успешно изменен")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("Что-то пошло не так");
                }
                this.showResultModal(json.message)
            });
        }
    }

    showResultModal(message) {
        this.setState({result: message, showModal: true});
    }

    handleCloseResult = (context) => {
        context.setState({showModal: false, shouldRefetch: true});
    }

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    calculateTotal(order) {
        let products = order.orderData;
        if (!products || products.length === 0) {
            return 0;
        } else {
            let total = 0;
            products.forEach(product => {
                let quantity = product.quantity;
                let price = product.product.price;
                if ('string' === typeof quantity) {
                    try {
                        quantity = parseInt(quantity);
                    } catch (e) {
                        return false;
                    }
                }
                if ('string' === typeof price) {
                    try {
                        price = parseInt(price);
                    } catch (e) {
                        return false;
                    }
                }
                total += quantity * price;
            })
            return total;
        }
    }

    shouldDisableUpdateButtons(statusId) {
        let id = statusId;
        if ('string' === typeof id) {
            try {
                id = parseInt(id);
            } catch (e) {
                return false;
            }
        }
        return 4 === id || 3 === id;
    }
}

export default Orders;