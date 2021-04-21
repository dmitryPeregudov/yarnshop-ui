class TokenStorage {
    id = 'id'
    token = 'token';
    firstName = 'firstName';
    lastName = 'lastName';
    role = 'role';
    login = 'login';

    loginUser(id, token, firstName, lastName, role, login) {
        localStorage.setItem(this.id, id)
        localStorage.setItem(this.login, login);
        localStorage.setItem(this.token, token);
        localStorage.setItem(this.firstName, firstName);
        localStorage.setItem(this.lastName, lastName);
        localStorage.setItem(this.role, role);
    }

    logout() {
        localStorage.removeItem(this.id);
        localStorage.removeItem(this.login);
        localStorage.removeItem(this.role);
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.firstName);
        localStorage.removeItem(this.lastName);
        localStorage.removeItem("order")
    }

    getRole() {
        return localStorage.getItem(this.role)
    }

    getId() {
        return localStorage.getItem(this.id);
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
