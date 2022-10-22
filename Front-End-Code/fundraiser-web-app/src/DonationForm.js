import React,{Component} from 'react';
import {Form,Button, Col, Row, InputGroup, Accordion} from 'react-bootstrap';
import { UsaStates } from 'usa-states';
import mastercard from './images/mastercard.png';
import visa from './images/visa.png';
import discover from './images/discover.png';
import amex from './images/amex.png';
import bank from './images/bank.png';

async function donationBasic(email,password){
  return fetch('http://20.169.81.116:5199/api/Donation?userID='+ userID + '&fundraiserID=' + fundID + '&')
  .then(res => res.json())
}

export class DonationForm extends Component {

    render() {
      var usStates = new UsaStates();
      var statesNames = usStates.arrayOf('names');

        return (
            <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="donorFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="fname" placeholder="Enter first name" />
              </Form.Group>
      
              <Form.Group as={Col} controlId="donorLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="password" placeholder="Enter last name" />
              </Form.Group>
            </Row>
      
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>
      
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  {statesNames.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" placeholder="(XXX)XXX-XXXX" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="address@website.com"/>
              </Form.Group>
            </Row>

            <br></br>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formDonationNote">
                <Form.Label>Donation Note (Optional)</Form.Label>
                <Form.Control type="note" as="textarea" placeholder="A short note about your donation" />
              </Form.Group>
            </Row>


            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formMoney">
                <Form.Label>Donation Amount</Form.Label>
                <InputGroup.Text>$ <Form.Control type="money" placeholder="X.XX" /></InputGroup.Text>
              </Form.Group>
            </Row>

            <br></br>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formMoney">
              <Form.Label>Payment Method</Form.Label>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
           Credit Card
           <img src={mastercard} width="30"/>
           <img src={visa} width="30"/>
           <img src={discover} width="30"/>
           <img src={amex} width="30"/>
            </Accordion.Header>
            <Accordion.Body>
                <Form.Control type="card" placeholder="Card Number"/>
                <Form.Control type="card" placeholder="CVV"/>
                <Form.Control type="card" placeholder="Expiration Date (XX/XX)"/>

            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Bank Account
              <img src={bank} width="30"/>
              </Accordion.Header>
              <Accordion.Body>
                <Form.Control type="bank" placeholder="Routing Number"/>
                <Form.Control type="card" placeholder="Account Number"/>
            </Accordion.Body>
            </Accordion.Item>

            </Accordion>
            </Form.Group>
            </Row>

            <br></br>
      
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          
        );
    }
}
