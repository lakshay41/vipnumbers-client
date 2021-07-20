import axios from 'axios';
import React, { Component } from 'react';
import PiadBill from './PiadBill';
import { Table, Thead, Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
class PiadBillList extends Component {
    constructor(props) {
        super();
        this.state={
            bills:[]
        }
    }
    async componentDidMount() {
        let bills=await axios.get('https://vipnumbers.herokuapp.com/bills');
        this.setState({bills:bills.data})
    }
    render() {
        let sno=0;
        let allbills=this.state.bills.map(b=>{
            return <PiadBill 
            sno={sno=sno+1}
            id={b._id}
            key={b._id}
            mnumber={b.mnumber}
            billdate={b.billdate}
            user={b.user}
            />
        })
        return (
            <div>
                <div className="content">
                    <Table className="table">
                        <Thead style={{color:'lightGrey'}}>
                        <Tr className="headrow">
                            <Td>S.no</Td>
                            <Td>Mobile Number</Td>
                            <Td>Customer Name</Td>
                            <Td>Due Date</Td>
                            <Td>Edit</Td>
                            <Td>Delete</Td>
                            <Td>Paid</Td>
                        </Tr>
                        </Thead>
                        {allbills}
                    </Table>
                    
                </div>
            </div>
        );
    }
}

export default PiadBillList;