import axios from 'axios'

const URL = process.env.REACT_APP_API_URL

//Headers
const urlEncoded = {"Content-Type": "application/x-www-form-urlencoded"}
const formData = { "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"}

class Service { 
    signupAPI (signupData) {
      return axios.post(`${URL}/user/signup`, signupData, {headers: urlEncoded})
    }

    loginAPI (loginData) {
       return  axios.post(`${URL}/user/login`, loginData, {headers: urlEncoded})
    }
}

const service = new Service()

export default service