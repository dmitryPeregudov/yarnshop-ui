export function validate(name, middleName,
                         surName, address, email, post) {
    if (name === '' || middleName === ''
        || surName === '' || address === '' || email === '' || post === '') {
        return 'Пустые поля не допустимы';
    }
    return null;
}