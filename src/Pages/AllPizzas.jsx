import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../Components/Card';
import Navbar from '../Components/Navbar'
import { host } from '../Utils/constant';
import { firebaseAuth } from '../Utils/firebase-config';
import allPizza from '../Utils/pizzas';


export default function AllPizzas() {
    const [nameOfPizzasInCart, setnameOfPizzasInCart] = useState([]);

    useEffect(() => {
        try {
            onAuthStateChanged(firebaseAuth, (currentUser) => {
                if (currentUser) {
                    getAllCart(currentUser.email);
                    document.title=`Pizza Delivery Application - ${currentUser.displayName}`;
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    }, [])

    const getAllCart = async (email) => {
        try {
            const response = await fetch(`${host}/orders/getallcart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: email
                })
            });
            const json = await response.json();
            setnameOfPizzasInCart([]);
            var name=[];
            json.map((value)=>{
                return name.push(value.name);
            });
            setnameOfPizzasInCart(name);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Components>
                {
                    allPizza.map((pizza, index) => {
                        return <Card key={index} img={pizza.image} name={pizza.name} description={pizza.description} price={pizza.price} presentInCart={nameOfPizzasInCart.indexOf(pizza.name)!==-1} />
                    })
                }
            </Components>
        </>
    )
}
const Components = styled.div`
display: flex;
flex-wrap: wrap;
`;