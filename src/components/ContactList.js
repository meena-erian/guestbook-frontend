import React from "react";

class ContactList extends React.Component {

 /*
    Required props
    --------------
      this.props.isOpen = parent.state.guestsListOpen
      this.props.users = parent.state.guests
      this.props.clickCallback = parent.selectUser
 */

  render() {
    return (
      <ol className="guests" hidden={!this.props.isOpen}>
        <li>
          <h2>Guests</h2>
        </li>
        {this.props.users.map(user => (
          <li
            data-time={user.registered}
            data-id={user._id}
            onClick={() => {
              this.props.clickCallback(user);
            }}
          >
            {user.username}
          </li>
        ))}
      </ol>
    );
  }
}

export default ContactList;