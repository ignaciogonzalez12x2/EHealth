import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';

class SensorRow extends Component {
  state = {
    idSensor: '',
    MAC: '',
    patientName: '',
    idDoctor: '',
    active: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    let idSensor = this.props.sensor.idSensor;
    let MAC = this.props.sensor.MAC;
    let patientName = this.props.sensor.patientName;
    let idDoctor = this.props.sensor.idDoctor;
    let active = this.props.sensor.active;

    this.setState({ 
        idSensor: idSensor,
        MAC: MAC,
        patientName: patientName,
        idDoctor: idDoctor,
        active: active,
    });
  }

  onView = async () => {
  };

  onDelete = async () => {

    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .RemoveSensor(this.state.idSensor)
            .send({ from: accounts[0]});
        alert('Sensor delete !');
        // Refresh, using withRouter
        this.props.history.push('/');
    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
    window.location.reload(true);
  };

  onSend = async () => {

  };


  render() {
      return (
          <Table.Row>
              <Table.Cell>{this.state.idSensor}</Table.Cell>
              <Table.Cell>{this.state.MAC}</Table.Cell>
              <Table.Cell>{this.state.patientName}</Table.Cell>
              <Table.Cell>{this.state.idDoctor}</Table.Cell>
              <Table.Cell>{this.state.active.toString()}</Table.Cell>
              <Table.Cell>

              <Button animated='vertical' color='blue' onClick={this.onSend}>
                        <Button.Content hidden>Send</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                      </Button>

                      <Button animated='vertical' color='blue' onClick={this.onDelete}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                          <Icon name='remove' />
                        </Button.Content>
                    </Button>

                  <Link to={"/sensors/"+this.props.sensor.idSensor}>
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

export default SensorRow;