import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

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

            fetch(process.env.REACT_APP_API + 'Dashboard/User?userID=' + userID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({userfunds:data});
            });
    }

    refreshOtherList(){
        const userID = sessionStorage.getItem('token');

            fetch(process.env.REACT_APP_API + 'Dashboard?userID=' + userID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({userfunds:data});
            });
    }

    componentDidMount(){
        this.refreshUserList();
    }

/*     componentDidUpdate(){
        this.refreshList();
    } */
/* 
    deleteFundraiser(fundraiser_id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+fundraiser_id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
 */


    render(){
        const {userfunds, fundraiser_id,title}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <div class="dashboard">
                <h2>User Fundraisers</h2>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>FundraiserId</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userfunds.map(fund=>
                            <tr key={fund.fundraiser_id}>
                                <td>{fund.fundraiser_id}</td>
                                <td>{fund.title}</td>
                                <td>
<ButtonToolbar>
    <Link to ={`/TEST-fundraiser/${fund.fundraiser_id}`}>
        <Button className="mr-2" variant="info">
        Details
        </Button>
    </Link>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFundraiser(userfunds.fundraiser_id)}>
            Delete
        </Button>

</ButtonToolbar>

                                </td>

                            </tr>)
                            }
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Create New Fundraiser</Button>
                <AddFundModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>


<div class="dashboard">
    <h2>Other Fundraisers</h2>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>FundraiserId</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userfunds.map(fund=>
                            <tr key={fund.fundraiser_id}>
                                <td>{fund.fundraiser_id}</td>
                                <td>{fund.title}</td>
                                <td>
<ButtonToolbar>
    <Link to ={`/TEST-fundraiser/${fund.fundraiser_id}`}>
        <Button className="mr-2" variant="info">
        Details
        </Button>
    </Link>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFundraiser(userfunds.fundraiser_id)}>
            Delete
        </Button>

</ButtonToolbar>

                                </td>

                            </tr>)
                            }
                    </tbody>

                </Table>
</div>
</div>

            
        )
    }
}
