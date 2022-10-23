import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    // const tokenString = sessionStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    let userToken = sessionStorage.getItem('token');

    if (userToken === null) {
      let token = 0;
      sessionStorage.setItem('token', JSON.stringify(token));
    }

    return userToken.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}