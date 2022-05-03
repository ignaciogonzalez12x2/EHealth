import React, { Component } from 'react';
//import web3 from '../ethereum/web3';
import { matchPath } from 'react-router'
import factory from '../ethereum/factory';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  
  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );


class SensorGraphic extends Component {
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

    let idSensor = this.props.match.params.uint;
    let sensorContract =  await factory.methods.ReadSensor(idSensor).call();
    let data = await factory.methods.viewSensorData(idSensor).call();
    let MAC = sensorContract[0];
    let patientName = sensorContract[1];
    let idDoctor = sensorContract[2];
    let active = sensorContract[3];

    this.setState({ 
        idSensor: idSensor,
        MAC: MAC,
        patientName: patientName,
        idDoctor: idDoctor,
        active: active,
        data: data
    });
  }

 /* onGraphic = async () => {

    this.setState({ loading: true, errorMessage: '' });
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .RemoveSensor(this.state.idSensor)
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
  };*/

  onOptions = async () => {
    try {
        return ({
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Graphic Cardiac Rhythm',
              },
            },
          });
    } finally {
        this.setState({ loading: false });
    }
  };

  onData = async () =>{
    try {
        const id=matchPath(window.location.hash, {path: "#/sensors/data/:id"});
        const labels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
        return ({
        id,
        labels,
        datasets: [
            {
                label: 'Cardiac Rhythm of patient',
                //data: ['67','68','97','77','100','67','67','67','67','68','97','77','100','67','67','67','99','99','99','99'],
                data: id==null ? 0 : this.state.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        });
    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };
  


  render() {
      return (

        <Line options={this.onOptions()} data={this.onData()}/>
          
      );
    }
}

export default SensorGraphic;