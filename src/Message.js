import React, {Component} from 'react'
import axios from "axios";
import {Redirect} from "react-router-dom";
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
            dateFrom: '',
            dateUntil: '',
            status: 0,
            redirect: false
        }

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        let postData = {
            id: props.match.params.id
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios.post(window.url + '/getMessage/',
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
                    text: response.data.message.text,
                    dateFrom: response.data.message.dateFrom,
                    dateUntil: response.data.message.dateUntil
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

        axios.post(window.url + '/deleteMessage/',
            postData,
            axiosConfig
        )
            .then(response =>
                this.setState({redirect: true})
            )
    }

    render() {

        return (
            <div className='container'>
                <div>
                    {this.state.showEdit ? null :
                        <div className='letter text-black-50'>
                            <table>
                                <tr>
                                    <td>Status</td>
                                    <td>{this.state.status}</td>
                                </tr>
                                <tr>
                                    <td>Header</td>
                                    <td>{this.state.header}</td>
                                </tr>
                                <tr>
                                    <td>Date From</td>
                                    <td>{this.state.dateFrom}</td>
                                </tr>
                                <tr>
                                    <td>Date Until</td>
                                    <td>{this.state.dateUntil}</td>
                                </tr>
                                <tr>
                                    <td>Tekst</td>
                                    <td>{this.state.text}</td>
                                </tr>
                            </table>
                            <div>
                                {this.state.showEdit ?
                                    null :
                                    <div>
                                        <div>
                                            <button className="btn btn-outline-success mybutton" onClick={this.edit}
                                                    value={this.state.id}>
                                                edit
                                            </button>
                                            <button className="btn btn-outline-danger mybutton" onClick={this.delete}
                                                    value={this.state.id}>
                                                delete
                                            </button>
                                        </div>
                                    </div>}
                            </div>
                        </div>}
                </div>
                <div>
                    {this.state.showEdit ?
                        <EditMessageForm
                            action='update'
                            text={this.state.text}
                            header={this.state.header}
                            dateUntil={this.state.dateUntil}
                            header={this.state.header}
                            status={this.state.status}
                            id={this.state.id}/> : null}
                </div>
            </div>)
    }
}


export default Message