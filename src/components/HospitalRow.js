import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';

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
              <Table.Cell>{this.state.city}</Table.Cell>
              <Table.Cell>{this.state.state}</Table.Cell>
              <Table.Cell>{this.state.postalCode}</Table.Cell>
              <Table.Cell>{this.state.permission.toString()}</Table.Cell>
              <Table.Cell>
                  
                    
                      {/*<Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.idHospital)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                        <Button.Content hidden>Finish</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                    </Button>*/}
                    
                   
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
