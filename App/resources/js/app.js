require('./bootstrap');
import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header/Header.tsx";

const element = <h1>Piggy <Header/> </h1>;

ReactDOM.render(element, document.getElementById('root'));
