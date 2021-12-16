import React from "react";
import db from '../firebase';
import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components/style.css";
import RemoveFromCart from "../Components/RemoveFromCart";
import Navbar from "../Components/Navbar";
import * as Icon from "react-icons/bs";

class Cart extends React.Component{

    constructor(props){
        super(props);
        this.state= {products: [], loading: true}
    }

    componentDidMount() {
        var user = localStorage.getItem('user');
        //Requete pour obtenir les produits et les ajouter dans un tableau
        db.collection("user/"+user+"/cart").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                this.state.products.push({id: doc.id, ...doc.data() });
                this.setState({loading: false});
            })
        });
      }

      pay(){
          //Incomplet
          console.log('Pay')
          var user = localStorage.getItem('user');
          //Requete pour obtenir la reference de la collection cart de la base de données
          const query = db.collection("user/"+user+"/cart/").doc();
          //Requete pour suprimmer les produits de la collection cart de l'utilisateur
          db.collection("user/"+user+"/cart").get()
          .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                doc.ref.delete();
             });
             //Requete pour obtenir un produit de la collection cart de la base de données
             query.get().then((docSnapshot) => {
                 //Condition qui valide s'il y a un produit dans le panier, s'il y en a veut dire 
                 //que la requete pour suprimmer a echoué
                if (docSnapshot.exists) {
                    alert('Payment refused')
             window.location.reload();
                } else {
                    alert('Payment accepted')
             window.location.reload();
                }
            });
             
          });
         
      }

    render(){
        var products = []
            products= this.state.products;
        //COndition pour valider si le panier est vide ou pas
        if(products.length===0){
            return(<>
            <Navbar></Navbar>
            <br></br>
            <Boot.Container className="container p-4">
                <Boot.Container className="row">
                <Boot.Badge bg="primary">Your Cart is Empty</Boot.Badge>
                </Boot.Container>
            </Boot.Container></>
            );
            
        }
        //Condition pour valider l'etat de generation des produits, s'ils sont en train de charger
        //cela va comtrer un cercle en chargeant
        if(this.state.loading){
            return (
            <>
            <Boot.Container className="container p-4">
                <Boot.Container className="row"/>
                <Boot.Container className="cargando"/>
            </Boot.Container></>);
        }else{
            
        return(
            <>
            <Navbar></Navbar>
            <br></br>
            <Boot.Container className="d-grid gap-1"><Boot.Button variant="primary" onClick={this.pay.bind(this)}>Pay <Icon.BsCash/></Boot.Button></Boot.Container>
            {products.map((p) =>{  //Pour chac'un des produits cela va generer un html card pour montrer le produit
                return (
                    <Boot.Container className="container p-4">
                    <Boot.Container className="row">
                    <Boot.Card>
                        <Boot.Card.Img fluid="true" src={p.img} />
                        <Boot.Card.Body>
                            <h1>{p.name}</h1>
                            <Boot.Card.Text>
                            Quantity:  <input type="number" min="1" max="100" placeholder={p.quantity}></input>
                            </Boot.Card.Text>
                            <Boot.Card.Title align="right">Price: $ {p.price}</Boot.Card.Title>
                            <RemoveFromCart id={p.id}></RemoveFromCart>
                        </Boot.Card.Body>
                    </Boot.Card>
                    </Boot.Container>
                    </Boot.Container>
                )
            })}
            
            </>
        );
        }
    }
}

export default Cart;
