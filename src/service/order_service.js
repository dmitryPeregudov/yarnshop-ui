import {handleResult, handleSyncResult} from "./responce_handler";

export const OrderService = {
    createOrder,
    getAllOrders,
    deleteOrder,
    updateOrderStatus,
    getOrderById
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

function getAllOrders() {
    const properties = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(ordersBasePath, properties).then(data => handleResult(data));
}

function updateOrderStatus(id, statusId) {
    const properties = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(ordersBasePath + '/' + id + '/' + statusId, properties)
        .then(data => handleSyncResult(data));
}

function deleteOrder(id) {
    const properties = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(ordersBasePath + '/' + id, properties).then(data => handleSyncResult(data));
}

function getOrderById(id) {
    const properties = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    }
    return fetch(ordersBasePath + '/' + id, properties).then(data => handleResult(data));
}