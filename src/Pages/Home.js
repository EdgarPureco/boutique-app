import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebase';

import Navbar from "../Components/Navbar";
import Product from "../Components/Product";

class Home extends React.Component{
    
    render(){

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
