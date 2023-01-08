import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../Components/Navbar'
import Order from '../Components/Order';
import { host } from '../Utils/constant';
import { firebaseAuth } from '../Utils/firebase-config';

export default function MyOrders() {
    const [allInCart, setallInCart] = useState([]);
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
            const user = await response.json();
            setallInCart(user.filter(value => value.orderPlaced));
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                getAllCart(currentUser.email);
            }
        })
    }, [])

    return (
        <>
            <Navbar />
            <Components>
                {
                    allInCart.length===0?<img src="https://organickle.com/images/no-order.svg" alt="" />:""
                }
                {
                    allInCart.map((value,index)=>{
                        return <Order image={value.image} name={value.name} updatedPrice={value.updatedPrice} quatity={value.quatity} orderStatus={value.orderStatus} orderPlaced={value.orderPlaced} />
                    })
                }
            </Components>
        </>
    )
}
const Components = styled.div`
    img{
        margin-top: 5rem;
        margin-left: 30rem;
    }
`;