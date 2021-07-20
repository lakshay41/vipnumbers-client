import React, { Component } from 'react';
import axios from 'axios';
import './Inputs.css'
class Inputs extends Component {
    constructor(props) {
        super();
        this.state={
            mnumber:'',
            billdate:'',
            user:'',
            msg:''
        }
    }
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    submitHandler=async(e)=>{
        e.preventDefault()
        const msg=await axios.post('https://vipnumbers.herokuapp.com/bills',this.state);
        
        if(msg.data==='Successfully submitted') {
            window.location.reload()
        }
        else {
            this.setState({msg:msg.data})
        }
        
    }
    render() {
        return (
            <div className="inputs">
                <h5 style={{textAlign:'center',color:'red'}}>{this.state.msg}</h5>
               <form onSubmit={this.submitHandler}>
                    <label htmlFor="mnumber" className="label">Mobile Number:</label><br></br>
                    <input type="number" value={this.state.mnumber} placeholder="Enter Mobile Number" id="mnumber" onChange={this.changeHandler} name="mnumber"></input><br></br>
                    <label htmlFor="billdate" className="label">Bill date:</label><br></br>
                    <input type="date" value={this.state.billdate} id="billdate" onChange={this.changeHandler} name="billdate"></input><br></br>
                    <label htmlFor="user" className="label">Username:</label><br></br>
                    <input type="text" value={this.state.user} id="user" placeholder="Enter person name" onChange={this.changeHandler} name="user"></input>
                    <div className="btn">
                        <button>Submit</button>
                    </div>
               </form>
            </div>
        );
    }
}

export default Inputs;