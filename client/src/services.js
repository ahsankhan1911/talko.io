import axios from 'axios'
import { setCookie } from './appUtills'

const URL = process.env.REACT_APP_API_URL
//Headers
// const urlEncoded = {"Content-Type": "application/x-www-form-urlencoded"}
// const formData = { "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"}

class Service {

  signupAPI(signupData) {
   return axios.post(`${URL}user/signup`, signupData).then((result) => {


      if (result.data.statusCode === 500) {
        return  alert("Opps ! Something went wrong :( ")
      }
      else {
        if (result.data.error || result.data.statusCode !== 200) {
        return  alert(result.data.error.message)
        }
        else {
          return result.data.data;
        }
      }
    })
      .catch((error) => {
        // console.log(error)
        alert("Please check your Internet Connection !")

      })
  }

  loginAPI(loginData) {

    return axios.post(`${URL}user/login`, loginData).then((result) => {
      if (result.data.statusCode === 500) {
        return alert("Opps ! Something went wrong :( ")
      }
      if (result.data.error || result.data.statusCode !== 200) {
        return alert(result.data.error.message)
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
      .catch((error) => {
        // console.log(error)
        alert("Please check your Internet Connection !")

      })

  }

  getChatsAPI(token) {
    return axios.get(`${URL}chat/get`, { headers: { 'Authorization': token } })
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
      .catch((error) => {
        console.log(error)
        // console.log(error)
        alert("Please check your Internet Connection !")

      })
  }

}

const service = new Service()

export default service