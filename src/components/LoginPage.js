import React from "react";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validUsername: undefined,
      validPassword: undefined,
      tempUsername: ""
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.loginRequestSender = this.loginRequestSender.bind(this);
    this.loginResponseHandler = this.loginResponseHandler.bind(this);
  }
  handleUsernameInput(e) {
    let usernameRegex = /^[a-zA-Z0-9]{5,30}$/;
    this.setState({ validUsername: usernameRegex.test(e.target.value) });
  }
  handlePasswordInput(e) {
    let passwordRegex = /^.{7,200}$/;
    this.setState({ validPassword: passwordRegex.test(e.target.value) });
  }
  loginRequestSender() {
    var btn = document.querySelector("#login-button");
    btn.classList.add("loading");
    this.state.tempUsername = document.querySelector("#loginName").value; // eslint-disable-line
    api("POST", "/user/login", this.loginResponseHandler, {// eslint-disable-line
      username: this.state.tempUsername,
      password: document.querySelector("#loginPassword").value
    });
  }
  loginResponseHandler(e) {
    if (e.target.status === 200) {
      var apiResponse = JSON.parse(e.target.response);
      document.cookie = "guestname=" + this.state.tempUsername;
      document.cookie = "sessionid=" + apiResponse.token;
      document.location.reload();
    } else if (e.target.status === 401) {
      alert("Incorrect username or password");
    }
    var btn = document.querySelector("#login-button");
    btn.classList.remove("loading");
  }
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Login to continue</h4>
          <div className="hiddenWrapper">
            <input
              id="loginName"
              className={this.state.validUsername !== false ? "" : "badInput"}
              onChange={this.handleUsernameInput}
              type="text"
              placeholder="Username"
              formNoValidate
            />
            {this.state.validUsername !== false ? (
              ""
            ) : (
              <span className="warning"> Invalid username </span>
            )}
          </div>
          <div className="hiddenWrapper">
            <input
              id="loginPassword"
              className={this.state.validPassword !== false ? "" : "badInput"}
              onChange={this.handlePasswordInput}
              type="password"
              placeholder="Password"
              formNoValidate
            />
            {this.state.validPassword !== false ? (
              ""
            ) : (
              <span className="warning"> Your password is too short </span>
            )}
          </div>
          <div className="hiddenWrapper">
            <input
              onClick={this.loginRequestSender}
              id="login-button"
              type="button"
              value="Login"
              disabled={
                this.state.validUsername && this.state.validPassword
                  ? false
                  : true
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
