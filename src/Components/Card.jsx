import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import styled from 'styled-components'
import { host } from '../Utils/constant';
import { toast, ToastContainer } from 'react-toastify';

export default function Card({ img, name, description, price, presentInCart }) {
    const [isPresent, setisPresent] = useState(presentInCart)
    const toastoption = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };


    const handleAddToCart = async (e) => {
        const auth = getAuth();
        try {
            await fetch(`${host}/orders/addtocart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: auth.currentUser.email,
                    image: img,
                    name: name,
                    price: price
                })
            });
            toast.success("Item added to cart.", toastoption);
        } catch (error) {
            console.log(error.message);
            toast.error("Cannot add item to the cart.", toastoption);
        }
        setisPresent(!isPresent);
    };

    const handleRemoveFromCart = (e) => {
        e.preventDefault();
    }
    return (
        <Components>
            <div className="card">
                <img src={img} alt="" />
                <p className='pizzaname'>{name}</p>
                <p className='pizzadescription'>{description}</p>
                <p className='price'>Price:{price}/-</p>
                {isPresent ? <button className='remove' onClick={handleRemoveFromCart}>Already in cart</button> : <button className='add' onClick={handleAddToCart}>Add to Cart</button>}
            </div>
            <ToastContainer />
        </Components>
    )
}
const Components = styled.div`
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 25rem;
        width: 20rem;
        margin: 1rem 2.6rem;
        box-shadow: 0 0 10px grey;
        border-radius: 30px;
        img{
            height: 12rem;
            width: 12rem;
            border-radius: 50%;
        }
        .pizzaname{
            font-weight: 600;
        }
        .pizzadescription{
            text-align: justify;
            font-size: 0.8rem;
            margin: 0 1.5rem;
            opacity: 0.6;
        }
        .price{
            font-size: 0.9rem;
            font-weight: 500;
        }
        .add{
            padding: 0.3rem 0.8rem;
            background-color : green;
            color: white;
            border: none;
            cursor: pointer;
            border: 1px solid white;
        }
        .remove{
            padding: 0.3rem 0.8rem;
            background-color : red;
            color: white;
            border: none;
            cursor: pointer;
            border: 1px solid white;
        }
    }
`