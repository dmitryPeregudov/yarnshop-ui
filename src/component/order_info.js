import {Component} from "react";
import {OrderService} from "../service/order_service";

class Order_info extends Component {
    state = {
        id: '',
        order: {},
        hasError: false
    }

    componentDidMount() {
        this.changeState();
    }

    changeState() {
        this.state.id = this.props.match.params.id;
        this.getOrder();
    }

    getOrder() {
        OrderService.getOrderById(this.state.id)
            .then(data => data.json())
            .then(order => this.setState({order}))
            .catch(error => {
                this.setState({hasError: true})
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.hasError ?
                        <a1>Что-то пошло не так</a1> :
                        this.renderOrderInfo()
                }
            </div>
        )
    }

    renderOrderInfo() {
        return (
            <div className="container marg_top">
                <div className="row">
                    {this.state.order.user ?
                        <div>
                            <h2>Информация о пользователе</h2>
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
                                    <td>Адресс почты</td>
                                </th>
                                <th>
                                    <td>Дата рождения</td>
                                </th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{this.state.order.user.login}</td>
                                    <td>{this.state.order.user.name}</td>
                                    <td>{this.state.order.user.middleName}</td>
                                    <td>{this.state.order.user.surName}</td>
                                    <td>{this.state.order.user.address}</td>
                                    <td>{this.state.order.user.email}</td>
                                    <td>{this.state.order.user.post}</td>
                                    <td>{this.state.order.user.dateOfBirth}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        : <div/>
                    }
                    <br/>
                    <h2>Информация о заказе</h2>
                    <table className={'fullWidth'}>

                        <thead className={'fullWidth'}>
                        <th>
                            <td>
                                Тип пряжи
                            </td>
                        </th>
                        <th>
                            <td className={"word-wrap"}>
                                Описание
                            </td>
                        </th>
                        <th>
                            <td>
                                Цена/ грн
                            </td>
                        </th>
                        <th>
                            <td>
                                Вес/гр
                            </td>
                        </th>
                        <th>
                            <td>
                                Толщина нити
                            </td>
                        </th>
                        <th>
                            <td>
                                Цвет
                            </td>
                        </th>
                        <th>
                            <td>
                                Количество
                            </td>
                        </th>
                        </thead>
                        <tbody>

                        {this.state.order.orderData && this.state.order.orderData.map(order => {
                            return (
                                <tr>
                                    <td>{order.product.yarnType}</td>
                                    <td className={"word-wrap"}>
                                        {order.product.description}
                                    </td>
                                    <td>{order.product.price}</td>
                                    <td>{order.product.weight}</td>
                                    <td>{order.product.thickness}</td>
                                    <td>{order.product.color}</td>
                                    <td>{order.quantity}</td>
                                </tr>
                            )
                        })}
                        <br/>
                        {this.state.order.orderStatus ?
                            <div className={"inline"}>
                                <a>Статус: </a>
                                <a>{this.state.order.orderStatus.name}</a>
                            </div>
                            : <div/>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Order_info;
