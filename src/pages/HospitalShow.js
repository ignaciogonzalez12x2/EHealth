import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';

class HospitalShow extends Component {
  state = {
    idHospital: '',
    name: '',
    city: '',
    state: '',
    postalCode: '',
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      let address = this.props.match.params.address;
      let hospitalContract = notification(address);
      debugger;
      /*let deposit = await web3.eth.getBalance(address);
      let sender = await hospitalContract.methods.sender().call();
      let receiver = await hospitalContract.methods.receivers(0).call();
      let message = await hospitalContract.methods.message().call();*/
      let idHospital = await web3.eth.getBalance(address);
      let name = await hospitalContract.methods.name().call();
      let city = await hospitalContract.methods.city().call();
      let state = await hospitalContract.methods.state().call();
      let postalCode = await hospitalContract.methods.postalCode().call();
      console.log("Hello world ! ");
      console.log(address);
      console.log(hospitalContract);
      this.setState({ 
        idHospital: idHospital,
        name: name,
        city: city,
        state: state,
        postalCode: postalCode
        //message: message,
        //deposit: deposit
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

  render() {
    return (
      <div>
        <Dimmer inverted active={this.state.loading}>
          <Loader inverted content='Loading...'></Loader>
        </Dimmer>
        <Link to='/'>Back</Link>
        <h3>Show Hospital</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} hidden={this.state.loading}>
          <Form.Field>
            <label>Address of Smart Contract</label>
            <Input
              readOnly
              value={this.state.idHospital}
            />
          </Form.Field>

          <Form.Field>
            <label>Sender</label>
            <Input
              readOnly
              value={this.state.name}
            />
          </Form.Field>

          <Form.Field>
            <label>Receiver</label>
            <Input
              readOnly
              value={this.state.city}
            />
          </Form.Field>

          <Form.Field>
            <label>Message</label>
            <Input
              readOnly
              value={this.state.state}
            />
          </Form.Field>

          <Form.Field>
            <label>Deposit</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.postalCode}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Close
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(HospitalShow);
