import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';
import { getCookie, setCookie } from './utills'
import service from './services'
import configureStore from './store';
import { Provider } from 'react-redux'
import Main from './Main'


async function authenticateUser() {
    let access_token = await getCookie('access_token')

    if (access_token) {
        service.getChatsAPI(access_token).then((response) => {
            if (response.data.error) {

                alert("Opps! Something went wrong :(")
            }
            else {
                ReactDOM.render(
                    <Provider store={configureStore()}>
                        <Main  chatsData = { response.data.data}/>
                    </Provider>
                
                    , document.getElementById('root')
                );
            }
        })
    }
    else {
        ReactDOM.render(
            <Provider store={configureStore()}>
                <Auth/>
            </Provider>
        
            , document.getElementById('root')
        );
    }
}

authenticateUser()


serviceWorker.unregister();
