import React, { useState } from 'react'
import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import { TiTickOutline } from 'react-icons/ti'
import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from 'firebase/auth'
import { firebaseAuth } from '../Utils/firebase-config'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailVerified() {
    document.title="Pizza Delivery Application";
    const [isEmailVerified, setisEmailVerified] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const toastoption = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };


    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setisEmailVerified(currentUser.emailVerified);
            setEmail(currentUser.email);
        }
        else {
            navigate("/login");
        }
        if (currentUser.emailVerified) {
            navigate("/allpizzas");
        }
    });


    const handleSendAgain = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendEmailVerification(auth.currentUser).then(err => {
                if (err) {
                    toast.error(err.message,toastoption);
                }
                else {
                    toast.success("Verification mail sent successfully.", toastoption);
                }
            });
        } catch (error) {
            if (error.message === "Firebase: Error (auth/too-many-requests).")
                toast.error("Please wait for 2 min before sending another request.", toastoption);
        }
    };


    const handleTryAgain = () => {
        signOut(firebaseAuth);
    };
    return (
        <Container>
            <div className='verifiedlogo'>
                {isEmailVerified ? <TiTickOutline /> : <ImCross />}
            </div>
            <p>We have sent a verification link to <b>{email}</b>.</p>
            <p>Please verify your email to continue with pizza delivery application.</p>
            <button onClick={handleSendAgain}>Send Verification Email Again.</button>
            <button onClick={handleTryAgain}>Try With Another Email.</button>
            <ToastContainer />
        </Container>
    )
}
const Container = styled.div`
min-height: 100vh;
min-width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
.verifiedlogo{
    svg{
        color: red;
        font-size: 5rem;
        background-color: gray;
        border-radius: 50%;
        padding:1rem;
    }
}
button{
    padding: 0.5rem 1rem;
    background-color: transparent;
    cursor: pointer;
    margin: 1rem 0;
}
`;