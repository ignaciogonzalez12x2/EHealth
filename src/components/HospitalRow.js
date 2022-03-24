import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';

class HospitalRow extends Component {
  state = {
    idHospital: '',
    name: '',
    city: '',
    state: '',
    postalCode: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {
    /*let hospitalContract = notification(this.props.hospital);
    let hospital = await hospitalContract.methods.Hospitals(0).call();
    let idHospital = await hospital.idHospital.call();
    let name = await hospital.name.call();
    let city = await hospital.city.call();
    let state = await hospital.state.call();
    let permission = await hospital.permission.call();*/


    //const hospitalList = await factory.methods.getAllHospitals().call();
    
    /*let idHospital =  hospital.idHospital.call();
    let name =  hospital.name.call();
    let city =  hospital.city.call();
    let state =  hospital.state.call();
    let permission =  hospital.permission.call();*/
 

    let idHospital = this.props.hospital.idHospital;
    let name = this.props.hospital.name;
    let city = this.props.hospital.city;
    let state = this.props.hospital.state;
    let postalCode = this.props.hospital.postalCode;
    let permission = this.props.hospital.permission;

   // console.log(hospital);

    this.setState({ 
      idHospital: idHospital,
      name: name,
      city: city,
      state: state,
      postalCode: postalCode,
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
      alert('Hospital accepted!');
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
      alert('Hospital finished!');
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
              <Table.Cell>{this.state.idHospital}</Table.Cell>
              <Table.Cell>{this.state.name}</Table.Cell>
              <Table.Cell>{this.state.city}</Table.Cell>
              <Table.Cell>{this.state.state}</Table.Cell>
              <Table.Cell>{this.state.postalCode}</Table.Cell>
              <Table.Cell>{this.state.permission.toString()}</Table.Cell>
              <Table.Cell>
                  
                    
                      <Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.idHospital)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                        <Button.Content hidden>Finish</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                      </Button>
                    
                      <Button animated='vertical' color='blue' onClick={() => this.onAccept(this.props.idHospital)} disabled={this.state.state!=='created'} loading={this.state.loading}>
                        <Button.Content hidden>Accept</Button.Content>
                        <Button.Content visible>
                          <Icon name='check' />
                        </Button.Content>
                    </Button>
                    
                  
                  <Link to={"/hospitals/"}>
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
