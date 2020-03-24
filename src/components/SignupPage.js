import React from "react";

class SignupPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validUsername : undefined,
            validPassword : undefined,
            passwordsMatch : undefined,
            tempUsername : ""
        }
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.signupRequestSender = this.signupRequestSender.bind(this);
        this.signupResponseHandler = this.signupResponseHandler.bind(this);
    }
    handleUsernameInput(e){
        let usernameRegex = /^[a-zA-Z0-9]{5,30}$/;
        this.setState({validUsername : usernameRegex.test(e.target.value)})
    }
    handlePasswordInput(e){
        let passwordRegex = /^.{7,200}$/;
        this.setState({validPassword : passwordRegex.test(e.target.value)})
        this.setState({passwordsMatch : (document.querySelector("#confirmPassword").value === document.querySelector("#loginPassword").value)});
    }
    signupRequestSender(){
      var btn = document.querySelector('#signup-button');
      btn.classList.add("loading");
      this.state.tempUsername = document.querySelector("#loginName").value // eslint-disable-line
      api("POST", "/user/signup", this.signupResponseHandler, { // eslint-disable-line
        'username' : this.state.tempUsername,
        'password' : document.querySelector("#loginPassword").value
      });
    }
    signupResponseHandler(e){
      if(e.target.status === 200){
        var apiResponse = JSON.parse(e.target.response);
        document.cookie = "guestname=" + this.state.tempUsername;
        document.cookie =  "sessionid=" + apiResponse.token;
        document.location.reload();
      }
      else if(e.target.status === 451){
        alert("Username is not available");
      }
      var btn = document.querySelector('#signup-button');
      btn.classList.remove("loading");
    }
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Register for free</h4>
          <input id="loginName" className={this.state.validUsername !== false? "" : "badInput"} onChange = {this.handleUsernameInput} type="text" placeholder="Username" formNoValidate />
          <input id="loginPassword" className={this.state.validPassword !== false? "" : "badInput"} onChange = {this.handlePasswordInput} type="password" placeholder="Password" formNoValidate />
          <input
            onChange={this.handlePasswordInput}
            className={this.state.passwordsMatch !== false ? "" : "badInput"}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            formNoValidate
          />
          <input id='signup-button' onClick={this.signupRequestSender} type="button" value="Sign up" disabled={!this.state.validUsername || !this.state.validPassword || !this.state.passwordsMatch} />
        </div>
      </div>
    );
  }
}
export default SignupPage;
