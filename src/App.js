import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import HospitalNew from './pages/HospitalNew';
import HospitalShow from './pages/HospitalShow';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    render() {
        return (
            <Container>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/hospitals/new' component={HospitalNew}/>
                        <Route exact path='/hospitals/:address' component={HospitalShow}/>
                    </Switch>
                </main>
            </Container>
        );
    }
}

export default App;
