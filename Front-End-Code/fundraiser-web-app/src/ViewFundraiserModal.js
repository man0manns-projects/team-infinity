import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './App.css';

export class ViewFundraiserModal extends Component{
    
   constructor(props){
        super(props);
        this.state={donors:[],info:[]}
    }

    //define API methods as functions 
    refreshDonors(filter){
        fetch('http://20.169.81.116:5199/api/Fundraiser/Donors?fundraiserID='+ filter)
        .then(response=>response.json())
        .then(data=>{
            this.setState({donors:data})
        });
    }

    getFundraiserInfo(filter){
        fetch('http://20.169.81.116:5199/api/Fundraiser?fundraiserID='+ filter)
        .then(response=>response.json())
        .then(data=>{
            this.setState({info:data})
        });
    }

    componentDidMount(){
        //this.refreshList(this.props.fundId);
        this.refreshDonors("500");
        this.getFundraiserInfo("500");
    }
    componentDidUpdate(){
        //this.refreshList(this.props.fundId);
        this.refreshDonors("500");
        this.getFundraiserInfo("500");
    }

    currencyFormat(moneys) {
        let num = Number(moneys,10);
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    render(){
        const {donors}=this.state;
        const {info}=this.state;
        return(
        <div >
            {info.map(info=>
            <div>
            <h2 className="mt-5 d-flex justify-content-center">Fundraiser Title: {info.title}</h2>
            <p className="mt-5 d-flex justify-content-center">Description: {info.txt_description}</p>
            <ProgressBar max={info.goal}>
            <ProgressBar variant="success" now={info.amount_raised} label={this.currencyFormat(info.amount_raised)} key={1}/>
            <ProgressBar variant="NOT_THERE" now={info.goal} label={this.currencyFormat(info.goal)} key={2}/>
            </ProgressBar>
            <p className="mt-5 d-flex justify-content-right">{this.currencyFormat(info.goal)}</p>
            </div>
            )}
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Donation_Amount</th>
                        <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map(donors=>
                        <tr>
                                <td>{donors.f_name}</td>
                                <td>{this.currencyFormat(donors.donation_amt)}</td>
                                <td>{donors.notes}</td>
                                <td>
                                </td>
                        </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'>
                    Donate</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

