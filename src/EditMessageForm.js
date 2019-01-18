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
                    redirect: true
                })
            )
    }

    render() {

        if (this.state.redirect) {
            this.state.redirect = false;
            let linkTo = '/getMessages';
            return <Redirect push to={linkTo}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input type="number" className="form-control" id="status"
                           value={this.state.status}
                           onChange={this.handleStatusChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="header">Header</label>
                    <input type="text" className="form-control" id="header"
                           value={this.state.header}
                           onChange={this.handleHeaderChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea type="text" className="form-control textarea" id="text"
                              value={this.state.text}
                              onChange={this.handleTextChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dateFrom">Date from</label>
                    <DatePicker className='dateinput form-control'
                                selected={this.state.dateFrom}
                                value={this.state.dateFrom}
                                onChange={this.handleDateFromChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateUntil">Date until</label>
                    <DatePicker className='dateinput form-control'
                                selected={this.state.dateUntil}
                                value={this.state.dateUntil}
                                onChange={this.handleDateUntilChange}/>
                </div>
                <input type="submit" className="btn btn-outline-success mybutton" value="Submit"/>

            </form>
        );
    }
}

export default EditMessageForm