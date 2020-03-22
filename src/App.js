import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js';
import MainPage from './components/MainPage.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    if (-1 === document.cookie.indexOf("guestname")) {
      //Then this visitor isn't logged in
      this.state = {
        login: false
      };
    } else {
      this.state = {
        login: document.cookie.split("guestname=", 2)[1].split(";", 2)[0]
      };
    }
  }

  render() {
    const login = this.state.login;
    let page;
    if (login) {
      page = <MainPage login = {login}/>;
    } else {
      page = <LoginPage />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h4>Welcome to the guestbook</h4>
          {page}
        </header>
      </div>
    );
  }
}

export default App;
