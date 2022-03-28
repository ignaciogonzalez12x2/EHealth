import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
import factory from '../ethereum/factory';
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
      let doctorContract =  await factory.methods.ReadDoctor(address).call();

      let idDoctor = address;
      let nameDoctor = doctorContract[0];
      let hospital = doctorContract[1];
      let permission = doctorContract[2];

      this.setState({ 
        idDoctor: idDoctor,
        nameDoctor: nameDoctor,
        hospital: hospital,
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
            .UpdateDoctor(this.state.idDoctor,
              this.state.nameDoctor,
              this.state.hospital, 
              this.state.permission)
            .send({ from: accounts[0]});
        alert('Doctor update !');
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
            <label>Doctor ID</label>
            <Input
              value={this.state.idDoctor} 
            />
          </Form.Field>

          <Form.Field>
            <label>Name</label>
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

export default withRouter(DoctorShow);
