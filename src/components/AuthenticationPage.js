import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

class AuthenticationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlreadyRegistered: false
    };
    this.userWantsToLogin = this.userWantsToLogin.bind(this);
    this.userWantsToRegister = this.userWantsToRegister.bind(this);
  }
  userWantsToLogin() {
    this.setState({ userAlreadyRegistered: true });
  }
  userWantsToRegister() {
    this.setState({ userAlreadyRegistered: false });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h3>Welcome to the guestbook</h3>
          {this.state.userAlreadyRegistered ? (
            <div>
              <LoginPage />
              <p>
                Don't have an account?{" "}
                <span className="clickable" onClick={this.userWantsToRegister}>
                  Rigister
                </span>{" "}
                instead!
              </p>
            </div>
          ) : (
            <div>
              <SignupPage />
              <p>
                Have an account already?{" "}
                <span className="clickable" onClick={this.userWantsToLogin}>
                  Login
                </span>{" "}
                instead!
              </p>
            </div>
          )}
        </header>
      </div>
    );
  }
}
export default AuthenticationPage;
