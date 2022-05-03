import React, { Component, useRef } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import emailjs from '@emailjs/browser'

class SensorRow extends Component {
  state = {
    idSensor: '',
    MAC: '',
    patientName: '',
    idDoctor: '',
    active: false,
    data: '',
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
            .RemoveSensor(this.state.idSensor, this.state.idDoctor)
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

    this.setState({ loading: true, errorMessage: '' });
    try {
      const min = 0;
      const max = 120;
      let init = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      let data = init.map((ini)=> parseInt(ini + (min + Math.random() * (max - min))));
      this.setState({ 
        data: data
      });
      const accounts = await web3.eth.getAccounts();
      // EMAIL 
      let isBad = false;
      for (let i = 0 ; i< data.length ; i++){
        if(data[i]>100 || data[i]<60){
          isBad = true;
        }
      }
      if(isBad){

          emailjs.send("service_wknqeo1","template_h5a6es2",{
            idDoctor: this.state.idDoctor,
            patientName: this.state.patientName,
            idSensor: this.state.idSensor,
            },'f6PEbOqOtjL70Oc8K')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        
      }
      
      await factory.methods
            .sendData(this.state.idSensor, this.state.data)
            .send({ from: accounts[0]});
        alert('Sensor sending data !');
        // Refresh, using withRouter
        // this.props.history.push('/');
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
                      <Button.Content hidden>Params</Button.Content>
                      <Button.Content visible>
                        <Icon name='eye' />
                      </Button.Content>
                    </Button>
                  </Link>
                  <Link to={"/sensors/data/"+this.props.sensor.idSensor}>
                    <Button animated='vertical' color='blue' onClick={this.onView}>
                      <Button.Content hidden>Data</Button.Content>
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