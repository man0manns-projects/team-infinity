import React from "react"
import {render, fireEvent, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Button from "../SignUp";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
// import "jest-dom/extend-expect";

afterEach(()=>{
    cleanup();
});

it("renders without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>,div)
});

/* it("renders button correctly", () =>{
    const {getByTestId} = render(<Button></Button>);
    getByTestId('detail')
    ReactDOM.render(<Button></Button>,div)
}); */