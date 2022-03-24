import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class DoctorNew extends Component {
  state = {
    idDoctor: '',
    nameDoctor: '',
    hospital: '',
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
            .AddDoctor(this.state.nameDoctor,
              this.state.hospital)
            .send({ from: accounts[0]
            });
        alert('Doctor created!');
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
        <h3>Create New Doctor</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Doctor name</label>
            <Input
              value={this.state.nameDoctor}
              onChange={event => this.setState({ nameDoctor: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Hospital</label>
            <Input
              value={this.state.hospital}
              onChange={event => this.setState({ hospital: event.target.value })}
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

export default withRouter(DoctorNew);
