import React from 'react';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.login}</h1>
      </div>
    );
  }
}
export default MainPage;
