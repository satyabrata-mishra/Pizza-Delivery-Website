import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiFillLock } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
const validator = require("email-validator");


export default function Login() {
  document.title=`Pizza Delivery Application`;
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: ""
  });
  const [showPassword, setshowPassword] = useState(false);
  const toastoption = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  const navigate = useNavigate();


  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  };


  const handleShowPassword = () => {
    setshowPassword(!showPassword);
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };


  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (credentials.name === "")
      toast.error("Enter a valid name.", toastoption);
    else if (!validator.validate(credentials.email))
      toast.error("Enter a valid email.", toastoption);
    else if (credentials.password.length < 6)
      toast.error("Password length should be atleast 6.", toastoption);
    else if (credentials.password !== credentials.repeatpassword)
      toast.error("Password and repeat password cannot be different.", toastoption);
    else {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password).then(() => {
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: credentials.name
          });
          sendEmailVerification(auth.currentUser).then(err=>{
            if(err){
              console.log(err.message);
            }
            else{
              console.log("Email Sent.");
            }
          });
        });
      } catch (error) {
        toast.error(error.message,toastoption);
      }
    }
  };


  const handleGoogleCreateAccount = (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      console.log(error.message)
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/emailverified");
    }
  })


  return (
    <Components>
      <div className="content">
        <form>
          <div className="lock"><AiFillLock /></div>
          <p>CREATE ACCOUNT</p>
          <input type="text" value={credentials.name} name="name" onChange={handleChange} placeholder='Name*' />
          <input type="email" value={credentials.email} name="email" onChange={handleChange} placeholder='Email Address*' />
          <input id='pass' type="password" value={credentials.password} name="password" onChange={handleChange} placeholder='Password*' />
          <div className="showpassword">
            {
              showPassword
                ? <AiOutlineEyeInvisible onClick={handleShowPassword} />
                : <AiOutlineEye onClick={handleShowPassword} />
            }
          </div>
          <input className='repeatpassword' type="password" value={credentials.repeatpassword} name="repeatpassword" onChange={handleChange} placeholder='Repeat Password*' />
          <button className='signin' onClick={handleCreateAccount}>CREATE ACCOUNT</button>
          <button className='googlesignin' onClick={handleGoogleCreateAccount}><AiOutlineGoogle />CREATE ACCOUNT WITH GOOGLE</button>
          <p>ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link> </p>
        </form>
      </div>
      <ToastContainer />
    </Components>
  )
}
const Components = styled.div`
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
    .content{
      height: 75vh;
      display: flex;
      justify-content: center;
      align-items: center;
      form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        padding: 1rem;
        box-shadow: 0px 0px 10px grey;
        .lock{
          background-color: red;
          border-radius: 50%;
            svg{
            color: white;
            font-size: 1.8rem;
            padding: 0.5rem;
          }
        }
        p{
          font-size: 1rem;
          font-weight: bold;
        }
        input{
          height: 2.4rem;
          width: 16rem;
          border: 1px solid grey;
          outline: none;
          border-radius: 3px;
          padding: 0 1rem;
          margin: 0.4rem 0;
          &:hover{
            border: 1px solid black;
          }
        }
        .showpassword{
          position: relative;
          bottom: 2.2rem;
          left: 7.7rem;
          svg{
            font-size: 1.1rem;
            cursor: pointer;
            color: gray;
            &:hover{
              color: black;
            }
          }
        }
        .repeatpassword{
          margin-top: -1rem;
          margin-bottom: 2rem;
        }
        .signin{
          width: 18rem;
          height: 2rem;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          margin: 0.2rem;
          background-color: blueviolet;
          color: white;
          margin-top: -1rem;
          &:hover{
            background-color: #7235ab;
            transition: 0.2s ease-in;
          }
        }
        .googlesignin{
          width: 18rem;
          height: 2rem;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          margin: 0.2rem;
          background-color: blueviolet;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            background-color: #7235ab;
            transition: 0.2s ease-in;
          }
          svg{
            font-size: 1.3rem;
            margin: 0 0.3rem;
          }
        }
        p{
          font-size: 0.9rem;
          a{
            color: black;
            text-decoration: none;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
`;