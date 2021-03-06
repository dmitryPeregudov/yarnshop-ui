import {Component} from "react";
import {productService} from "../service/products_service";
import {Button, Modal, NavDropdown, Table} from "react-bootstrap";

class Products extends Component {
    state = {
        productTypeId: '',
        productTypeName: '',
        products: [],
        productTypes: [],
        error: '',
        shouldFetch: false,
        result: '',
        showModalAfterDelete: false,
        modalShow: false,
        addModalShow: false,
        editModalShow: false,
        productIdToRemove: '',
        productNameToRemove: '',
        addProductDescription: '',
        addProductPrice: '',
        addProductWeight: '',
        addProductThickness: '',
        addProductColor: '',
        addProductYarnType: '',
        editProductDescription: '',
        editProductPrice: '',
        editProductWeight: '',
        editProductThickness: '',
        editProductColor: '',
        editProductYarnType: '',
        editProductTypeName: '',
        editProductPicture: '',
        editProductType: {},
        editProductId: ''
    }

    componentDidMount() {
        this.state.productTypeId = this.props.match.params.productTypeId;
        this.state.productTypeName = this.props.match.params.productTypeName;
        this.getProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.productTypeId = this.props.match.params.productTypeId;
        this.state.productTypeName = this.props.match.params.productTypeName;
        if (this.state.shouldFetch) {
            this.setState({shouldFetch: false})
            this.getProducts();
            this.forceUpdate();
        }
    }

    getProducts() {
        productService.getProductsByType(this.state.productTypeId)
            .then(data => data.json())
            .then(products => this.setState({products}))
            .catch(error => {
                this.setState({hasError: true})
            });
        productService.getProducts().then(data => data.json())
            .then(productTypes => this.setState({productTypes}))
            .catch(error => {
                this.setState({hasError: true})
            });
    }

    render() {
        return (
            <div>
                {!this.state.products && this.state.products.length === 0 ?
                    <p>??????-???? ?????????? ???? ??????</p> : this.renderProductView()
                }
            </div>
        )
    }

