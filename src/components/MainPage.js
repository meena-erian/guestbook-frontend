import React from "react";
import NotificationsPannel from "./NotificationsPannel";
import ChatBox from "./ChatBox";
import ContactList from "./ContactList";

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
    this.setState({ notificationsPannelOpen : !this.state.notificationsPannelOpen});
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
          var newState = this.state;
          apiResponse.messages.forEach(msg => {
            newState.unread.push(msg);
            if (
              newState.selectedContact &&
              msg.sender === newState.selectedContact._id
            ) {
              this.selectUser(newState.selectedContact);
            }
          });
        }
        if (apiResponse.users) {
          console.log(apiResponse.users.length + " new users are registered");
          apiResponse.users.forEach(user => {
            newState.guests.push(user);
          });
        }
        if (apiResponse.users) {
          var timeLastRegisteredUser =
            apiResponse.users[apiResponse.users.length - 1].registered;
          if (timeLastRegisteredUser > newState.lastStatusUpdate)
           newState.lastStatusUpdate = timeLastRegisteredUser;
        }
        if (apiResponse.messages) {
          var timeLastUnreadMessage =
            apiResponse.messages[apiResponse.messages.length - 1].time;
          if (timeLastUnreadMessage > newState.lastStatusUpdate)
          newState.lastStatusUpdate = timeLastUnreadMessage;
        }
        this.setState(newState);
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
        if (typeof (this.state.chat) !== "object") this.setState({chat : []});
        var newState = this.state;
        apiResponse.forEach(msg => {
          newState.chat.push(msg);
        });
        let currentUser = newState.selectedContact._id;
        newState.unread = newState.unread.filter(function(msg) {
          return msg.sender !== currentUser;
        });
        this.setState(newState);
        break;
      case 204:
        console.log("No Messages");
        if (this.state.chat === false) {
          this.setState({ chat : []});
        }
        break;
      //case 404:
      //break;
      //case 401:
      //break;
      default:
        console.log("Something went wrong");
    }
  }
  selectUser(user) {
    this.setState({ selectedContact : user,
    chat : false});
    api("GET", "/messages/" + user._id, this.renderMessagesApiResponse); // eslint-disable-line
    if (this.state.deviceWidth < 2) {
      this.setState({ notificationsPannelOpen : false, guestsListOpen : false});
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
        var newChat = this.state.chat;
        newChat.push(apiResponse);
        this.setState({chat : newChat});
        msgInput.value = "";
        break;
      //case 404:
      //break;
      //case 401:
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
        this.setState({ chat : this.state.chat.filter(msg => {
          return msg._id !== id;
        })});
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
        var newChat = this.state.chat;
        for (var i = 0; i < newChat.length; i++) {
          if (newChat[i]._id === id) {
            newChat[i].content = newContent;
          }
        }
        this.setState({ chat : newChat });
        break;
      default:
        alert("Failed to edit message!");
    }
  }
  requestEditingMessage(id, currentMsg) {
    let newMsg = prompt("Edit message", currentMsg);
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
    this.setState({ selectedContact : {}, chat : false, guestsListOpen : true});
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
          <ContactList 
            isOpen = {this.state.guestsListOpen}
            users = {this.state.guests}
            clickCallback = {this.selectUser}
          />
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
