import React, {useId} from 'react';
import {Form,Button, Col, Row, InputGroup, Accordion} from 'react-bootstrap';
import { useState } from 'react';

//  async function donationBasic(userID,fundID,donationAmount,paymentType,notes,streetAddress,city,zipcode, state, phone, emailAddress){
//   return 
//   .then(res => res.json())
// }

export default function SignUp(){

      const userID = sessionStorage.getItem('token');

      // const [currentFundraiser, setFundID] = useState();
      const [userEmail, setEmail] = useState();
      const [firstName, setFname] = useState();
      const [lastName, setLname] = useState();
      const [password, setPassword] = useState();



      let handleSubmit = async (e) => {
        e.preventDefault();
        try{

          let res = await fetch('http://20.169.81.116:5199/api/Login?firstName=' + firstName + '&lastName=' + lastName + '&userEmail=' + userEmail + '&password=' + password, {
            method:"POST",
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
            <h2 className="mt-1 d-flex justify-content-center">Sign Up</h2>
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

            <Row classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Row>

            
            <br></br>
            <Row classname="mb-3">
            <Button  data-testid= "button" variant="success float-right" type="submit" onClick={handleSubmit} >
              Sign Up
            </Button>
            
            </Row>
            </Form>
          </div>
          )
          }
