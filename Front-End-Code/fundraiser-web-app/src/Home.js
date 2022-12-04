import React,{Component} from 'react';
import {Card, Table, CardGroup} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditFundModal} from './utils/EditFundModal';
import {Link} from 'react-router-dom';
import {AddFundModal} from './utils/AddFundModal';




export class Home extends Component{

    constructor(props){
        super(props);
        this.state={userfunds:[], addModalShow:false, editModalShow:false, otherfunds:[]}
    }

    refreshUserList(){
        const userID = sessionStorage.getItem('token');
        if(userID != 0){
    fetch(process.env.REACT_APP_API + 'Dashboard/User?userID=' + userID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({userfunds:data});
            });
        } else{
            this.setState({userfunds: null});
        }
    }

    refreshOtherList(){
        const userID = sessionStorage.getItem('token');

            fetch(process.env.REACT_APP_API + 'Dashboard?userID=' + userID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({otherfunds:data});
            });
    }

    componentDidMount(){
        this.refreshUserList();
        this.refreshOtherList();
        console.log(JSON.stringify(this.state.userfunds))
    }


    render(){
        const {userfunds, otherfunds}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        const userID = sessionStorage.getItem('token');
        if(userID != 0){
        return(
            <div>
            <div className="dashboard">
                <h2 data-testid="user-header">My Fundraisers</h2>
                <CardGroup style={{width: '100%'}}>
                {userfunds.map(fund =>
                <Card style={{width: '18rem', height: '20rem'}}>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${fund.image}`} style={{height:"50%"}}/>
                    <Card.Body >
                        <Card.Title>{fund.title}</Card.Title>
                        <Card.Text>{`${fund.txt_description.substring(0, 40)}...`}</Card.Text>
                        <Link to ={`/TEST-fundraiser/${fund.fundraiser_id}`}>
                        <Button className="mr-2" variant="info">Details</Button>
                        <Link to="/TEST-donation-form" state={{title: fund.title, id: fund.fundraiser_id}} state2={{id: fund.fundraiser_id}}>
                    <Button className="mr-2" variant="success">
                    Donate</Button>
                </Link>
                        </Link>
                    </Card.Body>
                </Card>
                )}
                </CardGroup>
                <br></br>
             <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Create New Fundraiser</Button>
                <AddFundModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>


<div className="dashboard">
    <h2>Other Fundraisers</h2>
    <CardGroup style={{width: '100%'}}>
                {otherfunds.map(fund =>
                <Card style={{width: '30rem', height: '20rem'}}>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${fund.image}`} style={{height:"50%"}}/>
                    <Card.Body >
                        <Card.Title>{fund.title}</Card.Title>
                        <Card.Text>{`${fund.txt_description.substring(0, 40)}...`}</Card.Text>
                        <Link to ={`/TEST-fundraiser/${fund.fundraiser_id}`}>
                        <Button className="mr-2" variant="info">Details</Button>
                        </Link>
                        <Link to="/TEST-donation-form" state={{title: fund.title, id: fund.fundraiser_id}} state2={{id: fund.fundraiser_id}}>
                    <Button className="mr-2" variant="success">
                    Donate</Button>
                </Link>
                    </Card.Body>
                </Card>
                )}
                </CardGroup> 
    </div> 
    </div>
    ) }else{
return(                <div>
                <div className="guestview">
                    <h3>You are browsing as a guest</h3>
                    <p>You can still donate to other's fundraisers. But in order to create and manage your own fundraisers, you will need to create an account. </p>
                </div>
                <div className="dashboard">
    <h2>Other Fundraisers</h2>
    <CardGroup style={{width: '100%'}}>
                {otherfunds.map(fund =>
                <Card style={{width: '18rem', height: '20rem'}}>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${fund.image}`} style={{height:"50%"}}/>
                    <Card.Body >
                        <Card.Title>{fund.title}</Card.Title>
                        <Card.Text>{`${fund.txt_description.substring(0, 40)}...`}</Card.Text>
                        <Link to ={`/TEST-fundraiser/${fund.fundraiser_id}`}>
                        <Button className="mr-2" variant="info">Details</Button>
                        </Link>
                        <Link to="/TEST-donation-form" state={{title: fund.title, id: fund.fundraiser_id}} state2={{id: fund.fundraiser_id}}>
                    <Button classNameName="mr-2" variant="success">
                    Donate</Button>
                </Link>
                    </Card.Body>
                </Card>
                )}
                </CardGroup>
                </div>
                </div>

            )}
    }
}

export default Home;