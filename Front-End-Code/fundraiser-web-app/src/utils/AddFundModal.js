import React from 'react';
import {Component, useState} from 'react';
import {Modal,Button, Row, Col, Form } from 'react-bootstrap';

export class AddFundModal extends Component{
    constructor(props){
    super(props);
    this.state={fundraiserName : null, fundraiserDesc : null, initAmount : 0, goal : null, imageData : null}
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
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="FundraiserName" required 
                        placeholder="Title of your fundraiser" value={this.state.fundraiserName} onChange={this.setFundraiserName}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="title">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="FundraiserDescription" 
                        placeholder="What is the purpose of your fundraiser?" value={this.state.fundraiserDesc} onChange={this.setFundraiserDesc}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="title">
                        <Form.Label>Initial Amount</Form.Label>
                        <Form.Control type="text" name="FundraiserInitAmount" 
                        placeholder="Any donations already made?" value={this.state.initAmount} onChange={this.setinitAmount} defaultValue={0}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="title">
                        <Form.Label>Goal</Form.Label>
                        <Form.Control type="text" name="FundraiserGoal" required
                        placeholder="Monetary goal for this fundraiser" value={this.state.goal} onChange={this.setgoal}/>
                    </Form.Group>
                    <br></br>
                   <Form.Group controlId="title">
                        <Form.Label>Image or Logo</Form.Label>
                        <Form.Control type="file" name="FundraiserImage" onChange={this.setimageData} required/>
                    </Form.Group>
                    <br></br>
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