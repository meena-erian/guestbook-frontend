import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <div className="LoginForm">
          <h4>Login to continue</h4>
          <input type="text" placeholder="Username" formNoValidate />
          <input type="password" placeholder="Password" formNoValidate />
          <button>Login</button>
        </div>
      </div>
    );
  }
}
export default LoginPage;
