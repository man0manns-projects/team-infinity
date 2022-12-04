import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SignUp from "../SignUp";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    firstName: "test",
    lastName: "user",    
    userEmail: "tester@gamil.com",    
    password: "1234567890",    
    };  
    jest.spyOn(global, "fetch").mockImplementation(() =>    
    Promise.resolve({      
        json: () => Promise.resolve(fakeUser)    
        })  
    );
 
  // remove the mock to ensure tests are completely isolated  
  global.fetch.mockRestore();
});