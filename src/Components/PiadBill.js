import axios from 'axios';
import React, { Component } from 'react';
import {Tbody, Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
class PiadBill extends Component {
    constructor(props) {
        super();
        this.state={
            currentdate:new Date().toISOString().substring(0,10),
            billdate:'',
            color:'black',
            updatedate:''
        }
    }
    async componentDidMount() {
        let billdate=this.props.billdate.substring(0,10);
        this.setState({billdate:billdate})
       
    }
    deleteHandler=async()=>{
        alert("Are you Sure?");
        await axios.delete(`https://vipnumbers.herokuapp.com/bills/${this.props.id}`);
        window.location.reload()
    }
    paidHandler=async()=>{
        alert("Are you Sure?");
        let bill=await axios.get(`/bills/${this.props.id}/paid`);
        bill=Date.parse(bill.data.billdate);
        const d=new Date(bill+86400000*30).toISOString();
        this.setState({updatedate:d})
        await axios.patch(`https://vipnumbers.herokuapp.com/bills/${this.props.id}/paid`,{updatedate:this.state.updatedate});
        this.props.history.push('/')  
    }
    editHandler=async()=>{
        
    }
    render() {
        let a=Date.parse(this.state.currentdate)
        let b=Date.parse(this.state.billdate);
        let due;
        if(a<=b) {
            console.log("yes");
            due=<Td>{this.state.billdate.split("-").reverse().join("-")}</Td>
            
        }
        return (
            <Tbody>
            <Tr className="row">
                <Td>{this.props.sno}</Td>
                <Td>{this.props.mnumber}</Td>
                <Td>{this.props.user}</Td>
                {due}
                <Td><button className="btn1" onClick={this.editHandler}>Edit</button></Td>
                <Td><button className="btn1" onClick={this.deleteHandler}>Delete</button></Td>
                <Td><button className="btn1" onClick={this.paidHandler}>Paid</button></Td>
            </Tr>
            </Tbody>

        );
    }
}

export default PiadBill;