import React, {useRef, useEffect} from 'react';
import {Form,Button, Col, Row, InputGroup, Accordion} from 'react-bootstrap';
import { useState } from 'react';
import { UsaStates } from 'usa-states';


//  async function donationBasic(userID,fundID,donationAmount,paymentType,notes,streetAddress,city,zipcode, state, phone, emailAddress){
//   return 
//   .then(res => res.json())
// }

export default function UserProfile(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const userID = sessionStorage.getItem('token');

/*         const handleChange = (event) => {
          let value = event.target.value;
          let name = event.target.name;
          this.setState({[name]: value})
        } */

        useEffect(() => {
          const getUserInfo = async () => {
            const response = await fetch(process.env.REACT_APP_API+'user?userID='+ userID);
            const json = await response.json();
            setFirstName(JSON.parse(JSON.stringify(json))[0].f_name);
            setLastName(JSON.parse(JSON.stringify(json))[0].l_name);
            setEmail(JSON.parse(JSON.stringify(json))[0].email_address);
            setPassword(JSON.parse(JSON.stringify(json))[0].password);
          };
          getUserInfo();
        },[]);

        let handleSubmit = async (e) => {
          e.preventDefault();
          try{
  
            let res = await fetch('http://20.169.81.116:5199/api/user?userID='+ userID + '&userEmail=' + email + '&firstName=' + firstName + '&lastName=' + lastName + '&password=' + password , {
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

      console.log(firstName);

        return (
          <div className='p-5 dono'>
            <h2 className="mt-1 d-flex justify-content-center">User Profile</h2>
            <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="donorFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="fname" placeholder={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
              </Form.Group>
      
             <Form.Group as={Col} controlId="donorLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lname" placeholder={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </Form.Group>
            </Row>
      
            
            <Row classname="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>
            <br></br>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>
            <br></br>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>
            <br></br>
            <Col classname="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
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
