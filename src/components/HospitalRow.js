import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import notification from '../ethereum/notification';

class HospitalRow extends Component {
  state = {
    idHospital: '',
    name: '',
    city: '',
    state: '',
    postalCode: '',
    permission: false,
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {
    let hospitalContract = notification(this.props.hospital);
    let name = await hospitalContract.methods.name.call();
    let permission = await hospitalContract.methods.permission().call();

    this.setState({ 
      name: name,
      permission: permission
    });
  }

  onView = async () => {
    /*const campaign = Campaign(this.props.address);

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });*/
  };

  onAccept = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });
    
    try {
      // Refresh
      alert('Hospital accepted!');
      this.setState({ state: 'accepted' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };

 /* onFinish = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      // Refresh
      alert('Hospital finished!');
      this.setState({ state: 'finished' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };*/

  render() {
      return (
          <Table.Row>
              <Table.Cell>{this.props.idHospital}</Table.Cell>
              <Table.Cell>{this.props.name}</Table.Cell>
              <Table.Cell>{this.props.city}</Table.Cell>
              <Table.Cell>{this.props.state}</Table.Cell>
              <Table.Cell>{this.props.postalCode}</Table.Cell>
              <Table.Cell>{this.props.permission}</Table.Cell>
              <Table.Cell>{this.state.message}</Table.Cell>
              <Table.Cell>
                  {
                    this.props.sent ? (
                      <Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.idHospital)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                        <Button.Content hidden>Finish</Button.Content>
                        <Button.Content visible>
                          <Icon name='send' />
                        </Button.Content>
                      </Button>
                    ) : (
                      <Button animated='vertical' color='blue' onClick={() => this.onAccept(this.props.idHospital)} disabled={this.state.state!=='created'} loading={this.state.loading}>
                        <Button.Content hidden>Accept</Button.Content>
                        <Button.Content visible>
                          <Icon name='check' />
                        </Button.Content>
                    </Button>
                    )
                  }
                  <Link to={"/hospitals/"+this.props.idHospital}>
                    <Button animated='vertical' color='blue' onClick={this.onView}>
                      <Button.Content hidden>View</Button.Content>
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

export default HospitalRow;
