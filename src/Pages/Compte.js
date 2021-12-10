import React from "react";
import logo from './logo.png';

import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../firebase'
import db from '../firebase';

class creerCompte extends React.Component{
    
    render(){
        function creerCompte() {
            var user = document.getElementById('user').value;
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
                    //Requete pour obtenir la reference de l'utilisateur dans la base de données
                    const query = db.collection('user').doc(user);

                    //Condition qui valide s'il y a deja un utilisateur 
                    query.get().then((docSnapshot) => {
                        //S'il y a un utilisateur pareil, il faut changer puisque le nom d'utilisateur est son clé
                        //unique et n'est peux pas se repeter
                    if (docSnapshot.exists) {
                        alert("This user name already exist, chose another");
                    } else {
                        //S'il n'y existe pas, le compte va etre crée
                        db.collection('user').doc(user).set({
                            user: user,
                            password: password,
                            name: name,
                            lastName: lastName
                        });
                        localStorage.setItem("user",user);
                        window.location.assign('/home');
                    }
                });
                }
            }
                
                
            }
            }
                
        }

        return(
            <Boot.Container className="conainer p-4">
                <Boot.Container className="row">
                    <Boot.Image src={logo} rounded>
                </Boot.Image></Boot.Container>
            <br/>
                <Boot.InputGroup.Text>
                    Name
                </Boot.InputGroup.Text>
                <Boot.FormControl  id="name" aria-label="Name"/>
                <br></br>
                <Boot.InputGroup.Text>
                    Last Name
                </Boot.InputGroup.Text>
                <Boot.FormControl  id="lastName" aria-label="Last Name"/>
                <br></br>
                <Boot.InputGroup.Text>
                    User
                </Boot.InputGroup.Text>
                <Boot.FormControl  id="user" aria-label="User"/>
                <br></br>
                <Boot.InputGroup.Text >
                    Password
                </Boot.InputGroup.Text>
                <Boot.FormControl type="password" id="password" aria-label="Password"/>

            <br></br>
            <Boot.Container className="row">
                <Boot.Button variant="primary" onClick={creerCompte}>Créer Compte</Boot.Button>
            </Boot.Container>
    
            </Boot.Container>
        );
    }
    
    
}

export default creerCompte;