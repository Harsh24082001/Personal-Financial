import React, { useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const [name , setName]=useState();
    const [email , setEmail]=useState();
    const [password , setPassword]=useState();

    const nav=useNavigate();

    const HandleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3030/signup',{name, email, password})
        .then(result =>{
            console.log(result);
            nav('/login')
        }).catch(error =>{
            console.log(error)
        })
    }

  return (
        <div className="container">
            <div className="form-container">
                <h2>Create an Account</h2>
                <form action="#" method="post" onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required placeholder="Enter your full name" onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn" >Register</button>
                </form>
                <p className='p'>You have already account? <Link to="/login">Login</Link> </p>
            </div>
        </div>
  )
}
