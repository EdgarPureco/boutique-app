import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../firebase'

import Navbar from "../Components/Navbar";
import Product from "../Components/Product";

class Home extends React.Component{
    
    render(){
        
        return(
            <>
            <Navbar></Navbar>
            <br></br>
            <Product></Product>
            </>
        );
    }
    
    
}

export default Home;
