import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import SensorRow from '../components/SensorRow';

class SensorsOfDoctor extends Component {
    state = {
        sensorList: '',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const id = this.props.match.params.address;     
            const sensorList = await factory.methods.getAllSensorOfDoctor(id).call();
            this.setState({ 
                sensorList: sensorList,
            });
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderSensorRows() {
        let sensorsDoctor = this.state.sensorList;
        let sensorFilter = sensorsDoctor.filter( sensor => sensor.idDoctor != 0x0000000000000000000000000000000000000000);
        return sensorFilter.map((sensor, index) => {
            return (
                <SensorRow
                    key={index}
                    index={index}
                    sensor={sensor}
                />
            );
        });
    }

    render() {
        // Loading
        if (this.state.loadingPage) return (
            <div>
                <Segment style={{ height: '80vh' }}>
                    <Dimmer active inverted>
                        <Loader inverted content='Loading...' />
                    </Dimmer>
                </Segment>
            </div>
        );
      
        // Done
        return (
            <div>
                <h3><Icon name='sign out alternate' circular />&nbsp;Actives Sensors</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Sensor ID </Table.HeaderCell>
                            <Table.HeaderCell>MAC</Table.HeaderCell>
                            <Table.HeaderCell>Patient Name</Table.HeaderCell>
                            <Table.HeaderCell>Doctor ID</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderSensorRows()}</Table.Body>
                </Table>
                <Link to="/hospital/new">
                    <Button
                        content = "New Hospital"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
                <Link to="/doctor/new">
                    <Button
                        content = "New Doctor"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
                <Link to="/sensor/new">
                    <Button
                        content = "New Sensor"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
            </div>
        );
    }
}

export default SensorsOfDoctor;