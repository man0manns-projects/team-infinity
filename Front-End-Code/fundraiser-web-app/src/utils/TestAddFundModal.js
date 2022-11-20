import React from 'react';
import {Component, useState} from 'react';
import {Modal,Button, Row, Col, Form } from 'react-bootstrap';

export class TestAddFundModal extends Component{
    constructor(props){
    super(props);
    this.state={fundraiserName : null, fundraiserDesc : null, initAmount : null, goal : null, imageData : null}
    }
    setFundraiserName = (e) => {
        this.setState({fundraiserName : e.target.value})
    }
    setFundraiserDesc = (e) => {
        this.setState({fundraiserDesc : e.target.value})
    }

    setinitAmount = (e) => {
        this.setState({initAmount : e.target.value})
    }

    setgoal = (e) => {
        e.preventDefault();
        this.setState({goal : e.target.value})
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }

    setimageData = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertBase64(file);
        const rawdata = base64.split(',')[1];
        this.setState({imageData : rawdata})
    }

    handleSubmit = (e) => {
        const userID = sessionStorage.getItem('token');
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'Dashboard?userID='+ userID + '&fundraiserName=' + this.state.fundraiserName + '&fundraiserDescription=' + this.state.fundraiserDesc + '&initAmount=' + this.state.initAmount + '&goal=' + this.state.goal,{
            method:'POST',
            headers: {'Content-Type' : 'application/json-patch+json'},
            body:(`"${this.state.imageData}"`)
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
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Fundraiser
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Fundraiser Name</Form.Label>
                        <Form.Control type="text" name="FundraiserName" required 
                        placeholder="FundraiserName" value={this.state.fundraiserName} onChange={this.setFundraiserName}/>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Fundraiser Description</Form.Label>
                        <Form.Control type="text" name="FundraiserDescription" 
                        placeholder="Fundraiser description" value={this.state.fundraiserDesc} onChange={this.setFundraiserDesc}/>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Fundraiser Init Amount</Form.Label>
                        <Form.Control type="text" name="FundraiserDescription" 
                        placeholder="Fundraiser description" value={this.state.initAmount} onChange={this.setinitAmount}/>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Fundraiser Goal</Form.Label>
                        <Form.Control type="text" name="FundraiserDescription" 
                        placeholder="Fundraiser description" value={this.state.goal} onChange={this.setgoal}/>
                    </Form.Group>
                   <Form.Group controlId="title">
                        <Form.Label>Fundraiser Image</Form.Label>
                        <Form.Control type="file" name="FundraiserDescription" onChange={this.setimageData}/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Fundraiser
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }
}