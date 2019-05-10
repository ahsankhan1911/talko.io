import React , {Component} from 'react'


class AccountVerification extends Component {

render () {
    return ( <div>
         <h3>We want to verify your account</h3>
         <label>Please enter 4 digits code sent to your email</label>
        <input type="text" />
    </div>
    )
}
}

export default AccountVerification