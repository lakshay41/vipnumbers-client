import React, { Component } from 'react';
import BillList from './BillList';
import './Nav.css'
import PiadBillList from './PiadBillList';

import UnpaidBillList from './UnpaidBillList';

class Nav extends Component {
    constructor(props) {
        super();
        this.state={
            status:'all'
        }
    }
    changeHand=(e)=>{
        this.setState({status:e.target.value})
    }
    render() {
        let list;
        if(this.state.status==='all') {
            list=<BillList></BillList>
        }else if(this.state.status==='unpaid') {
            list=<UnpaidBillList></UnpaidBillList>
        }else if(this.state.status==='paid') {
            list=<PiadBillList></PiadBillList>
        }
        return (
            <div>
                <div className="nav">
                <h4 className="name">VIP Numbers List</h4>
                <div className="navbtn">
                   <button className="navbtn1" onClick={this.changeHand} value="all">All</button>
                    <button className="navbtn1" onClick={this.changeHand} value="unpaid">Unpaid</button>
                    <button className="navbtn1" onClick={this.changeHand} value="paid">Paid</button>
                </div>
            </div>
            {list}
            </div>
        );
    }
}

export default Nav;