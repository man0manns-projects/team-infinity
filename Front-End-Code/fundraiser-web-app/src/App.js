import React from 'react'
import {NavLink, BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Home} from './Home';
import {UserProfile} from './UserProfile';
import { ViewFundraiserModal } from './ViewFundraiserModal';
import Login from './Login';
import useToken from './useToken';


function App() {

const {token, setToken} = useToken();

  if(!token) {
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
                  <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
                      Login
                  </NavLink>
  
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

              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    ) 
  }

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
                <NavLink className="d-inline p-2 bg-dark text-white" to="/User">
                    User Profile
                </NavLink>

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

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App