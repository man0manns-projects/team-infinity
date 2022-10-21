import React,{Component} from 'react';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddFundsModal } from './AddFundsModal';

export class Home extends Component{

    constructor(props){
      super(props);
      this.state={funds:[], addModalShow:false}
    }

    refreshList(){
      fetch(process.env.REACT_APP_API+'fundraiser')
      .then(response=>response.json())
      .then(data=>{
        this.setState({funds:data});
      })
    }

    componentDidMount(){
      this.refreshList();
    }
    
    componentDidUpdate(){
      this.refreshList();
    }

    render(){
        const {funds}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        return(
          <div>
            
            

            <ButtonToolbar>
              <Button variant="primary"
              onClick={()=>this.setState({addModalShow:true})}>
                Start New Fundraiser
              </Button>
              <AddFundsModal show={this.state.addModalShow}
              onHide={addModalClose}></AddFundsModal>
            </ButtonToolbar>
            <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>FundraiserId</th>
                  <th>FundraiserName</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {funds.map(fund=>
                  <tr key={fund.FundraiserId}>
                    <td>{fund.FundraiserId}</td>
                    <td>{fund.FundraiserName}</td>
                    <td>Edit / Delete</td>
                  </tr>
                  )}
              </tbody>
            </Table>
          </div>
          // <Row xs={1} md={2} className="g-4">
          //   {Array.from({ length: 4 }).map((_, idx) => (
          //     <Col>
          //       <Card>
          //       <Card.Img variant="top" src="holder.js/100px160" />
          //       <Card.Body>
          //         <Card.Title>Card title</Card.Title>
          //         <Card.Text>
          //           This is a longer card with supporting text below as a natural
          //           lead-in to additional content. This content is a little bit
          //           longer.
          //         </Card.Text>
          //       </Card.Body>
          //       </Card>
          //     </Col>
          //   ))}
          // </Row>
        )
    }
}
