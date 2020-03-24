import React from 'react';

class MainPage extends React.Component {
  constructor(props){
    super(props);
    var deviceWidth = Math.floor(window.innerWidth / 300), // This will define how many components can the window be horizontally divided into
    var guestsListOpen = true;
    var notificationsPannelOpen = (deviceWidth > 1) ? true : false;
    var selectedContact = ""; // This will change when the user opens chat with anyone
    this.state = {
      deviceWidth : deviceWidth,
      guestsListOpen : guestsListOpen,
      notificationsPannelOpen : notificationsPannelOpen,
      selectedContact : selectedContact,
      guests : {}, // This will up an up to date list of registered users
      chat : {}, // This will be an array of messages with the 'selectedContact'
      unread : {} // This will represent the content of the notifications pannel
    }
  }

  render() {
    return (
      <div>
        <div className="navBar"><h2><span className="navLeft">The GuestBook</span>Welcome {this.props.login} <span className="navRight">Unread Messages</span></h2></div>
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
                <div className="chatStatus">
                    <h3>Peter</h3>
                </div>
                <ul>
                    <li className="sentMessage">Bro, you where so drunk last night!</li>
                    <li>The hell? What did I do?</li>
                    <li className="sentMessage">You went to a semi truck...</li>
                    <li>uh,yea, so?</li>
                    <li className="sentMessage">And whispered "I know your secret... Optimus prime..."</li>
                </ul>
                <div className="messagingForm">
                    <input placeholder="Write a message" type="text" /> <input type="button" value = "Send" />
                </div>
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
