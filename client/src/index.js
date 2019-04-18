import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';
import {getCookie, setCookie} from './utills'
import service from './services' 
import configureStore from './store';
import { Provider } from 'react-redux'


async function authenticateUser (){
      let access_token = await getCookie('access_token')

      if(access_token) {
          
      }
}

authenticateUser()
ReactDOM.render(
    <Provider store={configureStore()}>
  <Auth /> 
   </Provider>
    
    , document.getElementById('root'));


serviceWorker.unregister();
