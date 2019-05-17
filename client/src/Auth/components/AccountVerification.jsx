import React, { Component } from 'react'


class AccountVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: ''
        }

    }

    handleChangeCode = (e) => {
        this.setState({
            verificationCode: e.target.value
        }, () => {
            console.log(this.state.verificationCode)
        })

    }
    
    render() {
        let {userData, handleBtn} = this.props;
        let data = {
            email: userData.email,
            verificationCode: Number(this.state.verificationCode)
        }
        return (<div>
            <h3>We want to verify your account</h3>
            <label>Please enter 4 digits code sent to <b>{userData.email}</b></label><br />
            <input type="number" onChange={this.handleChangeCode}/><br/>
            <button onClick={() => handleBtn(data, 'verification')}>Verify Code</button>

        </div>
        )
    }
}

export default AccountVerification