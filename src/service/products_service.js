import {handleResult, handleSyncResult} from "./responce_handler";

export const productService = {
    getProducts: getProductTypes,
    getProductsByType,
    removeProductType,
    addProductType,
    editProductType,
    addProduct,
    removeProduct,
    editProduct
}
const productTypesPath = '/productTypes'
const productBasePath = '/products'
const basicSellerProductTypesPath = '/seller/productTypes'
const basicSellerProductsPath = '/seller/products'

function getProductTypes() {
    return fetch(productTypesPath).then(data => handleResult(data));
}

function getProductsByType(id) {
    return fetch(productBasePath + '/type/' + id).then(data => handleResult(data));
}

function removeProductType(id) {
    const properties = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(basicSellerProductTypesPath + '/' + id, properties).then(data => handleSyncResult(data));
}

function addProductType(name, info) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            name, info
        })
    };
    return fetch(basicSellerProductTypesPath, properties).then(data => handleSyncResult(data));
}

function editProductType(id, name, info) {
    const properties = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            id, name, info
        })
    };
    return fetch(basicSellerProductTypesPath + '/' + id, properties).then(data => handleSyncResult(data));
}

function addProduct(product) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(product)
    };
    return fetch(basicSellerProductsPath, properties).then(data => handleSyncResult(data));
}

function removeProduct(id) {
    const properties = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(basicSellerProductsPath + '/' + id, properties).then(data => handleSyncResult(data));
}

function editProduct(id, prodoct) {
    const properties = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(prodoct)
    };
    return fetch(basicSellerProductsPath + '/' + id, properties).then(data => handleSyncResult(data));
}