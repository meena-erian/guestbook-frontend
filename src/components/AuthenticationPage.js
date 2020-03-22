import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

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
        <h3>Welcome to the guestbook</h3>
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
