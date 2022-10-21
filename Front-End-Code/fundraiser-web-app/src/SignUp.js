import React from 'react';
import Userfront from "@userfront/core";

// Init Userfront Core
Userfront.init(" ");

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: "",
        lastName: "",
      email: "",
      password: "",
      passwordVerify: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      },
    });
  }

  render() {
    return (   
      <div className='mb-3'>
        <form onSubmit={this.handleSubmit}>

        <label>
            First Name
            <input
              className="form-control"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Last Name
            <input
              className="form-control"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Email address
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Your Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          
          <label>
            Password
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Verify password
            <input
              className="form-control"
              name="passwordVerify"
              type="password"
              placeholder="Re-enter password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <div className="d-grid">
          <button variant="outline-success" className="btn btn-success" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}