import {handleResult} from "./responce_handler";
import TokenStorage from "./token_storage";


const baseUrl = '/login';

export const tokenService = {
    getToken
};

function getToken(login, password) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password})
    };
    return fetch(baseUrl, properties)
        .then(data => handleResult(data))
        .then(response => response.json())
        .then(data => {
            const storage = new TokenStorage();
            storage.loginUser(data.id, data.token, data.firstName, data.lastName, data.role, data.login);
            return data;
        })
}
