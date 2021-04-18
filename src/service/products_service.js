import {handleResult} from "./responce_handler";

export const productService = {
    getProducts
}
const productPath = '/productTypes'

function getProducts() {
    return fetch(productPath).then(data => handleResult(data));
}