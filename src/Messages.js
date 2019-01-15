import React, {Component} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import ReactTable from "react-table";

class Messages extends Component {

    constructor() {
        super()

        this.state = {
            resultCode: -1,
            data: [],
            messages: [{}]
        }

        let postData = {
            requestCode: 0
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios.post('http://pengo.christine.nl:8080/getMessages/',
            postData,
            axiosConfig
        )
            .then(response =>
                this.setState({
                    resultCode: response.data.resultCode,
                    messages: response.data.messages
                })
            )
    }

    render() {

        const columns = [
            {
                Header: 'id',
                id: 'id',
                width: 100,
                accessor: data => {
                    const nr = data.id;
                    const linkto = '/getMessage/' + nr;
                    let result = <Link to={linkto}>{nr}</Link>
                    return result;
                },
                className: 'text-center',
            }, {
                Header: 'status',
                accessor: 'status',
                width: 100,
                className: 'text-center'
            }, {
                Header: '',
                accessor: 'header',
                className: 'text-left'
            }, {
                Header: 'date from',
                width: 180,
                id: 'dateFrom',
                accessor: data => {
                    let date = data.dateFrom;
                    return (date != null ? date.toString() : '');
                },
            }, {
                Header: 'date until',
                width: 180,
                id: 'dateUntil',
                accessor: data => {
                    let date = data.dateUntil;
                    return (date != null ? date.toString() : '');
                },
            }]

        return (
            <div className='container'>
                <div className='link'>
                    <Link to='/addMessage'>Nieuw bericht</Link></div>
                <ReactTable
                    data={this.state.messages}
                    columns={columns}
                />
            </div>
        )
    }
}

export default Messages