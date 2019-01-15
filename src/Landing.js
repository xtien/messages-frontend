import React, {Component} from 'react'
import './css/bootstrap.css'

class Landing extends Component {

    // https://medium.com/@thejasonfile/basic-intro-to-react-router-v4-a08ae1ba5c42

    constructor() {
        super()

        this.state = {}
    }

    render() {

        return (

            <div className='container'>
                  <div className='text'><p >
                    Dit is een proof of concept van de GUI component van het Communicatie project.</p>
                   <p>Deze frontend is gebouwd met React, een javascript library. De backend is gebouwd met Java, Spring Boot, JPA en HSQLDB, Postgres en/of MySQL.
                </p></div>
            </div>
        )
    }
}

export default Landing