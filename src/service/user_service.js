import {handleResult} from "./responce_handler";

export const UserService = {
    createUser,
    changePassword,
    changeInfo,
    findUserById
};
const createUserPath = "/register"
const updatePasswordPath = '/users/passwordUpdate/'
const basicUserPath = '/users/'

function createUser(login, password, name, middleName, surName, address, email, post, dateOfBirth) {
    const properties = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login, password, name, middleName,
            surName, address, email, post, dateOfBirth
        })
    };
    return fetch(createUserPath, properties).then(data => handleResult(data));
}

function changePassword(oldPassword, newPassword, id) {
    const properties = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            oldPassword, newPassword
        })
    };
    return fetch(updatePasswordPath + id, properties).then(data => handleResult(data));
}

function changeInfo(name, middleName, surName,
                    address, email, post, dateOfBirth, id) {
    const properties = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            name, middleName, surName,
            address, email, post, dateOfBirth
        })
    };
    return fetch(basicUserPath + id, properties).then(data => handleResult(data));
}

function findUserById(id) {
    const properties = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    };
    return fetch(basicUserPath + id, properties).then(data => handleResult(data));
}