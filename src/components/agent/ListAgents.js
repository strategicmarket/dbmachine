
//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Agents    //////////////////
/////////////////       server side mongodb       //////////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import sortBy                 from 'sort-by'

class ListAgents extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.lastname))

    }
    else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('firstname'))

    return (
      <div className = 'list-contacts'>
        <div className = 'list-contacts-top'>
          <input
            className = 'search-contacts'
            type='text'
            placeholder = 'Search contacts'
            value={this.state.query}
            onChange = { (event) => this.updateQuery(event.target.value)}
          />

      </div>

      {showingContacts.length !== contacts.length && (
        <div className = 'showing-contacts'>
          <span> Showing {showingContacts.length } out of {contacts.length } in our directory</span>
          <button onClick={this.clearQuery}> Show All </button>

        </div>
      )}

      <ol className='contact-list'>
        <h4>Available Agents - Here to Serve You</h4>
        {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
                }}
                />
              <div className='contact-details'>
                <p>{contact.firstname + " " + contact.lastname }</p>
                <p>{contact.email}</p>
                <p>{contact.cell}</p>
              </div>
              <div className='contact-details'>
                <strong>Last Update</strong>
                <p>{contact.postdate}</p>
                <p>{contact.id}</p>
              </div>

              <button  onClick={()=>onDeleteContact(contact)} className='contact-remove' >
                Delete
              </button>

          </li>
        ))}
      </ol>

    </div>
    )
  }
}

export default ListAgents
