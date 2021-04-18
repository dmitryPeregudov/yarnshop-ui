import {handleResult} from "./responce_handler";

export const UserService = {
    createUser
};
const createUserPath = "/register"

function createUser(login, password, name, middleName, surName, address, email, post, dateOfBirth,) {
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