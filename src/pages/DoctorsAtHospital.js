import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import DoctorRow from '../components/DoctorRow';

class DoctorsAtHospital extends Component {
    state = {
        doctorList: '',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const id = this.props.match.params.address;
            const doctorList = await factory.methods.getAllDoctorsInHospital(id).call();
            this.setState({ 
                doctorList: doctorList,
            });
        } finally {
            this.setState({ loadingPage: false })
        }
    }
    renderDoctorRows() {
        let doctorsHospital = this.state.doctorList;
        let doctorFilter = doctorsHospital.filter( doctor => doctor.idDoctor != 0x0000000000000000000000000000000000000000);
        return doctorFilter.map((doctor, index) => {
            return (
                <DoctorRow
                    key={index}
                    index={index}
                    doctor={doctor}
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
                <h3><Icon name='sign out alternate' circular />&nbsp;Actives Doctors</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Doctor ID </Table.HeaderCell>
                            <Table.HeaderCell>Doctor Name</Table.HeaderCell>
                            <Table.HeaderCell>Hospital</Table.HeaderCell>
                            <Table.HeaderCell>Permission</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderDoctorRows()}</Table.Body>
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

export default DoctorsAtHospital;
