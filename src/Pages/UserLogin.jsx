import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiFillLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { firebaseAuth } from '../Utils/firebase-config';
const validator = require("email-validator");

export default function UserLogin() {
  document.title=`Pizza Delivery Application`;
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });
  const toastoption = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
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


  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validator.validate(credentials.email))
      toast.error("Enter a valid email.", toastoption);
    else if (credentials.password === "")
      toast.error("Enter a valid password.", toastoption);
    else {
      try {
        await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
      } catch (error) {
        if (error.message === "Firebase: Error (auth/user-not-found).")
          toast.error("User does not exsist.", toastoption);
        else if (error.message === "Firebase: Error (auth/wrong-password).")
          toast.error("Wrong password.", toastoption);
        else
          toast.error(error.message, toastoption);
      }
    }
  };


  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider);
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, credentials.email).then(err => {
        if (err) {
          toast.error(err.message, toastoption);
        }
        else {
          toast.success(`Password reset link sent to ${credentials.email}`, toastoption);
        }
      });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).")
        toast.error("Email doesn't exsist.", toastoption);
      else
        toast.error(error.message,toastoption);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if (currentuser) {
      navigate("/emailverified");
    }
  })

  return (
    <Components>
      <div className="content">
        <form>
          <div className="lock"><AiFillLock /></div>
          <p>LOGIN</p>
          <input type="email" value={credentials.email} name="email" onChange={handleChange} placeholder='Email Address*' />
          <input id='pass' type="password" value={credentials.password} name="password" onChange={handleChange} placeholder='Password*' />
          <div className="showpassword">
            {
              showPassword
                ? <AiOutlineEyeInvisible onClick={handleShowPassword} />
                : <AiOutlineEye onClick={handleShowPassword} />
            }
          </div>
          <button className='signin' onClick={handleSignIn}>LOGIN</button>
          <button className='googlesignin' onClick={handleGoogleSignIn}><AiOutlineGoogle />GOOGLE LOGIN</button>
          <p>DON'T HAVE AN ACCOUNT? <Link to="/">SIGN UP</Link> </p>
          <p className='forgotpassword' onClick={handleForgotPassword}>Forgot Password?Click Here</p>
        </form>
        <ToastContainer />
      </div>
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
      svg{
        font-size: 1.3rem;
        margin: 0 0.3rem;
      }
      &:hover{
        background-color: #7235ab;
        transition: 0.2s ease-in;
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
    .forgotpassword{
      margin-top: -0.4rem;
    }
    .forgotpassword:hover{
      cursor: pointer;
    }
  }
}
`;