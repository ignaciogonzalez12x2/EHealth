import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';

class SensorShow extends Component {
  state = {
    idSensor: '',
    MAC: '',
    patientName: '',
    idDoctor: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      let idSensor = this.props.match.params.uint;
      let sensorContract =  await factory.methods.ReadSensor(idSensor).call();
      let MAC = sensorContract[0];
      let patientName = sensorContract[1];
      let idDoctor = sensorContract[2];
      let active = sensorContract[3];

      this.setState({ 
        idSensor: idSensor,
        MAC: MAC,
        patientName: patientName,
        idDoctor: idDoctor,
        active: active
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmit = async event => {
    event.preventDefault();

    // Refresh, using withRouter
    this.props.history.push('/');
  };


  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .UpdateSensor(this.state.idSensor,
              this.state.MAC,
              this.state.patientName, 
              this.state.idDoctor,
              this.state.active)
            .send({ from: accounts[0]});
        alert('Sensor update !');
        // Refresh, using withRouter
        this.props.history.push('/');
    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }

  };


  render() {
    return (
      <div>
        <Dimmer inverted active={this.state.loading}>
          <Loader inverted content='Loading...'></Loader>
        </Dimmer>
        <Link to='/'>Back</Link>
        <h3>Sensor ID</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} hidden={this.state.loading}>
          <Form.Field>
            <label>Sensor ID</label>
            <Input
              value={this.state.idDoctor} 
            />
          </Form.Field>

          <Form.Field>
            <label>MAC</label>
            <Input
              value={this.state.MAC}  
              onChange={event => this.setState({ MAC: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Patient Name</label>
            <Input
              value={this.state.patientName}  
              onChange={event => this.setState({ patientName: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Doctor ID</label>
            <Input
              value={this.state.idDoctor}  
              onChange={event => this.setState({ idDoctor: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Active</label>
            <Input
              value={this.state.active}  
              onChange={event => this.setState({ active: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Update ! 
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SensorShow);
