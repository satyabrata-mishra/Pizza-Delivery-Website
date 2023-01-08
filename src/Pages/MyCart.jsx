import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Cart from '../Components/Cart';
import Navbar from '../Components/Navbar';
import { host } from '../Utils/constant';
import { firebaseAuth } from '../Utils/firebase-config';
import pizza from '../assets/pizza.png'
import { useNavigate } from 'react-router-dom';

export default function MyCart() {
    const navigate = useNavigate();
    const [allInCart, setallInCart] = useState([]);
    const [totalBill, settotalBill] = useState(0);

    const PlaceOrder = async () => {
        allInCart.map(async (value) => {
            try {
                await fetch(`${host}/orders/placeorder`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: value._id
                    })
                });
                const auth = getAuth();
                getAllCart(auth.currentUser.email);
            } catch (error) {
                console.log(error.message);
            }
            return;
        });
        navigate("/myorders");
    }

    
    const handlePlaceOrder = async (e) => {
        const options = {
            key: "rzp_test_fiDwiFoKFmbeFW",
            currency: "INR",
            amount: totalBill * 100,
            name: "Pizza Delivery Application",
            description: "Pizza delivery application payment gateway for Oasis Infobyte Internship Programme.",
            image: pizza,

            handler: function (response) {
                PlaceOrder();
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
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
            setallInCart(user.filter(value => !value.orderPlaced));
            var sum = 0;
            user.map((value) => {
                if (!value.orderPlaced) {
                    sum += value.updatedPrice;
                }
                return sum;
            });
            settotalBill(sum);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        try {
            onAuthStateChanged(firebaseAuth, (currentUser) => {
                if (currentUser) {
                    getAllCart(currentUser.email);
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    return (
        <>
            <Navbar />
            <Components>
                {
                    allInCart.length === 0 ? <img src="https://mir-s3-cdn-cf.behance.net/projects/404/54b13147340145.Y3JvcCw0MDUsMzE3LDAsNDI.png" alt="" /> : ""
                }
                {
                    allInCart.map((value, index) => {
                        return <Cart key={index} img={value.image} name={value.name} updatedPrice={value.updatedPrice} quatity={value.quatity} id={value._id} orderPlaced={value.orderPlaced} getAllCart={getAllCart} />
                    })
                }
                {
                    allInCart.length !== 0 ? <button className='order' onClick={handlePlaceOrder}>Place Order {totalBill}/-</button> : ""
                }
            </Components>
        </>
    )
}
const Components = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img{
        height: 20rem;
        width: 25rem;
    }
    .order{
        background-color: #7a7a8a;
        padding: 0.5rem 3rem;
        font-size: 1.4rem;
        border: none;
        font-weight: 600;
        cursor: pointer;
    }
`;