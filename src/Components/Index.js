import React, { Component } from 'react';
import Header from './Header';
import Inputs from './Inputs';
import Nav from './Nav';

class Index extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Inputs></Inputs>
                <Nav></Nav>

            </div>
        );
    }
}

export default Index;