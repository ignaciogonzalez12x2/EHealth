import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class HospitalNew extends Component {
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

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .createHospital([this.state.idHospital],
              this.state.name, 
              this.state.city, 
              this.state.state, 
              this.state.postalCode, 
              this.state.permission)
            .send({ from: accounts[0]});

        alert('Hospital created!');
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
        <h3>Create New Hospital</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Receiver</label>
            <Input
              value={this.state.idHospital}
              onChange={event => this.setState({ receiver: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>City</label>
            <Input
              value={this.state.city}
              onChange={event => this.setState({ city: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>State</label>
            <Input
              value={this.state.state}
              onChange={event => this.setState({ state: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Postal Code</label>
            <Input
              value={this.state.postalCode}
              onChange={event => this.setState({ postalCode: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Permission</label>
            <Input
              value={this.state.permission}
              onChange={event => this.setState({ permission: event.target.value })}
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

export default withRouter(HospitalNew);
