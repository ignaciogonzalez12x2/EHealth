import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';

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
    /*const campaign = Campaign(this.props.address);

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });*/
  };

  onAccept = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });
    
    try {
      // Refresh
      alert('Sensor accepted!');
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
      alert('Sensor finished!');
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
              <Table.Cell>{this.state.idSensor}</Table.Cell>
              <Table.Cell>{this.state.MAC}</Table.Cell>
              <Table.Cell>{this.state.patientName}</Table.Cell>
              <Table.Cell>{this.state.idDoctor}</Table.Cell>
              <Table.Cell>{this.state.active.toString()}</Table.Cell>
              <Table.Cell>
                  
                    
                      <Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.idSensor)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                        <Button.Content hidden>Finish</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                      </Button>
                    
                      <Button animated='vertical' color='blue' onClick={() => this.onAccept(this.props.idSensor)} disabled={this.state.state!=='created'} loading={this.state.loading}>
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

export default SensorRow;