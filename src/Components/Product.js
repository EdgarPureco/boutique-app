import React from "react";
import '../firebase'
import db from '../firebase';
import * as Boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToCar from "./AddToCart";
import "./style.css";

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state= {products: [], loading: true}
    }

    componentDidMount() {
        //Requete pour obtenir les produits et les ajouter dans un tableau
        db.collection('product').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                this.state.products.push({id: doc.id, ...doc.data() });
                this.setState({loading: false});
            })
        });
      }

    render(){
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
            //Si les produits sont deja prets recupere l'ensemble des produits dans une variable
            var products = []
            products= this.state.products;
        return(
            //Pour chac'un des produits cela va generer un html card pour montrer le produit
            <>
            {products.map((p) =>{
                return (
                    <Boot.Container className="container p-4">
                    <Boot.Container className="row">
                    <Boot.Card>
                        <Boot.Card.Img fluid="true" src={p.img} />
                        <Boot.Card.Body>
                            <h1>{p.name}</h1>
                            <Boot.Card.Text>
                            {p.description}
                            </Boot.Card.Text>
                            <Boot.Card.Title align="right">Price: $ {p.price}</Boot.Card.Title>
                            <AddToCar id={p.id}></AddToCar>
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

export default Product;
