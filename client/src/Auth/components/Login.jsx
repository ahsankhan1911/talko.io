import React, { Component } from 'react';


class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: '',
                password: ''
            }
        }

    }

    handleChangeLogin = (e) => {
        let data = this.state.loginData

        data[e.target.name] = e.target.value


        this.setState({
            loginData: data
        }, () => {
            console.log(this.state.loginData)
        })
    }


    render() {

        return (
            <div style={{ display: this.props.display }}>
                <input type="text" name="email" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-email" className="error"> </span>  <br />
                <input type="password" name="password" onChange={this.handleChangeLogin} />   <br /> <span id="login-error-password" className="error"></span> <br />

                <button onClick={() => this.props.handleBtn(this.state.loginData, 'login')}>login</button>
                <p>Dont have an account ? <a href="javascript:void(0)" onClick={() => this.props.handleSignupClick()}>Sign up</a></p>
            </div>
        )
    }
}

export default Login;