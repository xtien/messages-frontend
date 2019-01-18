import React, {Component} from 'react'
import './App.css'
import 'react-table/react-table.css'
import './css/bootstrap.css'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Messages from './Messages'
import Message from './Message'
import Landing from './Landing'
import AddMessage from './AddMessage'

class App extends Component {

    constructor(props) {
        super(props)
        window.url = process.env.REACT_APP_URL
    }

    render() {

        return (

            <Router>
                <div className='container'>
                    <div className='photo'>
                        <img src="https://www.twitli.com/pics/logo/twitli-icon-black-256.png"/>
                    </div>
                    <div className='jumbotron text-black-50'>
                        <h1>
                            <div className='nav justify-content-center'>Notifications entry and storage system</div>
                        </h1>
                        <ul className="nav justify-content-center">
                            <li><Link id='Home' className='nav-link active' to='/'>Home</Link></li>
                            <li><Link id='Messages' className='nav-link active' to='/getMessages/'>Messages</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/getMessages/" component={Messages}/>
                        <Route path="/addMessage/" component={AddMessage}/>
                        <Route path="/getMessage/:id" component={Message}/>
                    </div>
                </div>
            </Router>

        )
    }
}

export default App