import { connect } from 'react-redux'
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import PropTypes from 'prop-types'

class TicketControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            selectedTicket: null,
            editing: false
        };
         this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(prevState => ({
          formVisibleOnPage: !prevState.formVisibleOnPage
        }));
      }
      
      handleAddingNewTicketToList = (newTicket) => {
        const { dispatch } = this.props;
        const { id, names, location, issue } = newTicket;
        const action = {
          type: 'ADD_TICKET',
          id: id,
          names: names,
          location: location,
          issue: issue,
        }
        dispatch(action);
        this.setState({formVisibleOnPage: false});
      }

      handleEditingTicketInList = (ticketToEdit) => {
          const { dispatch } = this.props;
          const { id, names, location, issue } = ticketToEdit;
          const action = {
              type: 'ADD_TICKET',
              id: id,
              names: names,
              location: location,
              issue: issue
          }
          dispatch(action);
          this.setState({
              editing: false,
              selectedTicket: null
          })
      }

      handleChangingSelectedTicket = (id) => {
          const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
          this.setState({selectedTicket: selectedTicket});
      }

      handleDeletingTicket = (id) => {
        const { dispatch } = this.props;
        const action = {
            type: 'DELETE_TICKET',
            id: id
        }
        dispatch(action);
        this.setState({selectedTicket: null});
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewTicketForm />;
            buttonText = 'Return to Ticket List';
        } else {
            currentlyVisibleState = <TicketList />;
            buttonText = 'Add Ticket';
        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterTicketList : state
    }
}

TicketControl.propTypes = {
    masterTicketList: PropTypes.object
}

TicketControl = connect(mapStateToProps)(TicketControl)



export default TicketControl;