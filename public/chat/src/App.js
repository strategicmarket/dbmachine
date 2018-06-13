
////////////////////////////////////////////////////////////////////////
/////////////////            web chat                //////////////////
/////////////////    Connecting Business to Bots   ///////////////////
//////////////////////////////////////////////////////////////////////

import React, { Component }       from 'react';
import { Widget,
         addResponseMessage,
         addLinkSnippet,
         addUserMessage }         from 'react-chat-widget';
import uuidv1                     from 'uuid/v1';
import logo                       from '../../avatar/persona/mark.png'

let apiProfile = "http://localhost:3000"
let user = "+19145005391"
let platform = "+19802294921"

let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
const msgObj = {
  MessageSid: uuidv1(),
  SmsSid:uuidv1(),
  AccountSid: uuidv1(),
  MessagingServiceSid: uuidv1(),
  From: user,
  To: platform,
  Body: "",
  NumMedia: "",
  NumSegments: "",
  MediaContentType: " ",
  MediaUrl: " ",
  FromCity:"Charlotte",
  FromState: "NC",
  FromZip: "28222",
  FromCounty: "USA",
  SmsStatus: "",
  ToCity: "Charlotte",
  ToState: "NC",
  ToZip: "28222",
  ToCountry: "USA",
  AddOns: " ",
  ApiVersion: "v1",
  PostDate: Date.now(),
  ChaoticSid: uuidv1(),
  ChaoticSource: "web"
}

class App extends Component {

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    msgObj.Body = newMessage
    fetch(`${apiProfile}/api/sms`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgObj)
      }).then(res => res.json()).then(response =>{
        addResponseMessage(response.message);
        if (response.link) {
            addLinkSnippet({
              title: 'Click on the link',
              link: response.link
            })
          }
      })
      }

  componentDidMount() {
    addResponseMessage("Let's get started! How can I help you?");
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Strategic Machines"
          subtitle="Connecting Business to the Conversational Economy"

        />
      </div>
    );
  }
}

export default App;
