import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFundModal} from './utils/AddFundModal';
import {EditFundModal} from './utils/EditFundModal';



export class Home extends Component{

    constructor(props){
        super(props);
        this.state={funds:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({funds:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFundraiser(fundraiser_id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+fundraiser_id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {funds, fundraiser_id,title}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div class="dashboard">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>FundraiserId</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map(fund=>
                            <tr key={fund.fundraiser_id}>
                                <td>{fund.fundraiser_id}</td>
                                <td>{fund.title}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        fundraiser_id:funds.fundraiser_id,title:funds.title})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFundraiser(funds.fundraiser_id)}>
            Delete
        </Button>

        <EditFundModal show={this.state.editModalShow}
        onHide={editModalClose}
        fundraiser_id={fundraiser_id}
        title={title}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Create New Fundraiser</Button>

                    <AddFundModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}
