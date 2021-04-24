import {handleSyncResult} from "./responce_handler";

export const OrderService = {
    createOrder
}
const ordersBasePath = '/orders'

async function createOrder(order) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(order)
    };
    return fetch(ordersBasePath, properties).then(data => handleSyncResult(data));
}