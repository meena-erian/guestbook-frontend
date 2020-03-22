import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Login to continue</h4>
          <input type="text" placeholder="Username" formNoValidate />
          <input type="password" placeholder="Password" formNoValidate />
          <input type="button" value="Login" />
        </div>
      </div>
    );
  }
}

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <div className="AuthenticationForm">
          <h4>Register for free</h4>
          <input type="text" placeholder="Username" formNoValidate />
          <input type="password" placeholder="Password" formNoValidate />
          <input
            type="password"
            placeholder="Confirm Password"
            formNoValidate
          />
          <input type="button" value="Sign up" />
        </div>
      </div>
    );
  }
}

class AuthenticationPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userAlreadyRegistered : true
    }
    this.userWantsToLogin = this.userWantsToLogin.bind(this);
    this.userWantsToRegister = this.userWantsToRegister.bind(this);
  }
  userWantsToLogin(){
    this.setState({userAlreadyRegistered : true});
  }
  userWantsToRegister(){
    this.setState({userAlreadyRegistered : false});
  }

  render() {
    return (
      <div>
        {
          this.state.userAlreadyRegistered ? 
          (
            <div>
            <LoginPage />
            <p>Don't have an account? <a href="#" onClick={this.userWantsToRegister}>Rigister</a> instead!</p>
            </div>
          ) : 
          (
            <div>
            <SignupPage/>
            <p>Have an account already? <a href="#" onClick={this.userWantsToLogin}>Login</a> instead!</p>
            </div>
          )
        }
      </div>
    );
  }
}
export default AuthenticationPage;
