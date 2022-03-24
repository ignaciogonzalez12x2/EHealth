import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Menu stackable style={{ marginTop: '10px' }}>
            <Menu.Item as={Link} to='/'>
                eHealth with Ethereum
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to='/hospital/new'>
                    Hospitals
                </Menu.Item>
                <Menu.Item as={Link} to='/doctor/new'>
                    Doctors
                </Menu.Item>
                <Menu.Item as={Link} to='/sensor/new'>
                    Sensors
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};