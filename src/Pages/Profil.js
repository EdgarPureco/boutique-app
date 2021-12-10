import React from "react";

import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../firebase'
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
        //Requete pour obtenir la reference de l'utilisateur dans la base de données
        const query = db.collection('user').doc(user);
        query.get().then((docSnapshot) => {

            //Si l'utilisateur exist cette requete recupere les données et les sauvegarde dans un tableau
            if (docSnapshot.exists) {
               query.onSnapshot((doc) => {
                    var password = doc.get('password');
                    var name = doc.get('name');
                    var lastName = doc.get('lastName');
                    var data = [];
                    data.push(password);
                    data.push(name);
                    data.push(lastName);
                    //Sauvegarder le tableau dans le local storage
                    localStorage.setItem('data', data);
                  });
                }else{
                    window.location.assign('/register');
                }
        });

        //Recuperer le tableau
        var text = localStorage.getItem('data');
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
        );
    }
    
    
}

export default Home;