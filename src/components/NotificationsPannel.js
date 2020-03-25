import React from "react";

class NotificationsPannel extends React.Component {

  /*
    Required props
    --------------
    this.props.isOpen = parent.state.notificationsPannelOpen
    this.props.notifications = parent.state.unread
    this.props.clickCallback = parent.selectUser
  */

  render() {
    return (
      <ul className="notificationPanel" hidden={!this.props.isOpen}>
        {this.props.notifications.map(notif => (
          <li
            data-msg={notif._id}
            data-user={notif.sender}
            data-time={notif.time}
            data-status={notif.status}
            onClick={() => {
              this.props.clickCallback({
                username: notif.senderName,
                _id: notif.sender
              });
            }}
          >
            <b>{notif.senderName}: </b>
            {notif.content.substring(0, 10)}
            {notif.content.length > 10 ? "..." : ""}
          </li>
        ))}
      </ul>
    );
  }
}

export default NotificationsPannel;
