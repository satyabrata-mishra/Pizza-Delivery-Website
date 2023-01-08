import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Image from '../assets/pizza.png'
import { firebaseAuth } from '../Utils/firebase-config';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        name: "",
        img: ""
    });
    const location = useLocation();


    const handleSignOut = () => {
        signOut(firebaseAuth);
    };

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            }
            else if (!currentUser.emailVerified) {
                navigate("/emailverified");
            }
            else {
                setuser({
                    name: currentUser.displayName,
                    img: currentUser.photoURL
                });
            }
        });
    }, []);

    return (
        <Components>
            <nav>
                <img src={Image} alt="" />
                <div className='menu'>
                    <Link className={location.pathname === "/allpizzas" ? "underline" : ""} to="/allpizzas">Pizzas</Link>
                    <Link className={location.pathname === "/custompizzas" ? "underline" : ""} to="/custompizzas">Custom Pizzas</Link>
                    <Link className={location.pathname === "/mycart" ? "underline" : ""} to="/mycart">My Cart<AiOutlineShoppingCart /></Link>
                    <Link className={location.pathname === "/myorders" ? "underline" : ""} to="/myorders">My Orders</Link>
                </div>
                <div className='userdetails'>
                    {!user.img && <p className='letter'>{user.name.charAt(0).toUpperCase()}</p>}
                    {user.img && <img src={user.img} alt="" />}
                    <p className='name'>{user.name}</p>
                    <button onClick={handleSignOut}>SIGN OUT</button>
                </div>
            </nav>
        </Components>
    )
}
const Components = styled.div`
    nav{
        height: 7rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 1rem 1.5rem;
        border-radius: 3rem;
        box-shadow: 0px 0px 10px grey;
        img{
            height: 5rem;
            margin: 0 2rem;
        }
        .menu{
            margin: 0 10rem 0 0;
            a{
                text-decoration: none;
                color: black;
                font-weight: 500;
                margin: 0 1rem;
                svg{
                    font-size: 1.1rem;
                    position: relative;
                    top: 0.2rem;
                    margin: 0 0.2rem;
                }
            }
            .underline{
                text-decoration: underline;
            }
        }
        .userdetails{
            display: flex;
            flex-direction: row;
            align-items: center;
            .letter{
                background-color: red;
                border-radius: 50%;
                font-size: 1.3rem;
                width: 2rem;
                height: 1.9rem;
                text-align: center;
                margin-right: 1rem;
            }
            img{
                border-radius: 50%;
                width: 3rem;
                height: 3rem;
            }
            .name{
                font-weight: 500;
                margin: 0 1rem 0 0;
                padding: 0.4rem 0.4rem;
            }
            button{
                background-color: red;
                border: none;
                padding: 0.6rem 1rem;
                border-radius: 15rem;
                cursor: pointer;
                font-weight: 600;
            }
        }
    }
`;