require('./bootstrap');
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './_app.scss';


const element = <App/>;

ReactDOM.render(element, document.getElementById('root'));
