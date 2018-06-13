
//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Contacts  //////////////////
/////////////////    server side 'in memory' db    //////////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import { Link }               from 'react-router-dom'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import sortBy                 from 'sort-by'

class ListContacts extends Component {

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


// need to refactor code so that it is egneric to the alerts (maybe an array of items)
  showAlert1 = (contact) => {
    if (contact) return "Prayer Alert"
  }
  showAlert2 = (contact) => {
    if (contact) return "Moments"
  }
  showAlert3 = (contact) => {
    if (contact) return "Weekly Updates"
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
        <Link
          to="/profile"
          className = "add-contact"
        >Add Profile</Link>
        <Link
          to="/chat"
          className = "add-chat"
        >Chat</Link>

      </div>

      {showingContacts.length !== contacts.length && (
        <div className = 'showing-contacts'>
          <span> Showing {showingContacts.length } out of {contacts.length } in our directory</span>
          <button onClick={this.clearQuery}> Show All </button>

        </div>
      )}

      <ol className='contact-list'>
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
                <strong>Subscriptions</strong>
                  {this.showAlert1(contact.subscribe.prayeralerts)} <b></b>
                  {this.showAlert2(contact.subscribe.moments)} <b></b>
                  {this.showAlert3(contact.subscribe.updates)} <b></b>
                <pre>
                </pre>
                <p>{contact.id}</p>
              </div>

              <Link
                to={"/edit/" + encodeURIComponent(JSON.stringify(contact))}
                className = "contact-edit">
                Edit
              </Link>

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

export default ListContacts
