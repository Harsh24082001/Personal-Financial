import React, { useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function login() {
    const [email , setEmaill]=useState();
    const [password , setPasswordl]=useState();
    
    const nav=useNavigate();

    const SumbitHandle = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3030/login',{email,password})
        .then((result) => {
            console.log(result);
            if(result.data === "Success"){
                nav('/')
            }
            
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div>
        <div className="container">
        <div className="form-container" id="login-form-container">
            <h2>Login</h2>
            <form action="#" method="post" onSubmit={SumbitHandle}>
                <div className="form-group">
                    <label for="login-email">Email Address</label>
                    <input type="email" id="login-email" name="email" required placeholder="Enter your email" onChange={(e)=>{setEmaill(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" name="password" required placeholder="Enter your password" onChange={(e)=>{setPasswordl(e.target.value)}}/>
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
             <p className='p'>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    </div>
    </div>
  )
}
