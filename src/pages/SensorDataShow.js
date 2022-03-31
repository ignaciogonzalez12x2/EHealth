import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Message, Input, Dimmer, Loader } from 'semantic-ui-react';
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
//import { matchPath } from 'react-router';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

class SensorDataShow extends Component {
  state = {
    idSensor: '',
    MAC: '',
    patientName: '',
    idDoctor: '',
    permission: false,
    data: '',
    datas: '',
    options: '',
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      let idSensor = this.props.match.params.uint;
      let sensorContract =  await factory.methods.ReadSensor(idSensor).call();
      let data = await factory.methods.viewSensorData(idSensor).call();
      let MAC = sensorContract[0];
      let patientName = sensorContract[1];
      let idDoctor = sensorContract[2];
      let active = sensorContract[3];
      this.state.data = data;
      let datas = this.onData();
      this.state.datas = datas;
      let options= this.onOptions();
      this.state.options = options;
      this.setState({ 
        idSensor: idSensor,
        MAC: MAC,
        patientName: patientName,
        idDoctor: idDoctor,
        active: active,
        data: data,
        options: options
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onData(){ 
    //const id=matchPath(window.location.hash, {path: "#/sensors/data/:id"});
    const labels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

    return ({
 //     id,
      labels,
      datasets: [
          {
              label: 'Cardiac Rhythm of patient',
              //data: ['67','68','97','77','100','67','67','67','67','68','97','77','100','67','67','67','99','99','99','99'],
              data:  this.state.data === "" ? "" : this.state.data,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
          ],
      });



  }
  onOptions(){
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

}

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
              value={this.state.idSensor} 
            />
          </Form.Field>
          <Form.Field>
            <label>MAC</label>
            <Input
              value={this.state.MAC}  
            />
          </Form.Field>
          <Form.Field>
            <label>Patient Name</label>
            <Input
              value={this.state.patientName}  
            />
          </Form.Field>
          <Form.Field>
            <label>Doctor ID</label>
            <Input
              value={this.state.idDoctor}  
            />
          </Form.Field>
          <Form.Field>
            <label>Active</label>
            <Input
              value={this.state.active}  
            />
          </Form.Field>
          <Line options={(this.state.options === "") ? "" : this.state.options} data={(this.state.datas === "" ) ? "" : this.state.datas }/>
          <Message error header="ERROR" content={this.state.errorMessage} />
        </Form>
      </div>
    );
  }
}

export default withRouter(SensorDataShow);
