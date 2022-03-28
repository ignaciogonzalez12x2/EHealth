import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';

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
    /*const campaign = Campaign(this.props.address);

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });*/
  };

  onAccept = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });
    
    try {
      // Refresh
      alert('Doctor accepted!');
      this.setState({ state: 'accepted' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };

  onFinish = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      // Refresh
      alert('Doctor finished!');
      this.setState({ state: 'finished' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };

  render() {
      return (
          <Table.Row>
              <Table.Cell>{this.state.idDoctor}</Table.Cell>
              <Table.Cell>{this.state.nameDoctor}</Table.Cell>
              <Table.Cell>{this.state.hospital}</Table.Cell>
              <Table.Cell>{this.state.permission.toString()}</Table.Cell>
              <Table.Cell>
                  
                    
                      {/*<Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.idDoctor)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                        <Button.Content hidden>Finish</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                   </Button>*/}
                    
                      <Button animated='vertical' color='blue' onClick={() => this.onAccept(this.props.idDoctor)} disabled={this.state.state!=='created'} loading={this.state.loading}>
                        <Button.Content hidden>Accept</Button.Content>
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
