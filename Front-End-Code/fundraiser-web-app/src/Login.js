import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

/* TEST USER ACCOUNT 
Userid: 5
Username: tina@burgers.com
Password: hulutv22 */

async function loginUser(email,password){
  return fetch('http://20.169.81.116:5199/api/Login?userEmail='+ email + '&password=' + password)
  .then(res => res.json())
}

export default function Login({setToken}){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // this authenticates the user and sets the token in SessionStorage as the user_id
    const handleSubmit = async e => {
      e.preventDefault();
      const outputObject = await loginUser(username,password);
      const outputString = JSON.stringify(outputObject);
      const data = JSON.parse(outputString);
      const token = data[0].user_id;
      setToken(token);
      window.location.reload(false);
    }

    return (
      <div className='p-1 login-cont'>
      <form>
        <h2 className="mt-5 d-flex justify-content-center">Sign In</h2>
        <div className="cont3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div className="cont4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            {/* Not sure how we want to implement Remember me */}
            {/* <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label> */}
          </div>
        </div>
        <div className="sub-button">
          <button data-testId= "submit" type="submit" className="btn btn-success btn-lg btn-block" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <p className="sign-up">
        <Link to="/signup"><a>Sign up</a></Link>
        </p>

      </form>
      </div>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
