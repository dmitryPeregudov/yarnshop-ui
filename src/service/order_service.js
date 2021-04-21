import {handleResult} from "./responce_handler";

export const OrderService = {
    createOrder
}
const ordersBasePath = 'orders'

function createOrder(order) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    };
    return fetch(ordersBasePath, properties).then(data => handleResult(data));
}