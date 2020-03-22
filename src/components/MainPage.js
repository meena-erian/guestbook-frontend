import React from 'react';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome {this.props.login} <span>Unread Messages</span></p>
        <div className="mainPageContainer">
            <ol className="guests">
                <li>Mohamed</li>
                <li>Amr</li>
                <li>Abanob</li>
                <li>Peter</li>
                <li>Hagar</li>
                <li>Esraa</li>
                <li>Mary</li>
                <li>Basant</li>
            </ol>
            <div className="chatBox">
                <ul>
                    <li className="sentMessage">Bro, you where so drunk last night!</li>
                    <li>The hell? What did I do?</li>
                    <li className="sentMessage">You went to a semi truck...</li>
                    <li>uh,yea, so?</li>
                    <li className="sentMessage">And whispered "I know your secret... Optimus prime..."</li>
                </ul>
                <input type="text" />
            </div>
            <ul className="notificationPanel">
                <li>You have 1 unread Message from Abanob</li>
                <li>You have 2 unread Message from Hagar</li>
                <li>You have 1 unread Message from Amr</li>
            </ul>
        </div>
      </div>
    );
  }
}
export default MainPage;