    renderProductView() {
        return (
            <div>
                <div>
                    <br/>
                    <Button onClick={this.showAddModal}>???????????????? ??????????????</Button>
                    <br/>
                    {this.renderProductModals()}
                    <br/>
                    <Table style={{width:'80%',border:'1px solid black'}}>
                        <thead>
                        <th>
                            <td>
                                ?????? ??????????
                            </td>
                        </th>
                        <th>
                            <td className={"word-wrap"}>
                                ????????????????
                            </td>
                        </th>
                        <th>
                            <td>
                                ????????/ ??????
                            </td>
                        </th>
                        <th>
                            <td>
                                ??????/????
                            </td>
                        </th>
                        <th>
                            <td>
                                ?????????????? ????????
                            </td>
                        </th>
                        <th>
                            <td>
                                ????????
                            </td>
                        </th>
                        <th>
                            <td>
                                ????????????????
                            </td>
                        </th>
                        </thead>
                        <tbody>
                        {this.state.products && this.state.products.map(product => {
                            return (
                                <tr>
                                    <td>{product.yarnType}</td>
                                    <td className={"word-wrap"}>
                                        <NavDropdown title={product.description} id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => this.routeToChangeProduct(product)}>????????????????</NavDropdown.Item>
                                        </NavDropdown>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.weight}</td>
                                    <td>{product.thickness}</td>
                                    <td>{product.color}</td>
                                    <td>
                                    <Button
                                        onClick={() => this.triggerRemoveProductModal(product.id, product.description)}>??????????????</Button>
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

    renderProductModals() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleRemoveProductClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>????????????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>???? ?????????????????????????? ?????????????? ?????????????? ?????????????? {this.state.productNameToRemove}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleRemoveProductClose}>
                            ????????????
                        </Button>
                        <Button variant="primary" onClick={this.removeProduct}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.addModalShow} onHide={this.addModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>???????????????? ??????????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="????????????????"
                                   value={this.state.addProductDescription}
                                   onChange={this.eventChange} name="addProductDescription" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="????????"
                                   value={this.state.addProductPrice}
                                   onChange={this.eventChange} name="addProductPrice" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="??????"
                                   value={this.state.addProductWeight}
                                   onChange={this.eventChange} name="addProductWeight" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="??????????????"
                                   value={this.state.addProductThickness}
                                   onChange={this.eventChange} name="addProductThickness" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="????????"
                                   value={this.state.addProductColor}
                                   onChange={this.eventChange} name="addProductColor" required="required"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.addModalHide}>
                            ????????????
                        </Button>
                        <Button variant="primary" onClick={this.addProduct}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.editModalShow} onHide={this.editModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>???????????????? ??????????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="????????????????"
                                   value={this.state.editProductDescription}
                                   onChange={this.eventChange} name="editProductDescription" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="????????"
                                   value={this.state.editProductPrice}
                                   onChange={this.eventChange} name="editProductPrice" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="??????"
                                   value={this.state.editProductWeight}
                                   onChange={this.eventChange} name="editProductWeight" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="number" className={"form-control"} placeholder="??????????????"
                                   value={this.state.editProductThickness}
                                   onChange={this.eventChange} name="editProductThickness" required="required"/>
                        </div>
                        <div className={"form-group"}>
                            <input type="login" className={"form-control"} placeholder="????????"
                                   value={this.state.editProductColor}
                                   onChange={this.eventChange} name="editProductColor" required="required"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.editModalHide}>
                            ????????????
                        </Button>
                        <Button variant="primary" onClick={this.editProductType}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalAfterDelete} onHide={() => this.handleCloseResult(this)}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>{this.state.result}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleCloseResult(this)}>
                            ????
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    addProduct = async () => {
        this.setState({addModalShow: false});
        let product = {
            productType: {}
        }
        let productType = this.state.productTypes.filter(product => {
            let id = this.state.productTypeId;
            if ('string' === typeof id) {
                try {
                    id = parseInt(id);
                } catch (e) {
                    return false;
                }
            }
            return product.id === id;
        });
        if (productType.length > 0) {
            product.productType = productType[0];
        }
        product.description = this.state.addProductDescription;
        product.price = this.state.addProductPrice;
        product.weight = this.state.addProductWeight;
        product.thickness = this.state.addProductThickness;
        product.color = this.state.addProductColor;
        product.yarnType = this.state.productTypeName;
        product.picture = '';
        let response = await productService.addProduct(product);
        if (response.ok) {
            this.showResultModal("?????????????? ?????????????? ????????????????")
            this.setState({
                productTypeId: '',
                addProductDescription: '',
                addProductPrice: '',
                addProductWeight: '',
                addProductThickness: '',
                addProductColor: '',
                productTypeName: ''
            })
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("??????-???? ?????????? ???? ??????");
                }
                this.showResultModal(json.message)
            });
        }

    }

    showAddModal = () => {
        this.setState({addModalShow: true})
    }

    addModalHide = () => {
        this.setState({
            addModalShow: false, productTypeId: '', addProductDescription: '',
            addProductPrice: '', addProductWeight: '', addProductThickness: '', addProductColor: '', productTypeName: ''
        })
    }

    editModalHide = () => {
        this.setState({
            editModalShow: false,
            editProductDescription: '',
            editProductPrice: '',
            editProductWeight: '',
            editProductThickness: '',
            editProductColor: '',

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
        let product = {
            productType: {}
        }
        let productType = this.state.productTypes.filter(product => {
            let id = this.state.productTypeId;
            if ('string' === typeof id) {
                try {
                    id = parseInt(id);
                } catch (e) {
                    return false;
                }
            }
            return product.id === id;
        });
        if (productType.length > 0) {
            product.productType = productType[0];
        }
        product.description = this.state.editProductDescription;
        product.price = this.state.editProductPrice;
        product.weight = this.state.editProductWeight;
        product.thickness = this.state.editProductThickness;
        product.color = this.state.editProductColor;
        product.yarnType = this.state.editProductTypeName;
        product.picture = this.state.editProductPicture;
        product.id = this.state.editProductId;
        let response = await productService.editProduct(this.state.editProductId, product);
        this.setState({
            editProductDescription: '',
            editProductPrice: '',
            editProductWeight: '',
            editProductThickness: '',
            editProductColor: '',
            editProductPicture: '',
            editProductTypeName: '',

        })
        if (response.ok) {
            this.showResultModal("?????????????? ?????????????? ??????????????")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("??????-???? ?????????? ???? ??????");
                }
                this.showResultModal(json.message)
            });
        }
    }

    removeProduct = async () => {
        this.setState({modalShow: false})
        let response = await productService.removeProduct(this.state.productIdToRemove);
        if (response.ok) {
            this.showResultModal("?????????????? ?????????????? ????????????")
        } else {
            response.json().then(json => {
                if (!json.message) {
                    return this.showResultModal("??????-???? ?????????? ???? ??????");
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

    routeToChangeProduct = (product) => {
        this.setState({
            editModalShow: true,
            editProductDescription: product.description,
            editProductPrice: product.price,
            editProductWeight: product.weight,
            editProductThickness: product.thickness,
            editProductColor: product.color,
            editProductTypeName: product.yarnType,
            editProductPicture: product.picture,
            editProductType: product.productType,
            editProductId: product.id
        })
    }

}

export default Products;