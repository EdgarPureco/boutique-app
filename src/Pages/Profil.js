import React from "react";

import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebase';

import Navbar from "../Components/Navbar";

class Home extends React.Component{
    
    render(){

        function save() {
            var password = document.getElementById('password').value;
            var name = document.getElementById('name').value;
            var lastName = document.getElementById('lastName').value;
    
            //Verfication des champs, que ne soient pas vides
            if(name==="" || name===null){
                alert('You must to enter your name');
            }else{
                if(lastName==="" || lastName===null){
                alert('You must to enter your lastName');
            }else{
                if(user==="" || user===null){
                    alert('You must to enter an user name');
                }else{
                    if(password==="" || password===null){
                    alert('You must to enter a password');
                }else{
                    //Requete pour modifier les champs de l'utilisateur
                    db.collection("user").doc(user).update(
                        {
                            password: password,
                            name: name,
                            lastName: lastName
                        }
                        );

                    alert("Data saved");
                }
            }
                
                
            }
            }
                
        }

        var user = localStorage.getItem('user');

        //Recuperer le tableau
        var text = localStorage.getItem('data');
        if(text==null){
            return (
                <>
                <Navbar></Navbar>
            <br></br>
                <Boot.Container className="container p-4">
                    <Boot.Container className="row"/>
                    <Boot.Container className="cargando"/>
                </Boot.Container></>);
        }else{
        //Diviser les differents attributs du tableau pour les afficher dans les input text comme placeholder
        const data = text.split(",");
        return(
            <>
            <Navbar></Navbar>
            <br></br>
            <Boot.Container className="conainer p-4">
                <Boot.InputGroup.Text>
                    Name
                </Boot.InputGroup.Text>
                <Boot.FormControl  id="name" aria-label="Name" placeholder={data[1]}/>
                <br></br>
                <Boot.InputGroup.Text>
                    Last Name
                </Boot.InputGroup.Text>
                <Boot.FormControl  id="lastName" aria-label="Last Name" placeholder={data[2]}/>
                <br></br>
                <Boot.InputGroup.Text >
                    Password
                </Boot.InputGroup.Text>
                <Boot.FormControl type="password" id="password" aria-label="Password" placeholder={data[0]}/>

            <br></br>
            <Boot.Container className="row">
                <Boot.Button variant="primary" onClick={save}>Save</Boot.Button>
            </Boot.Container>
    
            </Boot.Container>
            </>
        );}
    }
    
    
}

export default Home;