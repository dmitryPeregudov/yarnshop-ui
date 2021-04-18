import {handleResult} from "./responce_handler";

export const ShopInfoService = {
    getSocialMedia,
    getContacts
}
const contactsUrl = '/contacts';
const socialMediaUrl = '/socialMedia';

function getContacts() {

    return fetch(contactsUrl).then(data => handleResult(data));
}

function getSocialMedia() {
    return fetch(socialMediaUrl).then(data => handleResult(data));
}