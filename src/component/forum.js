import {Component} from "react";
import {forumService} from "../service/forum_service";
import {Button, Card} from "react-bootstrap";
import token_storage from "../service/token_storage";
import TokenStorage from "../service/token_storage";
import Cart from "./cart";

class Forum extends Component {
    state = {
        tokenStorage: new TokenStorage(),
        shouldFetch: false,
        messages: [],
        hasErrors: false,
        message: ''
    }

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.shouldFetch) {
            this.setState({shouldFetch: false})
            this.getMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div>
                <center>
                    <div>
                        {
                            this.state.hasErrors ?
                                <div><h2>Что-то пошло не так</h2></div>
                                : this.renderMessages()
                        }
                    </div>
                </center>
                <div style={{backgroundColor: "white"}} className={"message"}>
                    <h4>Введите сообщение</h4>
                    <textarea style={{width: '100%', height: '100px'}} onChange={event => this.setMessageText(event)}
                              value={this.state.message} name="message" placeholder={"Введите сообщение"}/>
                    <p style={{margin: "auto"}}><Button onClick={this.sendMessage}>Отправить</Button></p>
                </div>
            </div>
        )
    }

    sendMessage = async () => {
        if (this.state.message !== '') {
            let userId = this.state.tokenStorage.getId();
            let message = {
                message: this.state.message,
            }
            if (userId) {
                message.user = {id: userId}
            }

            let response = await forumService.createMessage(message);
            if (response.ok) {
                this.setState({shouldFetch: true, message: ''});
            }
        }
    }

    setMessageText = (event) => {
        this.setState({message: event.target.value})
    }

    renderMessages() {
        return (
            <div>
                {this.state.messages && this.state.messages.map(message => {
                    return <Card style={{width:'60%'}}>
                        <Card.Body>
                            {
                                message.user !== null
                                    ? <Card.Title>Автор: {message.user.login}</Card.Title>
                                    : <Card.Title>Автор: unknown user</Card.Title>
                            }
                            <Card.Subtitle>{this.getTime(message.date)}</Card.Subtitle>
                            <Card.Text>{message.message}</Card.Text>
                        </Card.Body>
                    </Card>
                })}
            </div>
        )
    }

    getTime = (time) => {
        var date = new Date(time);
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ': ' + date.getHours() + ':' + date
            .getMinutes();
    }

    getMessages() {
        forumService.getAllMessages()
            .then(data => data.json())
            .then(messages => this.setState({messages}))
            .catch(error => {
                this.setState({hasError: true})
            });
    }
}

export default Forum;