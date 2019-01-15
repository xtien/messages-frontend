import React, {Component} from 'react'
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import './css/bootstrap.css'
import EditMessageForm from './EditMessageForm'

class Message extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEdit: false,
            resultCode: -1,
            data: {},
            message: {},
            header: '',
            text: '',
            status: 0,
            redirect: false
        }

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        let postData = {
            id: props.match.params.number
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        axios.post('http://pengo.christine.nl:8080/getMessage/',
            postData,
            axiosConfig
        )
            .then(response =>
                this.setState({
                    resultCode: response.data.resultCode,
                    message: response.data.message,
                    id: response.data.message.id,
                    status: response.data.message.status,
                    header: response.data.message.header,
                    text: response.data.message.text
                })
            )

    }

    edit(event) {

        var messageNumber = event.target.value;
        const message = this.state.message;
        this.setState({
            showEdit: true,
            message: message
        })
    }

    delete(event) {

        let postData = {
            id: event.target.value
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        axios.post('http://pengo.christine.nl:8080/deleteMessage/',
            postData,
            axiosConfig
        )
            .then(response =>
                this.setState({redirect: true})
            )


    }

    render() {

        if (this.state.redirect) {
            this.state.redirect = false;
            const linkTo = '/getMessages';
            return <Redirect push to={linkTo}/>;
        }

        return (
            <div className='container'>
                <div>
                    {this.state.showEdit ? null :
                        <div className='letter'>
                            <tr>
                                <td>Status</td>
                                <td>{this.state.status}</td>
                            </tr>
                            <tr>
                                <td>Header</td>
                                <td>{this.state.header}</td>
                            </tr>
                            <tr>
                                <td>Tekst</td>
                                <td>{this.state.text}</td>
                            </tr>
                        </div>}
                </div>
                <div>
                    {this.state.showEdit ?
                        <EditMessageForm messageId={this.state.id}
                                         text={this.state.text}
                                         header={this.state.header}
                                         status={this.state.status}
                                         id={this.state.id}/> : null}
                </div>
                <div>
                    {this.state.showEdit ?
                        null :
                        <div>
                            <button onClick={this.edit} value={this.state.id}>
                                edit
                            </button>
                            <button onClick={this.delete} value={this.state.id}>
                                delete
                            </button>
                        </div>}
                </div>
            </div>)
    }
}


export default Message