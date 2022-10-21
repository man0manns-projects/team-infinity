import React from 'react'
import {NavLink, BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Navbar,Nav, NavItem} from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Home} from './Home';
import {UserProfile} from './UserProfile';
import {DonationForm} from './DonationForm';
import { ViewFundraiserModal } from './ViewFundraiserModal';
import Login from './Login';
import useToken from './useToken';

async function helloUser(identifier){
  return fetch('http://20.169.81.116:5199/api/Dashboard/Hello?userID='+ identifier)
  .then(res => res.json()) 
}

function App() {

const {token, setToken} = useToken();

  if(!token) {
    // const data = JSON.parse(JSON.stringify(helloUser(0)))
    // const user = data[0].f_name
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
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/TEST-fundraiser">
                      TEMP: Fundraiser Detail View
                  </NavLink>
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/TEST-donation-form">
                      TEMP: Donation Form
                  </NavLink>
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
                      Login
                  </NavLink>
                  <NavItem className="d-inline p-2 bg-dark text-white">Hi test!</NavItem>
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
                <Route exact path='/TEST-fundraiser' element={<ViewFundraiserModal />} />
                <Route exact path="/TEST-donation-form" element={ <DonationForm />} />

              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    ) 
  } else {
//if logged in this is rendered
/* const data = JSON.parse(JSON.stringify(helloUser(token)));
const user = data[0].f_name; */
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
                <NavLink className="d-inline p-2 bg-dark text-white" to="/User">
                    User Profile
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/TEST-fundraiser">
                      TEMP: Fundraiser Detail View
                  </NavLink>
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/TEST-donation-form">
                      TEMP: Donation Form
                  </NavLink>
                <NavItem className="d-inline p-2 bg-dark text-white">Hi test!</NavItem>
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
              <Route exact path='/TEST-fundraiser' element={<ViewFundraiserModal />} />
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