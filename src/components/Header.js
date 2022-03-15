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
                <Menu.Item as={Link} to='/'>
                    Hospitals
                </Menu.Item>
                <Menu.Item as={Link} to='/hospital/new'>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};