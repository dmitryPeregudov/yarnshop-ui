import {Component} from "react";
import TokenStorage from "../service/token_storage";

class LogoutComponent extends Component {
    state = {
        tokenStorage: new TokenStorage()
    };

    render() {
        this.state.tokenStorage.logout();
        this.props.history.push('/login');
        return null;
    }
}

export default LogoutComponent;
