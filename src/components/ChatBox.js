import React from "react";

class ChatBox extends React.Component {
  /*
    Required props
    --------------
      this.props.messages = parent.state.chat
      this.props.user = parent.state.selectedContact
      this.props.onMessageEdit = parent.requestEditingMessage
      this.props.onMessageDelete = parent.requestMessageDelete
      this.props.onMessageSubmit = parent.sendMessage
      this.props.onClose = parent.closeChat
  */

  render() {
    return (
      <div
        className="chatBox"
        hidden={this.props.messages === undefined || this.props.messages === false}
      >
        <div className="chatStatus">
          <h3>
            {this.props.user.username
              ? this.props.user.username
              : "Choose a guest to message"}
            {this.props.user.username ? (
              <span className="navRight clickable" onClick={this.props.onClose}>
                X
              </span>
            ) : (
              ""
            )}
          </h3>
        </div>
        <ul>
          {this.props.messages === undefined ? (
            <div>
              <li>No contact selected!</li>
              <li>Welcome to the guestbook app</li>
            </div>
          ) : this.props.messages === false ? (
            <div>
              <li>Hang on! the chat is loading...</li>
            </div>
          ) : this.props.messages.length ? (
            this.props.messages.map(msg => (
              <li
                key={msg._id}
                id={msg._id}
                data-time={msg.time}
                data-status={msg.status}
                className={
                  msg.sender === this.props.user._id
                    ? ""
                    : "sentMessage"
                }
              >
                {msg.content}
                {msg.sender === this.props.user._id ? (
                  ""
                ) : (
                  <p className="msgfooter">
                    <span
                      style={{float : "left"}}
                      className="clickable"
                      onClick={() => {
                        this.props.onMessageEdit(msg._id, msg.content);
                      }}
                    >
                      <img src="/edit.png" alt="🖊" />
                    </span>
                    <span
                      className="clickable"
                      onClick={() => {
                        this.props.onMessageDelete(msg._id);
                      }}
                    >
                      <img src="/trash.png" alt="🗑" />
                    </span>
                  </p>
                )}
              </li>
            ))
          ) : (
            <div>
              <p>
                Nothing here
                <br /> Try sending a message
              </p>
            </div>
          )}
        </ul>
        <form onSubmit={e => this.props.onMessageSubmit(e)} className="messagingForm">
          <input
            id="messageInputBox"
            placeholder="Write a message"
            type="text"
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default ChatBox;
