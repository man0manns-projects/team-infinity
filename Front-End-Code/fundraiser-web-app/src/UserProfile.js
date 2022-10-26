import React, {useId} from 'react';
import {Form,Button, Col, Row, InputGroup, Accordion} from 'react-bootstrap';
import { useState } from 'react';
import { UsaStates } from 'usa-states';


//  async function donationBasic(userID,fundID,donationAmount,paymentType,notes,streetAddress,city,zipcode, state, phone, emailAddress){
//   return 
//   .then(res => res.json())
// }

export default function UserProfile(){

      const userID = sessionStorage.getItem('token');
      var usStates = new UsaStates();
      var statesNames = usStates.arrayOf('names');

      // const [currentFundraiser, setFundID] = useState();
      const [userEmail, setEmail] = useState();
      const [firstName, setFname] = useState();
      const [lastName, setLname] = useState();
      const [password, setPassword] = useState();
      const [currentAddress, setAddress] = useState();
      const [currentCity, setCity] = useState();
      const [currentState, setState] = useState();
      const [currentZip, setZip] = useState();



      let handleSubmit = async (e) => {
        e.preventDefault();
        try{

          let res = await fetch('http://20.169.81.116:5199/api/user?userID='+ userID + '&emailAddress=' + userEmail + '&firstName=' + firstName + '&lastName=' + lastName + '&password=' + password + '&streetAddress=' + currentAddress + '&city=' + currentCity + '&zipcode=' + currentZip + '&country=' + currentState , {
            method:"GET",
          });
  
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
            <h2 className="mt-1 d-flex justify-content-center">User Profile</h2>
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
      
            
            <Row classname="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="address@website.com" value={userEmail} onChange={(e) => setEmail(e.target.value)}/>
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

            <br></br>
            <br></br>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>

            <br></br>
            <Row classname="mb-3">
            <Button variant="success float-right" type="submit" onClick={handleSubmit} >
              Save Changes
            </Button>
            
            </Row>
            </Form>
          </div>
          )
          }
