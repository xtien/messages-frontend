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

    render() {

        return (

            <Router>
                <div className='container'>
                    <div className='jumbotron'>
                        <div className='photo'>
                            <img src="https://www.twitli.com/pics/logo/twitli-icon-black-256.png"/>
                        </div>
                        <h1>Demo: Notifications entry and storage system</h1>
                        <p><Link to='/'>Home</Link> <Link to='/getMessages/'>Messages</Link></p>
                    </div>
                    <div>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/getMessages/" component={Messages}/>
                        <Route path="/addMessage/" component={AddMessage}/>
                        <Route path="/getMessage/:number" component={Message}/>
                    </div>
                </div>
            </Router>

        )
    }
}

export default App