import React, { Component } from 'react'
import {  Input, Button, Page, Toolbar, ToolbarButton, Icon,BackButton , ProgressBar} from 'react-onsenui';


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
            {/* <h5>We want to verify your account</h5>
            <label>Please enter 4 digits code sent to <b>{userData.email}</b></label><br />
            <input type="number" maxLength="4" onChange={this.handleChangeCode}/><br/>
            <button onClick={() => handleBtn(data, 'verification')}>Verify Code</button> */}

            <label>Please enter 4 digits code sent to: <br /> <b>{userData.email}</b></label><br /><br /><br />
            <Input
                type="number"
                onChange={this.handleChangeCode}
                modifier='material'
                name="email"
                placeholder="Enter your 4 digit code"
                id="test"
            /> <br /><br />
            <Button
                modifier="cta"
                style={{ backgroundColor: '#1e88e5', color: 'white', height: '20%', width: '50%' }}
                onClick={() => handleBtn(data, 'verification')}
            >

                Sign up
  </Button>

        </div>
        )
    }
}

export default AccountVerification