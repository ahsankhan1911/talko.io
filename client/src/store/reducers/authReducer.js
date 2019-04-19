import axios from 'axios'

const URL = process.env.REACT_APP_API_URL

let initialState = {
  loginData: {
    email: '',
    password: ''
  },
  signupData: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}

export default (state = initialState, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
    //  axios.post(`${URL}user/login`, loginData).then((result) => {
    //   if(result.data.error || result.data.statusCode != 200) {
    //     alert(result.data.error.message)
    //   }
    //   else {

    //     return result.data.data
    //     let access_token = result.data.data.accessToken
    //     setCookie('access_token', access_token, '2')
    //   }
    // })
    // .catch((error) => {
    //   // console.log(error)
    //   alert("Please check your Internet Connection !")

    // })
      // return {
      //  result: action.payload
      // }
     default:
      return state
    }
   }