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
            const hospitalCount = await factory.methods.Length_Hospitals();
            //const hospitalInactiveCount = await factory.methods.getHospitals(accounts[0]).call();
            //const receiverDeliveriesCount = await factory.methods.getReceiverDeliveriesCount(accounts[0]).call();
            
            const hospitalList = await factory.methods.getAllHospitals();
          
            console.log(hospitalCount);
            console.log(hospitalList);
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
        let hospitalCenters = this.state.hospitalList;
        return hospitalCenters.map((hospital, index) => {
            return (
                <HospitalRow
                    key={hospital.idHospital}
                    index={index}
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
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>State</Table.HeaderCell>
                            <Table.HeaderCell>Postal Code</Table.HeaderCell>
                            <Table.HeaderCell>Permission</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {/*<Table.Body>{this.renderHospitalRows()}</Table.Body>*/}
                </Table>
                <Link to="/hospital/new">
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
