import React from "react";
import '../firebase'
import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebase';

class AddToCart extends React.Component{

    constructor(props,id){
        super(props);
        this.id = this.props.id;
        this.state= {data: []}
    }

    add() {
        //Recuperer le nom d'utilisateur
        var user = localStorage.getItem('user');
        //Requete pour trouver le produit
        const query = db.collection("user/"+user+"/cart/").doc(this.id)

        //Obtenir le produit
        query.get().then(async (docSnapshot) => {
            //Condition pour valider si le produit est deja dans le panier et montrer
            if (docSnapshot.exists) {
                alert('Product already added');
            } else { //Si le produit n'existe pas il sera ajouté
                //Requete pour trouver le produit dans un autre collection de la base de donées et
                // le sauvegarder dans un tableau en ajoutant la quantité
                await db.collection('product').doc(this.id).get()
            .then(doc => this.state.data.push({id: doc.id, ...doc.data(), quantity: 1 }));
            console.log(this.state.data);
            
            //requete pour ajouter le produit dans la collection du panier qui appartenait a l'utilisateur
            db.collection("user/"+user+"/cart").doc(this.id).set({
                
                name: this.state.data[0]['name'],
                description: this.state.data[0]['description'],
                price: this.state.data[0]['price'],
                quantity: this.state.data[0]['quantity'],
                img: this.state.data[0]['img']
            });
            alert('Product added');
            }
        });
      
      }

    render(){
        
        return(
            
        <Boot.Button variant="primary" onClick={this.add.bind(this)}>Add to cart</Boot.Button>
                        
        );

    }
}

export default AddToCart;
