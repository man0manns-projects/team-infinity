import React from "react"
import {render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import App from "../App";
import ReactDOM from "react-dom";

afterEach(()=>{
  cleanup();
});


test("renders if profile link is there", () =>{
    render(<App />);
    const profileLink = screen.getByTestId('profile-link');
    expect(profileLink).toBeInTheDocument();
  });