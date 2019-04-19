import React, { Component } from 'react';
import '../App.css';
import { isValidEmail, isValidPassword, setCookie } from '../utills'
import service from '../services'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:8000/5cb5dd88178d6adb7b25e026');



class Main extends Component {
  
  render() {
    console.log("Main rendered")
    return (
      <div className="App">
          Welcome !
      </div>
    );
  }
}

export default Main;
