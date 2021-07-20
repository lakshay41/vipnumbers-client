import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
class EditBill extends Component {
    constructor() {
        super();
        this.state={

        }
    }
    async componentDidMount() {
        console.log(this.props.id);
        // const bill=await axios.get(`/bills/${this.props.id}/edit`)
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default EditBill;