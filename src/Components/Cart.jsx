import { getAuth } from 'firebase/auth';
import React, { } from 'react'
import styled from 'styled-components'
import { host } from '../Utils/constant';

export default function Cart({ img, name, updatedPrice, quatity, id, orderPlaced, getAllCart }) {
    const increaseQuantity = async () => {
        try {
            await fetch(`${host}/orders/increasequantity`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const auth = getAuth();
            getAllCart(auth.currentUser.email);
        } catch (error) {
            console.log(error.message);
        }
    };

    const decreaseQuantity = async () => {
        if (quatity === 1) {
            try {
                await fetch(`${host}/orders/deletefromcart`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                });
                const auth = getAuth();
                getAllCart(auth.currentUser.email);
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            try {
                await fetch(`${host}/orders/decreasequantity`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                });
                const auth = getAuth();
                getAllCart(auth.currentUser.email);
            } catch (error) {
                console.log(error.message);
            }
        }
    };
    return (
        <Components>
            {!orderPlaced && <div className="cart">
                <img src={img} alt="" />
                <div className="details">
                    <p className='pizza'>{name}</p>
                    <p className='price'>Price:{updatedPrice}/-</p>
                </div>
                <div className="button">
                    <button onClick={increaseQuantity}>+</button>
                    <p>{quatity}</p>
                    <button onClick={decreaseQuantity}>-</button>
                </div>
            </div>}
        </Components>
    )
}
const Components = styled.div`
.cart{
    display: flex;
    align-items: center;
    height: 6rem;
    width: 85vw;
    margin: 1rem 5rem;
    box-shadow: 0px 0px 10px gray;
    border-radius: 20px;
    img{
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        margin: 0 1.2rem;
    }
    .details{
        margin-right: 27rem;
        p{
            font-weight: 500;
        }
        .pizza{
            width: 20rem;
        }
    }
    .button{
        display: flex;
        align-items: center;
        float: right;
        button{
            height: 1.5rem;
            width: 1.5rem;
            border: none;
            font-size: 1rem;
            background-color: grey;
            margin: 0 1rem;
            cursor: pointer;
        }
        p{
            font-weight: 500;
        }
    }
}
`;