import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import HospitalNew from './pages/HospitalNew';
import HospitalShow from './pages/HospitalShow';
import DoctorNew from './pages/DoctorNew';
import SensorNew from './pages/SensorNew';
import DoctorShow from './pages/DoctorShow';
import 'semantic-ui-css/semantic.min.css';
import HomeDoctor from './pages/HomeDoctor';
import HomeSensor from './pages/HomeSensor';
import SensorShow from './pages/SensorShow';


class App extends Component {
    render() {
        return (
            <Container>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/doctors/' component={HomeDoctor}/>
                        <Route exact path='/sensors/' component={HomeSensor}/>
                        <Route exact path='/hospital/new' component={HospitalNew}/>
                        <Route exact path='/doctor/new' component={DoctorNew}/>
                        <Route exact path='/sensor/new' component={SensorNew}/>
                        <Route exact path='/hospitals/:address' component={HospitalShow}/>
                        <Route exact path='/doctors/:address' component={DoctorShow}/>
                        <Route exact path='/sensors/:uint' component={SensorShow}/>
                    </Switch>
                </main>
            </Container>
        );
    }
}

export default App;
