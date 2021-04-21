import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main_page from "./component/main_page";
import Header from "./component/header";
import Info from "./component/info";
import Login from "./component/login";
import LogoutComponent from "./component/logout";
import Register from "./component/register";
import ChangePassword from "./component/change_password";
import ChangeInfo from "./component/change_info";
import Product from "./component/product";
import Cart from "./component/cart";

ReactDOM.render(
    <BrowserRouter>
        <Header/>
        <Route exact path={"/"} component={Main_page}/>
        <Route exact path={"/info"} component={Info}/>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/logout"} component={LogoutComponent}/>
        <Route exact path={"/register"} component={Register}/>
        <Route path={'/changePassword/:id'} component={ChangePassword}/>
        <Route path={'/changeInfo/:id'} component={ChangeInfo}/>
        <Route path={'/product/:id/:productName'} component={Product}/>
        <Route path={'/cart'} component={Cart}/>
    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
