import React from "react";
import '../firebase'
import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from "react-icons/bs";
import db from '../firebase';

class RemoveFromCart extends React.Component{

    constructor(props,id){
        super(props);
        this.id = this.props.id;
    }

    async remove(){
        //Recuperer le nom de l'utilisateur
        var user = localStorage.getItem('user');
        //Requet pour supprimer le produit de la collection du panier de l'utilisateur
        await db.collection("user/"+user+"/cart").doc(this.id).delete();
        alert('Product removed from cart')
        window.location.reload();            
    }

    render(){
        
        return(
            
        <Boot.Container className="d-grid gap-1"><Boot.Button variant="danger" onClick={this.remove.bind(this)}><Icon.BsTrash/></Boot.Button></Boot.Container>
                        
        );

    }
}

export default RemoveFromCart;
