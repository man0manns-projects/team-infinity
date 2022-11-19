import React from 'react'
import {NavLink, BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Navbar,Nav, NavItem} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/App.css';

import {Home} from './Home';
import UserProfile from './UserProfile';
import DonationForm from './utils/DonationForm';
import { ViewFundraiser } from './utils/ViewFundraiserModal';
import SignUp from './SignUp';

import Login from './Login';
import useToken from './utils/useToken';

async function helloUser(identifier){
  return fetch('http://20.169.81.116:5199/api/Dashboard/Hello?userID='+ identifier)
  .then(res => res.json()) 
}

async function setGuest(){
  const saveToken = '0';
}



function App() {

  //to logout user
  const logout = () => {
    sessionStorage.clear()
  }

  const {token, setToken} = useToken();
 

  let userID = sessionStorage.getItem('token');
  if(!userID || userID == "0" ) {
    return (
      <BrowserRouter>
                <Navbar bg="dark" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                      Home
                  </NavLink>
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/Fundraisers">
                      Fundraisers
                  </NavLink>

                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-button-dark-example1">
                      Hello test!
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item href="/login">Login</Dropdown.Item>
                      <Dropdown.Item href="/signup"> Sign Up</Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
        <div className="App">
   
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login setToken={setToken}/> } />
                <Route exact path="/user" element={ <Navigate to="/login" />} />


                {/* TODO: Add this to the dashboard "table buttons" instead of its own page */}
                <Route exact path='/TEST-fundraiser/:id' element={<ViewFundraiser />} />

                <Route exact path="/TEST-donation-form" element={ <DonationForm />} />
                <Route exact path="/signup" element={ <SignUp />} />
                <Route exact path="/profile" element={ <UserProfile />} />


              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    ) 
  } else {
//if logged in this is rendered

  return (

    <BrowserRouter>
              <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Fundraisers">
                    Fundraisers
                </NavLink>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-button-dark-example1">
                      Hello test!
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item href="/profile">User Profile</Dropdown.Item>
                      <Dropdown.Item href="/" onClickCapture={logout}>Logout</Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
      <div className="App">
 
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/user" element={<UserProfile />} />
              <Route exact path="/login" element={ <Navigate to="/user" /> }/>

              {/* TODO: Add this to the dashboard "table buttons" instead of its own page */}
              <Route exact path='/TEST-fundraiser/:id' element={<ViewFundraiser />} />
              <Route exact path="/TEST-donation-form" element={ <DonationForm />} />

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
  }
}
export default App