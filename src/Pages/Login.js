import React from "react";
import logo from './logo.png';

import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../firebase'
import db from '../firebase';

class Login extends React.Component{
    
render(){
      async function getUser(user,password) {
        //Requete pour obtenir l'utilisateur ou le nom et le mot de passe soient corrects
        const query = await db.collection('user').where('user', '==', user)
        .where('password', '==', password).get();
      
        //Si la requete a trouvé un utilisateur avec ce nom et ce mot de passe va cceder 
         if (!query.empty) {
          localStorage.setItem('user',user);
          window.location.assign('/home');
        } else {
          alert('User does not exist/ Incorrect password');
        }
      
      }
    function login() {
        var user = document.getElementById('user').value;
        var password = document.getElementById('password').value;

        if(user==="" || user===null){
            alert('You must to enter your user name');
        }else{
            if(password==="" || password===null){
            alert('You must to enter your password');
        }else{
            getUser(user,password);
        }
        }
        
        
    }
    
    return(
        <Boot.Container className="container p-4">
            <Boot.Container className="row">
            <Boot.Container className="container p-2">
                <Boot.Image src={logo} width="150px"/>
            </Boot.Container>
        </Boot.Container>
        <br/>
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
            <Boot.Button variant="primary" onClick={login}>Se Connecter</Boot.Button>{' '}
        </Boot.Container>
        
        <br></br>
        <Boot.Container className="row">
            <Boot.Button variant="primary" href="/register">Créer Compte</Boot.Button>{' '}
        </Boot.Container>

        </Boot.Container>
    );
}
    
}

export default Login;