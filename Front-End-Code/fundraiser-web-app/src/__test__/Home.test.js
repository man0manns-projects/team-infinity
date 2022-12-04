import React from "react";
import {render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";

afterEach(()=>{
  cleanup();
});


test('renders if user header is there', () =>{
  render(<Home />);
  const userHeader = screen.getByTestId('user-header');
  expect(userHeader).toBeInTheDocument();
});

