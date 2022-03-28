import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';

class DoctorRow extends Component {
  state = {
    idDoctor: '',
    nameDoctor: '',
    hospital: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    let idDoctor = this.props.doctor.idDoctor;
    let nameDoctor = this.props.doctor.nameDoctor;
    let hospital = this.props.doctor.hospital;
    let permission = this.props.doctor.permission;

   // console.log(hospital);

    this.setState({ 
        idDoctor: idDoctor,
        nameDoctor: nameDoctor,
        hospital: hospital,
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
            .RemoveDoctor(this.state.idDoctor)
            .send({ from: accounts[0]});
        alert('Doctor delete !');
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
              <Table.Cell>{this.state.idDoctor}</Table.Cell>
              <Table.Cell>{this.state.nameDoctor}</Table.Cell>
              <Table.Cell>{this.state.hospital}</Table.Cell>
              <Table.Cell>{this.state.permission.toString()}</Table.Cell>
              <Table.Cell>
                
                      <Button animated='vertical' color='blue' onClick={this.onDelete} >
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                          <Icon name='remove' />
                        </Button.Content>
                    </Button>
                    
                  
                  <Link to={"/doctors/"+this.props.doctor[0]}>
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

export default DoctorRow;
