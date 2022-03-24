import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class SensorNew extends Component {
  state = {
    idSensor: '',
    mac: '',
    patientName: '',
    idDoctor: '',
    active: false,
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .AddSensor(this.state.mac,
              this.state.patientName,
              this.state.idDoctor,
              this.state.active)
            .send({ from: accounts[0]
            });
        alert('Sensor created!');
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
        <Link to='/'>Back</Link>
        <h3>Create New Sensor</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>MAC address</label>
            <Input
              value={this.state.mac}
              onChange={event => this.setState({ mac: event.target.value })}
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
            <label>Active Sensor</label>
            <Input
              value={this.state.active}
              onChange={event => this.setState({ active: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SensorNew);
