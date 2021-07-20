import React, { Component } from 'react';
import './Bill.css'
import {Tbody, Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    color:'black',
    padding:'0px 100px'
  };
  
class Bill extends Component {
    constructor(props) {
        super();
        this.state={
            currentdate:new Date().toISOString().substring(0,10),
            billdate:'',
            color:'black',
            updatedate:'',
            deleteModalopen:false,
            paidModalopen:false,
            editModalopen:false,
            editedmnumber:'',
            editedbilldate:'',
            editeduser:'',

        }
    }

    async componentDidMount() {
        let billdate=this.props.billdate.substring(0,10);
        this.setState({billdate:billdate})
       
    }

    //delete bill entry handler
    deleteHandler=async()=>{
        await axios.delete(`https://vipnumbers.herokuapp.com/bills/${this.props.id}`);
        window.location.reload();
    }

    //pay bill handler
    paidHandler=async()=>{
        let bill=await axios.get(`https://vipnumbers.herokuapp.com/bills/${this.props.id}/paid`);
        bill=Date.parse(bill.data.billdate);
        const d=new Date(bill+86400000*31).toISOString();
        this.setState({updatedate:d})
        await axios.patch(`https://vipnumbers.herokuapp.com/bills/${this.props.id}/paid`,{updatedate:this.state.updatedate});
        window.location.reload();
    }

    //delete modal functions
    ondeleteOpenModal=()=>{
        this.setState({ deleteModalopen: true });
    }
    ondeleteCloseModal = () => {
        this.setState({ deleteModalopen: false });
    };

    deleteback=()=>{
        this.setState({ deleteModalopen: false });
    }

    //paid modal functions
    onpaidOpenModal=()=>{
        this.setState({ paidModalopen: true });
    }
    onpaidCloseModal = () => {
        this.setState({ paidModalopen: false });
    };

    paidback=()=>{
        this.setState({ paidModalopen: false });
    }

    //


    //edit modal functions
    oneditOpenModal=async()=>{
        const bill=await axios.get(`https://vipnumbers.herokuapp.com/bills/${this.props.id}/edit`);
        this.setState({ editModalopen: true,editedmnumber:bill.data.mnumber,editeduser:bill.data.user,editedbilldate:bill.data.billdate });
    }
    oneditCloseModal = () => {
        this.setState({ editModalopen: false });
    };

    //
    //editHandler
    submitHandler=async(e)=>{
        e.preventDefault();
        await axios.patch(`https://vipnumbers.herokuapp.com/bills/${this.props.id}`,{mnumber:this.state.editedmnumber,billdate:this.state.editedbilldate,user:this.state.editeduser});
        this.setState({ paidModalopen: false });

        window.location.reload();
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        let a=Date.parse(this.state.currentdate)
        let b=Date.parse(this.state.billdate);
        let due;
        //condition to check the bill date and current date
        if(a>=b) {
            due=<Td style={{color:'red'}}>{this.state.billdate.split("-").reverse().join("-")}</Td>
            
        } else {
            due=<Td>{this.state.billdate.split("-").reverse().join("-")}</Td>
            
        }
        return (
                <Tbody>
                <Tr className="row">
                    <Td>{this.props.sno}</Td>
                    <Td>{this.props.mnumber}</Td>
                    <Td>{this.props.user}</Td>
                    {due}
                    <Td><button className="btn1" onClick={this.oneditOpenModal}>Edit</button></Td>
                    <Td><button className="btn1" onClick={this.ondeleteOpenModal}>Delete</button></Td>
                    <Td><button className="btn1" onClick={this.onpaidOpenModal}>Paid</button></Td>
                </Tr>
                <Modal open={this.state.deleteModalopen} onClose={this.ondeleteCloseModal}>
                    <div style={styles}>
                        <h3>Are you sure you want delete this number?</h3><br></br>
                        <button className='btn3' onClick={this.deleteback}>Cancel</button>
                        <button className='btn2' onClick={this.deleteHandler}>Yes</button>
                    </div>
                </Modal>
                <Modal open={this.state.paidModalopen} onClose={this.onpaidCloseModal}>
                    <div style={styles}>
                        <h3>Are you sure you paid bill of this number?</h3><br></br>
                        <button className='btn3' onClick={this.paidback}>Cancel</button>
                        <button className='btn2' onClick={this.paidHandler}>Yes</button>
                    </div>
                </Modal>

                <Modal open={this.state.editModalopen} onClose={this.oneditCloseModal}>
                    <div style={styles} className="modalinputs">
                        <h3>Are you want to edit this Number?</h3><br></br>
                        <form onSubmit={this.submitHandler}>
                            <label htmlFor="editedmnumber" className="label">Mobile Number:</label><br></br>
                            <input type="number" value={this.state.editedmnumber} placeholder="Enter Mobile Number" id="editedmnumber" onChange={this.changeHandler} name="editedmnumber"></input><br></br>
                            <label htmlFor="editedbilldate" className="label">Bill date:</label><br></br>
                            <input type="date" value={this.state.editedbilldate.substring(0,10)} id="editedbilldate" onChange={this.changeHandler} name="editedbilldate"></input><br></br>
                            <label htmlFor="editeduser" className="label">Username:</label><br></br>
                            <input type="text" value={this.state.editeduser} id="editeduser" placeholder="Enter person name" onChange={this.changeHandler} name="editeduser"></input>
                            <div>
                                <button className='btn2'>Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                
                </Tbody>

                

        
        );
    }
}

export default Bill;