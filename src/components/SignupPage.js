import React from "react";

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
export default SignupPage;
