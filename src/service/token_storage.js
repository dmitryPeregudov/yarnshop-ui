class TokenStorage {
    token = 'token';
    firstName = 'firstName';
    lastName = 'lastName';
    role = 'role';
    login = 'login';

    loginUser(token, firstName, lastName, role, login) {
        localStorage.setItem(this.login, login);
        localStorage.setItem(this.token, token);
        localStorage.setItem(this.firstName, firstName);
        localStorage.setItem(this.lastName, lastName);
        localStorage.setItem(this.role, role);
    }

    logout() {
        localStorage.removeItem(this.login);
        localStorage.removeItem(this.role);
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.firstName);
        localStorage.removeItem(this.lastName);
    }

    getRole() {
        return localStorage.getItem(this.role)
    }

    getFirstName() {
        return localStorage.getItem(this.firstName)
    }

    getLastName() {
        return localStorage.getItem(this.lastName)
    }

    isAuthenticated() {
        var token = localStorage.getItem(this.token)
        return (token && token !== "")
    }
}

export default TokenStorage;
