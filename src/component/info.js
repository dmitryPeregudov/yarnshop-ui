import {Component} from "react/cjs/react.production.min";
import {ShopInfoService} from "../service/social_media_and_contacts_service";

class Info extends Component {
    state = {
        socialMedia: [],
        contacts: [],
        socialMediaFetched: false,
        contactsFetched: false,
        hasErrors: false
    };

    componentDidMount() {
        this.getContacts();
        this.getSocialMedia();
    }

    render() {
        if (!this.state.socialMediaFetched && !this.state.contactsFetched) {
            return (<div/>)
        }
        if (this.state.hasErrors) {
            return (<a1>Something goes wrong</a1>)
        }
        return (
            <div>
                <p className="p_line ul_font">
                    Мы в социальных сетях
                    <ul type="none">
                        {this.state.socialMedia && this.state.socialMedia.map(socialMedia =>
                            <li>
                                <a style={{color: 'black', textDecoration: 'underline'}}
                                   href={socialMedia.link}>{socialMedia.name}</a>
                            </li>
                        )}
                    </ul>
                </p>
                <p className="p_line ul_font">
                    Связаться можно по номеру:
                    <ul type="none">
                        {this.state.contacts && this.state.contacts.map(contact =>
                            <li>
                                <a>{contact.name}: </a>
                                <a>{contact.phone} </a>
                                <a>{contact.desc} </a>
                            </li>
                        )}
                    </ul>
                </p>
            </div>
        )
    }

    getContacts() {
        ShopInfoService.getContacts()
            .then(data => data.json())
            .then(contacts => this.setState({contacts}))
            .then(this.setState({contactsFetched: true}))
            .catch(error => {
                this.setState({hasErrors: true})
            })
    }

    getSocialMedia() {
        ShopInfoService.getSocialMedia()
            .then(data => data.json())
            .then(socialMedia => this.setState({socialMedia}))
            .then(this.setState({socialMediaFetched: true}))
            .catch(error => {
                this.setState({hasErrors: true})
            })
    }
}

export default Info