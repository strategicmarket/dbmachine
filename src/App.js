
////////////////////////////////////////////////////////////////////////
/////////////////  Main App for Agent Store          //////////////////
/////////////////    Connecting Business to Bots   ///////////////////
//////////////////////////////////////////////////////////////////////

import React, { Component }   from 'react';
import ListAgents             from './components/agent/ListAgents';
import ListClients            from './components/client/ListClients';
import * as ContactsAPI       from './utils/ContactsAPI'
import Navpills               from './components/common/Navpills';
import Home                   from "./components/common/Home";
import About                  from "./components/common/About";
import Blog                   from "./components/common/Blog";
import Contact                from "./components/common/Contact";


// note lifecycle method to load all contacts when mounted

class App extends Component {
  state = {
    agents: [ ],
    clients: [ ],
    currentPage: "Agents"
  }

  removeAgentContact = (contact) => {
    ContactsAPI.remove(contact.id).then(cnt =>{
      this.setState( (state) => ({
        agents: state.agents.filter((c) => c.id !== contact.id )
      }) )
    })
  }
  removeClientContact = (contact) => {
    ContactsAPI.removeClient(contact.id).then(cnt =>{
      this.setState( (state) => ({
        clients: state.clients.filter((c) => c.id !== contact.id )
      }) )
    })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Agents") {

      return <ListAgents
                onDeleteContact = { this.removeAgentContact }
                contacts={this.state.agents}
              />

          } else if (this.state.currentPage === "Clients") {

       return <ListClients
                 onDeleteContact = { this.removeClientContact }
                 contacts={this.state.clients}
               />

    } else if (this.state.currentPage === "Blog") {
      return <Blog />;
    } else {
      return <Contact />;
    }
  };

  componentDidMount() {
        ContactsAPI.getAll().then((agents) => {
          this.setState({ agents })
        })
        ContactsAPI.getAllClients().then((clients) => {
             this.setState({ clients })
           })
      }

  render() {
    return (
      <div className = 'app'>
        <Navpills
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
          />
        {this.renderPage()}

       </div>
    );
  }
}

export default App;
