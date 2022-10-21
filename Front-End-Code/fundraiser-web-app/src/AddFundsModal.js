import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddFundsModal extends Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'fundraiser',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        FundraiserId:null,
        FundraiserName:event.target.FundraiserName.value
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      alert(result);
    },
    (error)=>{
      alert('Failed');
    })
  }
  render(){
    return(
      <div className="container">
        <Modal 
        {...this.props} 
        size="lg" 
        aria-labelledby="contained"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vceneter">
              Start New Fundraiser
            </Modal.Title>
            <Modal.Body>
              <Row>
                <Col sum={6}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="FundraiserName">
                      <Form.Label>FundraiserName</Form.Label>
                      <Form.Control type="text" name="FundraiserName"
                      required placeholder="FundraiserName"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Button variant="primary" type="submit">
                        Create Fundraiser
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Foooter>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Foooter>
          </Modal.Header>
        </Modal>
      </div>
    )
  }
}
