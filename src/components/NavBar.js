import React from "react";

class NavBar extends React.Component{
  /*
    Required props
    --------------
    this.props.username = parent.props.login
    this.props.onLogout = parent.logout
    this.props.onEnvelopeClick = parent.toggleNotificationsPannel
    this.props.notifications = parent.state.unread
    this.props.deviceWidth = parent.state.deviceWidth
  */
    render(){
        return(
            <div className="navBar">
            <h2>
              <span className="navLeft">
        Welcome{(this.props.deviceWidth > 1? " to The GuestBook," : ", ") + this.props.username}!
              </span>
              <span
                onClick={this.props.onLogout}
                className="navRight clickable"
              > <img style={{
                position: "absolute",
                height: 35,
                top: 9,
                right: 8,
              }} src="/logout.png" alt = "⮫"/>
              </span>
              <span
                onClick={this.props.onEnvelopeClick}
                className={this.props.notifications.length > 0? "navRight clickable": "navRight"}
              >
                <img src="/envelope.png" 
                style={{
                  height: 68,
                  position: "absolute",
                  right: 50,
                  top: -9}}
                alt = "✉"/> 
                {this.props.notifications.length > 0 ? 
                <abbr 
                title={"You have " + this.props.notifications.length + " unread messages"}
                style={
                  {
                    position: "absolute",
                    top: 5,
                    right: 58,
                    fontSize: 16,
                    background: "orange",
                    paddingRight: 7,
                    paddingLeft: 7,
                    borderRadius: 32,
                    color: "var(--code5)",
                    textDecoration: "none"
                  }
                }
                >
                  {this.props.notifications.length}
                </abbr> : ""}
              </span>
            </h2>
          </div>
        )
    }
}

export default NavBar;