import React from 'react'
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Home} from './Home';
import { ViewFundraiserModal } from './ViewFundraiserModal';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Login } from './Login';
function App() {
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
                <NavLink className="d-inline p-2 bg-dark text-white" to="/sign-in">
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
              <Route exact path="/sign-in" element={<Login />} />
              <Route exact path='/test-fundraiser' element={<ViewFundraiserModal />} />


            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App