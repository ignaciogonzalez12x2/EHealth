import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import HospitalRow from '../components/HospitalRow';

class Home extends Component {
    state = {
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const hospitalCount = await factory.methods.Length_Hospitals(accounts[0]).call();
            //const hospitalInactiveCount = await factory.methods.getHospitals(accounts[0]).call();
            //const receiverDeliveriesCount = await factory.methods.getReceiverDeliveriesCount(accounts[0]).call();

            const hospitalList = await Promise.all(
                Array(parseInt(hospitalCount))
                  .fill()
                  .map((hospital, index) => {
                    return factory.methods.getAllHospitals(accounts[0], index).call();
                  })
              );
            
            /*const hospitalInactive = await Promise.all(
            Array(parseInt(hospitalActiveCount))
                .fill()
                .map((hospital, index) => {
                return factory.methods.getHospitals(accounts[0], index).call();
                })
            );*/
              /*const receiverDeliveries = await Promise.all(
                Array(parseInt(receiverDeliveriesCount))
                  .fill()
                  .map((hospital, index) => {
                    return factory.methods.receiverDeliveries(accounts[0], index).call();
                  })
              );*/

            this.setState({ 
                hospitalList: hospitalList
                //hospitalInactive: hospitalInactive
                //receiverDeliveries: receiverDeliveries 
            });
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderHospitalRows() {
        let hospitalCenters = this.state.hospital;
        return hospitalCenters.map((hospital, index) => {
            return (
                <HospitalRow
                    key={index}
                    id={index}
                    hospital={hospital}
                    //permission={permission}
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
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Receiver</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderHospitalRows()}</Table.Body>
                </Table>
                <Link to="/hospitals/new">
                    <Button
                        content = "New Hospital"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
            </div>
        );
    }
}

export default Home;
