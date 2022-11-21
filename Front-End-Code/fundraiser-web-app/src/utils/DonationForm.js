/*  Louise Belcher
    1601 26TH AVE 
    BESSEMER 
    AL 
    3319

    8152522345
    belcher@burgers.com

    30.45

    Louise H Belcher
    6011128563426587
    394
    0224
 */

import React from 'react';
import {Form,Button, Col, Row, InputGroup, Accordion} from 'react-bootstrap';
import { UsaStates } from 'usa-states';
import mastercard from '../images/mastercard.png';
import visa from '../images/visa.png';
import discover from '../images/discover.png';
import amex from '../images/amex.png';
import bank from '../images/bank.png';
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import {useLocation, useNavigate} from 'react-router-dom';


export default function DonationForm(){

      const location = useLocation();
      const history = useNavigate();

      var usStates = new UsaStates();
      var statesNames = usStates.arrayOf('names');

      const userID = sessionStorage.getItem('token');

      // const currentFundraiser = "505";
      const currentFundraiser = location.state.id;
      const currentFundraiserName = location.state.title;
      // console.log(currentFundraiserName);
      // console.log(currentFundraiser);
      const transactionID = uuid();
      // const [currentFundraiser, setFundID] = useState();
      const [currentDonation, setDonation] = useState();
      const [currentPayment, setPaymentMethod] = useState();
      const [currentNotes, setNotes] = useState();
      const [currentAddress, setAddress] = useState();
      const [currentCity, setCity] = useState();
      const [currentState, setState] = useState();
      const [currentZip, setZip] = useState();
      const [currentPhone, setPhone] = useState();
      const [currentEmail, setEmail] = useState();
      const [firstName, setFname] = useState();
      const [lastName, setLname] = useState();
      const [cardNumber, setCardnumber] = useState();
      const [cvv, setCVV] = useState();
      const [cardHolder, setCardholder] = useState();
      const [exp, setExp] = useState();
      const [routingNumber, setRoutingnum] = useState();
      const [accountNumber, setAccountnum] = useState();


      let handleSubmit = async (e) => {
        e.preventDefault();
        try{

          let res = await fetch('http://20.169.81.116:5199/api/Donation?userID='+ userID + '&fundraiserID=' + currentFundraiser + '&donationAmount=' + currentDonation + '&paymentID=' + currentPayment + '&notes=' + currentNotes + '&streetAddress=' + currentAddress + '&city=' + currentCity + '&zipcode=' + currentZip + '&country=' + currentState + '&phone=' + currentPhone + '&emailAddress=' + currentEmail + '&transactionID=' + transactionID + '&firstName=' + firstName + '&lastName=' + lastName, {
            method:"POST",
          });
          let resJson = await res.json();

          if(currentPayment == 2){
            let payRes = await fetch('http://20.169.81.116:5199/api/Donation/Card?nickname=test&userID='+ userID + '&cardNumber=' + cardNumber + '&securityCode=' + cvv + '&cardholderName=' + cardHolder + '&expirationDate='+ exp + '&transactionID=' + transactionID, {
              method: "POST",
            });
            let payResJson = await payRes.json();
            let payResStatus = payRes.status;
            if(payResStatus != 200){
              alert("Issue with submitting card information")
            }
          } 

          if(currentPayment == 1){
            let payRes = await fetch('http://20.169.81.116:5199/api/Donation/Bank?nickname=test&userID='+ userID + '&routingNumber=' + routingNumber + '&accountNumber=' + accountNumber + '&transactionID=' + transactionID, {
              method: "POST",
            });
            let payResJson = await payRes.json();
            let payResStatus = payRes.status;
            if(payResStatus != 200){
              alert("Issue with submitting bank information")
            }
          } 

          if(res.status == 200){
          alert("Submitted successfully");
          window.location='/';
        } else{
          alert("Some error occurred with form submission")
        }
      } catch (err) {
        console.log(err);
      }
    };

        return (
          <div className='p-5 dono'>
            <h2 className="mt-1 d-flex justify-content-center">Fundraiser: {currentFundraiserName}</h2>
            <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="donorFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="fname" placeholder="Enter first name" value={firstName} onChange={(e) => setFname(e.target.value)}/>
              </Form.Group>
      
              <Form.Group as={Col} controlId="donorLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lname" placeholder="Enter last name" value={lastName} onChange={(e) => setLname(e.target.value)}/>
              </Form.Group>
            </Row>
      
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" value={currentAddress} onChange={(e) => setAddress(e.target.value)}/>
            </Form.Group>
      
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={currentCity} onChange={(e) => setCity(e.target.value)}/>
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose..." value={currentState} onChange={(e) => setState(e.target.value)}>
                  <option>Choose...</option>
                  {statesNames.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control value={currentZip} onChange={(e) => setZip(e.target.value)}/>
              </Form.Group>
            </Row>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" placeholder="(XXX)XXX-XXXX" value={currentPhone} onChange={(e)=> setPhone(e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="address@website.com" value={currentEmail} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>

            <br></br>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formDonationNote">
                <Form.Label>Donation Note (Optional)</Form.Label>
                <Form.Control type="note" as="textarea" placeholder="A short note about your donation" value={currentNotes} onChange={(e) => setNotes(e.target.value)}/>
              </Form.Group>
            </Row>


            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formMoney">
                <Form.Label>Donation Amount</Form.Label>
                <InputGroup.Text>$ <Form.Control type="money" placeholder="X.XX" value={currentDonation} onChange={(e) => setDonation(e.target.value)}/></InputGroup.Text>
              </Form.Group>
            </Row>

            <br></br>

            <Row classname="mb-3">
            <Form.Group as={Col} controlId="formMoney">
              <Form.Label>Payment Method</Form.Label>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={(e) => setPaymentMethod(2)}>
           Credit Card
           <img src={mastercard} width="30"/>
           <img src={visa} width="30"/>
           <img src={discover} width="30"/>
           <img src={amex} width="30"/>
            </Accordion.Header>
            <Accordion.Body>
                <Form.Control type="card" placeholder="Card Holder Name" value={cardHolder} onChange={(e) => setCardholder(e.target.value)}/>
                <br></br>
                <Form.Control type="card" placeholder="Card Number (No spaces)" value={cardNumber} onChange={(e) => setCardnumber(e.target.value)}/>
                <br></br>
                <Form.Control type="card" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)}/>
                <br></br>
                <Form.Control type="card" placeholder="Expiration Date (MMYY)" value={exp} onChange={(e) => setExp(e.target.value)}/>

            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={(e) => setPaymentMethod(1)}>Bank Account
              <img src={bank} width="30"/>
              </Accordion.Header>
              <Accordion.Body>
                <Form.Control type="bank" placeholder="Routing Number" value={routingNumber} onChange={(e) => setRoutingnum(e.target.value)}/>
                <br></br>
                <Form.Control type="card" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountnum(e.target.value)}/>
                <br></br>
            </Accordion.Body>
            </Accordion.Item>

            </Accordion>
            </Form.Group>
            </Row>

            <br></br>
            <Row classname="mb-3">
            <Form.Group as={Col} controlId="buttons">  
            <Button variant="secondary" type="back" onClick={() => history("/")}>
              Back
            </Button>     
            <Button variant="success float-right" type="submit" onClick={handleSubmit} >
              Submit
            </Button>
            
            
            </Form.Group>
            </Row>
          </Form>

          </div>
        );
}
