import React from "react";
import NotificationsPannel from "./NotificationsPannel";
import ChatBox from "./ChatBox";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    var deviceWidth = Math.floor(window.innerWidth / 300); // This will define how many components can the window be horizontally divided into
    var guestsListOpen = true;
    var notificationsPannelOpen = deviceWidth > 1 ? true : false;
    var selectedContact = {}; // This will change when the user opens chat with anyone
    this.state = {
      lastStatusUpdate: 0,
      deviceWidth: deviceWidth,
      guestsListOpen: guestsListOpen,
      notificationsPannelOpen: notificationsPannelOpen,
      selectedContact: selectedContact,
      guests: [], // This will up an up to date list of registered users
      chat: undefined, // This will be an array of messages with the 'selectedContact'
      unread: [] // This will represent the content of the notifications pannel
    };
    this.requestUpdates = this.requestUpdates.bind(this);
    this.handleUpdates = this.handleUpdates.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.renderMessagesApiResponse = this.renderMessagesApiResponse.bind(this);
    this.handleMessageSendingApiResponse = this.handleMessageSendingApiResponse.bind(
      this
    );
    this.toggleNotificationsPannel = this.toggleNotificationsPannel.bind(this);
    this.requestMessageDelete = this.requestMessageDelete.bind(this);
    this.handleMessageDeletion = this.handleMessageDeletion.bind(this);
    this.requestEditingMessage = this.requestEditingMessage.bind(this);
    this.handleEditingMessage = this.handleEditingMessage.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    //this.requestUpdates();
  }
  toggleNotificationsPannel() {
    this.state.notificationsPannelOpen = !this.state.notificationsPannelOpen;
    this.setState(this.state);
  }
  componentDidMount() {
    this.requestUpdates();
    this.updateInterval = setInterval(this.requestUpdates, 5000);
  }
  requestUpdates() {
    console.log("Requesting status updates from the server");
    let uri = "/notification?index=" + this.state.lastStatusUpdate;
    api("GET", uri, this.handleUpdates); // eslint-disable-line
  }
  handleUpdates(e) {
    console.log("Server responce arrived");
    switch (e.target.status) {
      case 200:
        var apiResponse = JSON.parse(e.target.response);
        if (apiResponse.messages) {
          beep.play(); // eslint-disable-line
          console.log(
            apiResponse.messages.length + " new messages has arrived"
          );
          apiResponse.messages.forEach(msg => {
            this.state.unread.push(msg);
            if (
              this.state.selectedContact &&
              msg.sender === this.state.selectedContact._id
            ) {
              this.selectUser(this.state.selectedContact);
            }
          });
        }
        if (apiResponse.users) {
          console.log(apiResponse.users.length + " new users are registered");
          apiResponse.users.forEach(user => {
            this.state.guests.push(user);
          });
        }
        if (apiResponse.users) {
          var timeLastRegisteredUser =
            apiResponse.users[apiResponse.users.length - 1].registered;
          if (timeLastRegisteredUser > this.state.lastStatusUpdate)
            this.state.lastStatusUpdate = timeLastRegisteredUser;
        }
        if (apiResponse.messages) {
          var timeLastUnreadMessage =
            apiResponse.messages[apiResponse.messages.length - 1].time;
          if (timeLastUnreadMessage > this.state.lastStatusUpdate)
            this.state.lastStatusUpdate = timeLastUnreadMessage;
        }
        this.setState(this.state);
        break;
      case 204:
        console.log(
          "Status updates successfully delivered from the server! No new messages."
        );
        break;
      case 401:
        console.log(
          "Server responded with 401! Looks like your login session has expired."
        );
        break;
      default:
        console.log("Unable to get status updates from the server!");
        console.log(e);
    }
  }
  renderMessagesApiResponse(e) {
    console.log("Server response arrived");
    switch (e.target.status) {
      case 200:
        console.log("Messages fetched successfully");
        var apiResponse = JSON.parse(e.target.response);
        console.log(apiResponse);
        if (typeof this.state.chat !== "array") this.state.chat = [];
        apiResponse.forEach(msg => {
          this.state.chat.push(msg);
        });
        let currentUser = this.state.selectedContact._id;
        this.state.unread = this.state.unread.filter(function(msg) {
          return msg.sender !== currentUser;
        });
        this.setState(this.state);
        break;
      case 204:
        console.log("No Messages");
        if (this.state.chat === false) {
          this.state.chat = [];
        }
        this.setState(this.state);
        break;
      case 404:
      //break;
      case 401:
      //break;
      default:
        console.log("Something went wrong");
    }
  }
  selectUser(user) {
    this.state.selectedContact = user;
    this.state.chat = false;
    api("GET", "/messages/" + user._id, this.renderMessagesApiResponse); // eslint-disable-line
    this.setState(this.state);
    if (this.state.deviceWidth < 2) {
      this.state.notificationsPannelOpen = false;
      this.state.guestsListOpen = false;
      this.setState(this.state);
    }
  }
  handleMessageSendingApiResponse(e) {
    var msgInput = document.querySelector("#messageInputBox");
    msgInput.classList.remove("loading");
    switch (e.target.status) {
      case 200:
        console.log("Message delivered successfully!");
        var apiResponse = JSON.parse(e.target.response);
        console.log(apiResponse);
        this.state.chat.push(apiResponse);
        this.setState(this.state);
        msgInput.value = "";
        break;
      case 404:
      //break;
      case 401:
      //break;
      default:
        console.log("Failed to send message");
    }
  }
  sendMessage(e) {
    e.preventDefault();
    var msgInput = document.querySelector("#messageInputBox");
    api(// eslint-disable-line
      "POST",
      "/message/" + this.state.selectedContact._id, 
      this.handleMessageSendingApiResponse,
      { content: msgInput.value }
    );
    msgInput.classList.add("loading");
  }
  handleMessageDeletion(e, id) {
    var msg = document.getElementById(id);
    msg.classList.remove("loading");
    switch (e.target.status) {
      case 204:
        this.state.chat = this.state.chat.filter(msg => {
          return msg._id !== id;
        });
        this.setState(this.state);
        break;
      default:
        alert("Failed to delete message!");
    }
  }
  handleEditingMessage(e, id, newContent) {
    var msg = document.getElementById(id);
    msg.classList.remove("loading");
    switch (e.target.status) {
      case 204:
        for (var i = 0; i < this.state.chat.length; i++) {
          if (this.state.chat[i]._id === id) {
            this.state.chat[i].content = newContent;
          }
        }
        this.setState(this.state);
        break;
      default:
        alert("Failed to edit message!");
    }
  }
  requestEditingMessage(id, msg) {
    let newMsg = prompt("Edit message", msg);
    if (!newMsg || !newMsg.length) return;
    var msg = document.getElementById(id);
    msg.classList.add("loading");
    let handler = this.handleEditingMessage;
    api(// eslint-disable-line
      "PATCH",
      "/message/" + id, 
      function(e) {
        handler(e, id, newMsg);
      },
      { content: newMsg }
    );
  }
  requestMessageDelete(id) {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    var msg = document.getElementById(id);
    msg.classList.add("loading");
    let handler = this.handleMessageDeletion;
    api(// eslint-disable-line
      "DELETE",
      "/message/" + id, 
      function(e) {
        handler(e, id);
      }
    );
  }
  closeChat() {
    this.state.selectedContact = {};
    this.state.chat = false;
    this.state.guestsListOpen = true;
    this.setState(this.state);
  }
  logout(){
    if(!window.confirm("Are you sure you want to log out?")) return;
    document.cookie = 'guestname=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    document.cookie = 'sessionid=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    window.location.reload();
  }
  render() {
    return (
      <div>
        <div className="navBar">
          <h2>
            <span className="navLeft">
              Welcome to The GuestBook {this.props.login}!
            </span>
            <span
              onClick={this.logout}
              className="navRight clickable"
            > ⮫ 
            </span>
            <span
              onClick={this.toggleNotificationsPannel}
              className="navRight clickable"
            >
              {" "}
              ✉ {this.state.unread.length}{" "}
            </span>
          </h2>
        </div>
        <div className="mainPageContainer">
          <ol className="guests" hidden={!this.state.guestsListOpen}>
            <li>
              <h2>Guests</h2>
            </li>
            {this.state.guests.map(user => (
              <li
                data-time={user.registered}
                data-id={user._id}
                onClick={() => {
                  this.selectUser(user);
                }}
              >
                {user.username}
              </li>
            ))}
          </ol>
          <ChatBox       
          messages = {this.state.chat}
          user = {this.state.selectedContact}
          onMessageEdit = {this.requestEditingMessage}
          onMessageDelete = {this.requestMessageDelete}
          onMessageSubmit = {this.sendMessage}
          />
          <NotificationsPannel 
            isOpen={this.state.notificationsPannelOpen}
            notifications={this.state.unread}
            clickCallback={this.selectUser}
          />
        </div>
      </div>
    );
  }
}
export default MainPage;
