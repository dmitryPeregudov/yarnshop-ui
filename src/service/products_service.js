import {handleResult} from "./responce_handler";

export const productService = {
    getProducts: getProductTypes,
    getProductsByType
}
const productTypesPath = '/productTypes'
const productBasePath = '/products'

function getProductTypes() {
    return fetch(productTypesPath).then(data => handleResult(data));
}

function getProductsByType(id) {
    return fetch(productBasePath + '/type/' + id).then(data => handleResult(data));
}