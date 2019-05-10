import React, { Component } from 'react';
import '../App.css';
import service from '../services'
import Login from './components/Login'
import Signup from './components/Signup'
import {validateData} from './utils'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       loginDisplay: 'block',
       signupDisplay: 'none',
       showVerification : false
    }

  }

  handleSignupClick = () => {
   this.setState({
     loginDisplay:'none',
     signupDisplay: 'block' 
   })
  }


  handleBtn = (data, type) =>  { 
    
    if (validateData(data, type)) {
      let errors = document.getElementsByClassName('error')
      for (var i = 0; i < errors.length; i++) {
        errors[i].innerText = ""
      }
      if (type === 'login') {
        service.loginAPI(data).then((result) => {
           if(result === true) {
            return this.setState({
                 showVerification: true
             })
           }
        })

      }
      if(type === 'signup') {
        service.signupAPI(data)
      }
    }
  }




  render() {
    return (
      <div className="App">
        <div>
          {/* <h2>Talko.io</h2> */}
          <Login  handleBtn = { this.handleBtn } display={this.state.loginDisplay} handleSignupClick= { this.handleSignupClick}/>
        </div>
      
        <Signup  handleBtn = { this.handleBtn } display={this.state.signupDisplay}/>
       

      </div>
    );
  }
}

export default App;
