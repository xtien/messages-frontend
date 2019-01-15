import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditMessageForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            header: this.props.header,
            status: this.props.status,
            text: this.props.text,
            dateFrom: (this.props.dateFrom != null ? this.props.dateFrom : new Date()),
            dateUntil: (this.props.dateUntil != null ? this.props.dateUntil : new Date()),
            resultCode: 0,
            redirect: false,
            action: this.props.action
        };

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateUntilChange = this.handleDateUntilChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleHeaderChange(event) {
        this.setState({header: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleDateFromChange(date) {
        this.setState({dateFrom: date});
    }

    handleDateUntilChange(date) {
        this.setState({dateUntil: date});
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
                text: this.state.text,
                dateFrom: this.state.dateFrom,
                dateUntil: this.state.dateUntil
            }
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios.post(window.url + '/' + this.state.action + 'Message/',
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
            let linkTo = '/getMessages';
            return <Redirect push to={linkTo}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <table>
                        <tr>
                            <td>Status</td>
                            <td><input type="text" className='textinput' value={this.state.status}
                                       onChange={this.handleStatusChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Header</td>
                            <td><input type="text" className='textinput' value={this.state.header}
                                       onChange={this.handleHeaderChange}/></td>
                        </tr>
                        <tr>
                            <td>Text</td>
                            <td><textarea value={this.state.text} className='textarea'
                                          onChange={this.handleTextChange}/></td>
                        </tr>
                        <tr>
                            <td>Date from</td>
                            <td><DatePicker className='dateinput'
                                            selected={this.state.dateFrom}
                                            onChange={this.handleDateFromChange}
                            /></td>
                        </tr>
                        <tr>
                            <td>Date until</td>
                            <td><DatePicker className='dateinput'
                                            selected={this.state.dateUntil}
                                            onChange={this.handleDateUntilChange}
                            /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" className='submitbutton' value="Submit"/></td>
                        </tr>
                    </table>
                </label>

            </form>
        );
    }
}

export default EditMessageForm