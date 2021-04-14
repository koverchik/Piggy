require('./bootstrap');
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './components/_app.scss';


const element = <div>Тут должны быть сметы</div>;

ReactDOM.render(element, document.getElementById('root'));