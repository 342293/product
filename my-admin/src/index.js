import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import './App.css'
import request from "./request";
React.$http = request

ReactDOM.render(<App/>,document.querySelector('#root'))