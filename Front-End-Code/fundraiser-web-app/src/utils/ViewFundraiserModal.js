import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar, Image} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Link, useParams} from 'react-router-dom';
import '../css/fund.css';


export function ViewFundraiser(){
    return <ViewFundraiserModal params={useParams()}/>
}

export class ViewFundraiserModal extends Component{
    
   constructor(props){
        super(props);
        this.state={donors:[],info:[],img:''}
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
            const dbimagedata = JSON.parse(JSON.stringify(data))[0].image;
            var base64Flag = 'data:image/jpeg;base64,';
            this.setState({img: base64Flag + dbimagedata}); 
            this.setState({info:data})
        });
        
        
    }

    componentDidMount(){
        this.getFundraiserInfo(this.props.params.id);
        this.refreshDonors(this.props.params.id);
    }

    currencyFormat(moneys) {
        let num = Number(moneys,10);
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };


    render(){
        const {donors}=this.state;
        const {info}=this.state;
        const {img}=this.state;
        
        const logo = require('../images/fund.jpg');
        return(
            
            <main>

            {info.map(info=>
            
            <div className='left'>
            <h2 className=" d-flex justify-content-center">{info.title}</h2>
            <h3 className="mt-5 d-flex justify-content-center">Raised: {this.currencyFormat(info.amount_raised)}     Goal: {this.currencyFormat(info.goal)}</h3>
        
            <Image src={img} alt='The fundraiser image' width={400} height={400}  rounded/>
            {/* <img src={logo}/> */}
            
            
            <ProgressBar max={info.goal}>
            <ProgressBar variant="success" now={info.amount_raised} label={this.currencyFormat(info.amount_raised)} key={1}/>
            <ProgressBar variant="NOT_THERE" now={info.goal+100} label={this.currencyFormat(info.goal)} key={2}/>
            </ProgressBar>
            <p className="mt-4 d-flex justify-content-left">Description: {info.txt_description}</p>
      </div>

)}

            <div className='right'> 
                <Table className="table-responsive-sm">
                <thead>
                        <tr>
                        <th>Donor</th>
                        <th>Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map(donors=>
                        <tr>
                                <td>{donors.f_name}</td>
                                <td>{this.currencyFormat(donors.donation_amt)}</td>
  
                                <td>
                                </td>
                        </tr>)}
                    </tbody>

                </Table>
                {info.map(info => 
                <Link to="/TEST-donation-form" state={{title: info.title, id: info.fundraiser_id}} state2={{id: info.fundraiser_id}}>
                <ButtonToolbar>
                    <Button variant="btn btn-success btn-lg btn-block">
                    Donate</Button>
                </ButtonToolbar>
                </Link>
                )}
            </div>
            </main>
        )
    }
}

