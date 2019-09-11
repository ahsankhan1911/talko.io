import axios from 'axios'
import { setCookie, getCookie, eraseCookie } from './appUtills'

const URL = process.env.REACT_APP_API_URL
//Headers
// const urlEncoded = {"Content-Type": "application/x-www-form-urlencoded"}
// const formData = { "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"}
const header = { headers: { 'Authorization':  getCookie('access_token') } }


const defaultResponceHandler = (result) => {
  if (result.data.statusCode === 500) {
    return alert("Opps ! Something went wrong :( ")
  }
  else {
    if (result.data.error || result.data.statusCode !== 200) {
      return alert(result.data.error.message)
    }
    else {
      return result.data.data;
    }
  }
}

const errorHandler = () => {
  alert("Please check your Internet Connection !")
  // window.location.reload()

}

class Service {

  signupAPI(signupData) {
    return axios.post(`${URL}user/signup`, signupData)
      .then(defaultResponceHandler)
      .catch(errorHandler)
  }

  loginAPI(loginData) {

    return axios.post(`${URL}user/login`, loginData).then((result) => {
      if (result.data.statusCode === 500) {
         alert("Opps ! Something went wrong :( ")
         return result
      }
      if (result.data.error || result.data.statusCode !== 200) {
         alert(result.data.error.message)
        return result
      }

      if (result.data.data.isVerified === false) {
        return {
          verification: true,
          data: result.data.data
        }
      }
      let access_token = result.data.data.accessToken
      setCookie('access_token', access_token, '2')
      window.location.reload()
      return access_token

    })
      .catch(errorHandler)

  }

  getChatsAPI() {
    return axios.get(`${URL}chat/get`, header)
  }

  userVerification(userData) {
    axios.post(`${URL}user/verify-code`, userData).then((result) => {
      if (result.data.statusCode === 500) {
        alert("Opps ! Something went wrong :( ")
      }
      else {
        if (result.data.error || result.data.statusCode !== 200) {
          alert(result.data.error.message)
        }
        else {
          let access_token = result.data.data.accessToken
          setCookie('access_token', access_token, '2')
          window.location.reload()
        }

      }

    })
      .catch(errorHandler)
  }

  search(searchKey) {
    return axios.get(`${URL}user/search?key=${searchKey}`, header).then(defaultResponceHandler)
      .catch(errorHandler)
  }

  userDetailsEmail(email) {
    return axios.get(`${URL}user/details/${email}`, header).then(defaultResponceHandler)
      .catch(errorHandler)
  }

  userProfileAPI () {
    return axios.get(`${URL}user/details`, header).then(defaultResponceHandler)
    .catch(errorHandler)
  }

  sendContactReq (userData) {
    return axios.post(`${URL}user/send-contact-request`,userData, header).then(defaultResponceHandler)
    .catch(errorHandler)
  }

  getContactReq (userData) {
    return axios.get(`${URL}user/get-contact-request`, header).then(defaultResponceHandler)
    .catch(errorHandler)
  }

  acceptContactReq (userData) {
    return axios.post(`${URL}user/accept-contact-request`,userData, header).then(defaultResponceHandler)
    .catch(errorHandler)
  }

  updateSocketId (userData) {
    return axios.post(`${URL}user/update-socket-id`, userData, header).then(defaultResponceHandler)
  }

  logout () {
    eraseCookie('access_token')

    window.location.reload()
  }

}

const service = new Service()

export default service