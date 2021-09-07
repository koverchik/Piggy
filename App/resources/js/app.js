require('./bootstrap');
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './components/_app.scss';

const element = <App/>

ReactDOM.render(element, document.getElementById('root'));