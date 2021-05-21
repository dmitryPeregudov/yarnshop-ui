import {handleResult, handleSyncResult} from "./responce_handler";

export const forumService = {
    getAllMessages,
    createMessage
}
const forumBasePath = '/forum'

function getAllMessages() {
    return fetch(forumBasePath).then(data => handleResult(data));
}

function createMessage(message) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(message)
    };
    return fetch(forumBasePath, properties).then(data => handleSyncResult(data));
}