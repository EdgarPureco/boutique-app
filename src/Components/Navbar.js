import React from "react";
import logo from '../Pages/logo.png';
import * as Icon from "react-icons/bs";

import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component{
    logOut(){
            localStorage.removeItem('user');
            localStorage.removeItem('data');
            window.location.replace('/login');
        }

    render(){

        return(
            <>
    <Boot.Container className="container p-2">
    <Boot.Nav fill className="justify-content-center" sticky="top">
        
        <Boot.Nav.Link href="/profil"><Icon.BsPersonCircle size="30" /></Boot.Nav.Link>
        <Boot.Nav.Link href="/home"><Boot.Image width="100" className="rounded mx-auto d-block" src={logo}/></Boot.Nav.Link>
        <Boot.Nav.Link href="/cart"><Icon.BsCart size="30"/></Boot.Nav.Link>
    </Boot.Nav>
        <Boot.Button slot="end" variant="danger" size="sm" onClick={this.logOut.bind(this)}>Log Out</Boot.Button>
    </Boot.Container>
            </>
        );
    }
}

export default Navbar;