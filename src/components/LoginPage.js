import React from "react";

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validUsername : true,
            validPassword : true,
            passwordsMatch : true
        }
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
    }
    handleUsernameInput(e){
        let usernameRegex = /^[a-zA-Z0-9]{5,30}$/;
        this.setState({validUsername : usernameRegex.test(e.target.value)})
    }
    handlePasswordInput(e){
        let passwordRegex = /^.{7,200}$/;
        this.setState({validPassword : passwordRegex.test(e.target.value)})
    }
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Login to continue</h4>
          <input id="loginName" className={this.state.validUsername? "" : "badInput"} onChange = {this.handleUsernameInput} type="text" placeholder="Username" formNoValidate />
          <input id="loginPassword" className={this.state.validPassword? "" : "badInput"} onChange = {this.handlePasswordInput} type="password" placeholder="Password" formNoValidate />
          <input type="button" value="Login" />
        </div>
      </div>
    );
  }
}

export default LoginPage;