import React, {Component} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import ReactTable from "react-table";

class Messages extends Component {

    constructor() {
        super()

        this.state = {
            resultCode: -1,
            data: ['a', 'b'],
            messages: [{}]
        }

        let postData = {
            requestCode: 0
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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