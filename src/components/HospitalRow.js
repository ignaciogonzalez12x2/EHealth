import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';

class HospitalRow extends Component {
  state = {
    idHospital: '',
    name: '',
    state: '',
    postalCode: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    let idHospital = this.props.hospital.idHospital;
    let name = this.props.hospital.name;
    let state = this.props.hospital.state;
    let postalCode = this.props.hospital.postalCode;
    let permission = this.props.hospital.permission;

    this.setState({ 
      idHospital: idHospital,
      name: name,
      state: state,
      postalCode: postalCode,
      permission: permission,
    });
  }

  onView = async () => {
  };

  onDelete = async () => {

    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .RemoveHospital(this.state.idHospital)
            .send({ from: accounts[0]});
        alert('Hospital delete !');
        // Refresh, using withRouter
        this.props.history.push('/');
    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
    window.location.reload(true);
  };

  render() {
      return (
          <Table.Row>
              <Table.Cell>{this.state.idHospital}</Table.Cell>
              <Table.Cell>{this.state.name}</Table.Cell>
              <Table.Cell>{this.state.state}</Table.Cell>
              <Table.Cell>{this.state.postalCode}</Table.Cell>
              <Table.Cell>{this.state.permission.toString()}</Table.Cell>
              <Table.Cell>
                  
                    <Link to={"/hospital/"+this.props.hospital.idHospital+"/doctors"}>
                      <Button animated='vertical' color='blue' onClick={this.onView}>
                        <Button.Content hidden>Doctors</Button.Content>
                        <Button.Content visible>
                          <Icon name='eye' />
                        </Button.Content>
                      </Button>
                    </Link>
                    
                   
                      <Button animated='vertical' color='blue' onClick={this.onDelete}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                          <Icon name='remove' />
                        </Button.Content>
                      </Button>
                    
                  
                  <Link to={"/hospitals/"+this.props.hospital[0]}>
                    <Button animated='vertical' color='blue' onClick={this.onView}>
                      <Button.Content hidden>View</Button.Content>
                      <Button.Content visible>
                        <Icon name='eye' />
                      </Button.Content>
                    </Button>
                  </Link>
                  <Message error header="ERROR" content={this.state.errorMessage} hidden={!this.state.errorMessage} />
                </Table.Cell>
          </Table.Row>
          
      );
    }
}

export default HospitalRow;
