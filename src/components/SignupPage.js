import React from "react";

class SignupPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validUsername : undefined,
            validPassword : undefined,
            passwordsMatch : undefined
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
        this.setState({passwordsMatch : (document.querySelector("#confirmPassword").value === document.querySelector("#loginPassword").value)});
    }
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Register for free</h4>
          <input id="loginName" className={this.state.validUsername !== false? "" : "badInput"} onChange = {this.handleUsernameInput} type="text" placeholder="Username" formNoValidate />
          <input id="loginPassword" className={this.state.validPassword !== false? "" : "badInput"} onChange = {this.handlePasswordInput} type="password" placeholder="Password" formNoValidate />
          <input
            className={this.state.passwordsMatch !== false ? "" : "badInput"}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            formNoValidate
          />
          <input type="button" value="Sign up" disabled={!this.state.validUsername || !this.state.validPassword || !this.state.passwordsMatch} />
        </div>
      </div>
    );
  }
}
export default SignupPage;
