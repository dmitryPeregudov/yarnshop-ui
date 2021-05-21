import {Component} from "react";
import {productService} from "../service/products_service";
import {Button, Modal, NavDropdown, Table} from "react-bootstrap";

class Product_types extends Component {

    state = {
        products: [],
        error: '',
        shouldFetch: false,
        result: '',
        showModalAfterDelete: false,
        modalShow: false,
        addModalShow: false,
        editModalShow: false,
        productIdToEdit: '',
        productNameToEdit: '',
        productInfoToEdit: '',
        productIdToRemove: '',
        productNameToRemove: '',
        addProductInfo: '',
        addProductName: ''
    }

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.shouldFetch) {
            this.setState({shouldFetch: false})
            this.getProducts();
            this.forceUpdate();
        }
    }

    getProducts() {
        productService.getProducts()
            .then(data => data.json())
            .then(products => this.setState({products}))
            .catch(error => {
                this.setState({hasError: true})
            })
    }

    render() {
        return (
            <div>
                {!this.state.products && this.state.products.length === 0 ?
                    <p>Что-то пошло не так</p> : this.renderProductView()
                }
            </div>
        )
    }

    renderProductView() {
        return (
            <div className="container marg_top">
                <div className="row">
                    <Button onClick={this.showAddModal}>Добавить продуктовую Линию</Button>
                    {this.renderModals()}
                    <Table style={{border:'1px solid black'}} className={'fullWidth'}>
                        <thead className={'fullWidth'}>
                        <th>
                            <td className={"width30"}>
                                Имя
                            </td>
                        </th>
                        <th>
                            <td>
                                Описание
                            </td>
                        </th>
                        <th>
                            <td>
                                Действия
                            </td>
                        </th>
                        </thead>
                        <tbody>
                        {this.state.products && this.state.products.map(product => {
                            return (
                                <tr>
                                    <td>
                                        <NavDropdown title={product.name} id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => this.routeToProducts(product.id, product.name)}>Продукты</NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => this.routeToChangeProductType(product.id, product.name, product.info)}>Изменить</NavDropdown.Item>
                                        </NavDropdown>
                                    </td>
                                    <td>{product.info}</td>
                                    <td>
                                    <Button
                                        onClick={() => this.triggerRemoveProductModal(product.id, product.name)}>Удалить</Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    renderModals() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleRemoveProductClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Внимание</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно желаете удалить продукт {this.state.productNameToRemove}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleRemoveProductClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.removeProductType}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.addModalShow} onHide={this.addModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить продукт</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="Имя линии"
                                   value={this.state.addProductName}
                                   onChange={this.eventChange} name="addProductName" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="Описание"
                                   value={this.state.addProductInfo}
                                   onChange={this.eventChange} name="addProductInfo" required="required"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.addModalHide}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.addProductType}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.editModalShow} onHide={this.editModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить продукт</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="Имя линии"
                                   value={this.state.productNameToEdit}
                                   onChange={this.eventChange} name="productNameToEdit" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="Описание"
                                   value={this.state.productInfoToEdit}
                                   onChange={this.eventChange} name="productInfoToEdit" required="required"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.editModalHide}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.editProductType}>
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
            </div>
        )
    }

    addProductType = async () => {
        this.setState({addModalShow: false});
        let response = await productService.addProductType(this.state.addProductName, this.state.addProductInfo);
        if (response.ok) {
            this.showResultModal("Продукт успешно добавлен")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("Что-то пошло не так");
                }
                this.showResultModal(json.message)
            });
        }

    }

    showAddModal = () => {
        this.setState({addModalShow: true})
    }

    addModalHide = () => {
        this.setState({addModalShow: false, addProductInfo: '', addProductName: ''})
    }

    editModalHide = () => {
        this.setState({
            editModalShow: false,
            productIdToEdit: '',
            productNameToEdit: '',
            productInfoToEdit: '',
        })
    }

    triggerRemoveProductModal(id, productName) {
        this.setState({productNameToRemove: productName, modalShow: true, productIdToRemove: id})
    }

    handleRemoveProductClose = () => {
        this.setState({modalShow: false, productNameToRemove: '', productIdToRemove: ''});
    }

    editProductType = async () => {
        this.setState({editModalShow: false})
        let response = await productService.editProductType(this.state.productIdToEdit,
            this.state.productNameToEdit, this.state.productInfoToEdit);
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

    removeProductType = async () => {
        this.setState({modalShow: false})
        let response = await productService.removeProductType(this.state.productIdToRemove);
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

    showResultModal(message) {
        this.setState({result: message, showModalAfterDelete: true});
    }

    handleCloseResult = (context) => {
        context.setState({showModalAfterDelete: false, shouldFetch: true});
    }

    eventChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    routeToProducts = (id, name) => {
        this.props.history.push("/products/" + id + '/' + name)
    }
    routeToChangeProductType = (id, name, info) => {
        this.setState({
            editModalShow: true,
            productIdToEdit: id,
            productNameToEdit: name,
            productInfoToEdit: info,
        })
    }
}

export default Product_types