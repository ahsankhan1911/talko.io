import axios from 'axios'
import {setCookie} from './utills'

const URL = process.env.REACT_APP_API_URL
console.log(process.env)
//Headers
const urlEncoded = {"Content-Type": "application/x-www-form-urlencoded"}
const formData = { "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"}

class Service { 
    signupAPI (signupData) {
      return axios.post(`${URL}user/signup`, signupData)
    }

    loginAPI (loginData) {
         axios.post(`${URL}user/login`, loginData).then((result) => {
        if(result.data.error || result.data.statusCode != 200) {
          alert(result.data.error.message)
        }
        else {
          let access_token = result.data.data.accessToken
          setCookie('access_token', access_token, '2')
        }
      })
      .catch((error) => {
        // console.log(error)
        alert("Please check your Internet Connection !")

      })
    }
}

const service = new Service()

export default service