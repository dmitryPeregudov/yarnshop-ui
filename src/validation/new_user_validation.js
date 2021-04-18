export function validate(login, password, passwordAgain, name, middleName,
                         surName, address, email, post) {
    if (login === '' || name === '' || middleName ===''
    || surName === '' || address === '' || email === '' || post === '') {
        return 'Пустые поля не допустимы';
    }
    if (password === '') {
        return 'Заполните пароль'
    }
    if (password !== passwordAgain) {
        return 'пароли не совпадают'
    }
    return null;
}
