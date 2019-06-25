import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';
import { getCookie } from './appUtills'
import service from './services'
import Main from './Main'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


async function authenticateUser() {
    let access_token = await getCookie('access_token')

    if (access_token) {
        service.getChatsAPI(access_token).then((response) => {
            if (response.data.error) {

                alert("Opps! Something went wrong :(")
            }
            else {
                ReactDOM.render(
                        <Main  chatsData = { response.data.data} token ={access_token}/>
                    , document.getElementById('root')
                );
            }
        })
    }
    else {
        ReactDOM.render(
                <Auth/>
            , document.getElementById('root')
        );
    }
}

authenticateUser()


serviceWorker.unregister();
