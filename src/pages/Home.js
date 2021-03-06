import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import HospitalRow from '../components/HospitalRow';

class Home extends Component {
    state = {
        hospitalList: '',
        hospitalCount: '',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const hospitalCount = await factory.methods.Length_Hospitals().call();
            const hospitalList = await factory.methods.getAllHospitals().call();
            this.setState({ 
                hospitalList: hospitalList,
                hospitalCount: hospitalCount,
            });
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderHospitalRows() {
        let hospitalCenters = this.state.hospitalList;
        return hospitalCenters.map((hospital, index) => {
            return (
                <HospitalRow
                    key={index}
                    index={index}
                    hospital={hospital}
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
                <h3><Icon name='sign out alternate' circular />&nbsp;Actives Hospitals</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Hospital ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>State</Table.HeaderCell>
                            <Table.HeaderCell>Postal Code</Table.HeaderCell>
                            <Table.HeaderCell>Permission</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderHospitalRows()}</Table.Body>
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

export default Home;
