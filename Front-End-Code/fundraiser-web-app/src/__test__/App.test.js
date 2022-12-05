import React from "react"
import {render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import App from "../App";
import ReactDOM from "react-dom";

afterEach(()=>{
  cleanup();
});

test("renders if home link is there", () =>{
  render(<App />);
  const homeLink = screen.getByTestId('home-link');
  expect(homeLink).toBeInTheDocument();
});

test("renders if fundraiser link is there", () =>{
  render(<App />);
  const fundraiserLink = screen.getByTestId('fundraiser-link');
  expect(fundraiserLink).toBeInTheDocument();
});