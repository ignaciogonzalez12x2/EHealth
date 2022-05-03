import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class HospitalShow extends Component {
  state = {
    idHospital: '',
    name: '',
    state: '',
    postalCode: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      let address = this.props.match.params.address;
      let hospitalContract =  await factory.methods.ReadHospital(address).call();
      let idHospital = address;
      let name = hospitalContract[0];
      let state = hospitalContract[1];
      let postalCode = hospitalContract[2];
      let permission = hospitalContract[3];

      this.setState({ 
        idHospital: idHospital,
        name: name,
        state: state,
        postalCode: postalCode,
        permission: permission
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
            .UpdateHospital(this.state.idHospital,
              this.state.name,
              this.state.state, 
              this.state.postalCode,
              this.state.permission)
            .send({ from: accounts[0]});
        alert('Hospital update !');
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
        <h3>Hospital ID</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} hidden={this.state.loading}>
          <Form.Field>
            <label>Hospital ID</label>
            <Input
              value={this.state.idHospital} 
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
            Update ! 
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(HospitalShow);
