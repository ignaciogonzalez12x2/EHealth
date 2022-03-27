import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import notification from '../ethereum/notification';
import web3 from '../ethereum/web3';

class DoctorShow extends Component {
  state = {
    idDoctor: '',
    nameDoctor: '',
    hospital: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      let address = this.props.match.params.address;
      let doctorContract = notification(address);
      let idDoctor = await web3.eth.getBalance(address);
      let name = await doctorContract.methods.nameDoctor.call();
      let hospital = await doctorContract.methods.hospital.call();
      let permission = await doctorContract.methods.permission.call();
     
      this.setState({ 
        idDoctor: idDoctor,
        name: name,
        hospital: hospital,
        permission: permission,
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
        <h3>Show Doctor</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} hidden={this.state.loading}>
          <Form.Field>
            <label>Address of Hospital</label>
            <Input
              readOnly
              value={this.state.idDoctor}
            />
          </Form.Field>

          <Form.Field>
            <label>Name</label>
            <Input
              readOnly
              value={this.state.name}
            />
          </Form.Field>

          <Form.Field>
            <label>Hospital</label>
            <Input
              readOnly
              value={this.state.hospital}
            />
          </Form.Field>

          <Form.Field>
            <label>Permission</label>
            <Input
              readOnly
              value={this.state.permission}
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

export default withRouter(DoctorShow);
