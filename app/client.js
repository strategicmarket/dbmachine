

/////////////////////////////////////////////////////
//////////            web page         /////////////
///////////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';


let localStorage = {
  token: ""
}
// Generate a unique token for storing your data on backend server.
let token = localStorage.token

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
 }

let headers = {
  'Accept': 'application/json',
  'Authorization': token
 }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: ''
    };
  }
  changeInput(event) {
    this.setState({recipient: event.target.value});
  }

  sendSMS() {
      fetch(`/sendsms`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"recipient": this.state.recipient})
      })
    }

render() {
  return (
    <div>
      <p>Enter phone number to send SMS to: </p>
      <input onChange={this.changeInput.bind(this)} value={this.state.recipient} placeholder="+12223334444"/>
      <button onClick={this.sendSMS.bind(this)}>Send message</button>
        <p>Don't forget your country code, e.g., +1.</p>
    </div>
  );
}
}

ReactDOM.render(
  <App/>, document.getElementById('root'));
