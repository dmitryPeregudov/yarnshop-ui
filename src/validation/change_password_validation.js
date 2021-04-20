export function validate(password, passwordConfirm) {
    if (password === '' || passwordConfirm === '') {
        return "Новый пароль не заполнен"
    }
    if (passwordConfirm !== password) {
        return 'Пароли не совпадают'
    }
    return null
}