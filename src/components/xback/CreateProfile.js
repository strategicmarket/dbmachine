

//////////////////////////////////////////////////////////////////////////
/////////////////  Component To Create New Contacts    //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import {Launcher}         from 'react-chat-window'
import Form               from "react-jsonschema-form";
import Model              from "./models/member.js"

const log = (type) => console.log.bind(console, type);

class CreateProfile extends Component {

  static propTypes = {
    onCreateProfile: PropTypes.func.isRequired
  }

  state = {
    messageList: [
      {
        author: 'them',
        type: 'text',
        data: {
          text: 'some text'
        }
      },
      {
        author: 'me',
        type: 'emoji',
        data: {
          code: 'someCode'
        }
      } ]
  }

  handleSubmit = (e) => {
    if (this.props.onCreateProfile)
        this.props.onCreateProfile(e.formData)

  }
  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div className="col-xs-8 col-xs-offset-2">
        <Form schema={Model.schema}
          onChange={log("changed")}
          onSubmit={this.handleSubmit}
          onError={log("errors")}
        />
          </div>
        </div>
      <div>
        <Launcher
          agentProfile={{
            teamName: 'react-live-chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this.state.messageList[0]}
          messageList={this.state.messageList}
          />
      </div>
    </div>
    )
  }

}

export default CreateProfile
