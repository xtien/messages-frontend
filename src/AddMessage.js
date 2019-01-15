import React, {Component} from 'react'
import axios from "axios";
import './css/bootstrap.css'
import {Redirect} from "react-router-dom";

class AddMessage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            header: '',
            status: 0,
            text: '',
            resultCode: 0,
        };

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleHeaderChange(event) {
        this.setState({header: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleStatusChange(event) {
        this.setState({status: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let postData = {
            message: {
                id: this.state.id,
                status: this.state.status,
                header: this.state.header,
                text: this.state.text
            }
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        axios.post('http://pengo.christine.nl:8080/addMessage/',
            postData,
            axiosConfig
        )
            .then(response =>
                this.setState({
                    resultCode: response.data.resultCode,
                })
            )

        this.setState({redirect: true});

    }

    render() {

        if (this.state.redirect) {
            this.state.redirect = false;
            const linkTo = '/getMessages' ;
            return <Redirect push to={linkTo}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <table>
                        <tr>
                            <td>Status</td>
                            <td><input type="text" value={this.state.status}
                                       onChange={this.handleStatusChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Header</td>
                            <td><input type="text" className='textinput' value={this.state.header}
                                       onChange={this.handleHeaderChange}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><textarea value={this.state.text} onChange={this.handleTextChange}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Submit"/></td>
                        </tr>
                    </table>
                </label>

            </form>
        );
    }
}

export default AddMessage