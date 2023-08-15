import React from 'react'
import Loginpage from '../static/Loginpage.css'
import myprofile from '../Images/Myprofile.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from 'react';

function Login() {

  const [err, seterr] = useState(false)
  const navigate = useNavigate()

  const handlersubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    }
    catch (err) {
      seterr(true)
    }
  };

  return (
    <div className="body">
      <div className="login-menu">

        <form className="form-menu" onSubmit={handlersubmit}>
          <div className="header">

            <h2>LOGIN</h2> </div>
          <img className='login-profile' src={myprofile}></img>


          <input type="email"
            className="inputbox"
            name="email"
            placeholder="Email"
          // value={userinput.email}

          ></input>
          <br></br>

          <div className="password">
            <input type="Password" className="inputbox" name="password" placeholder="password"
            // value={userinput.password}

            ></input>
          </div>
          <button className="Button"  >Login</button>
          {
            err && window.alert("email or password incorrect || register yourself")
          }
        </form>
        <span className='link'> Don't have an Account <Link to='/'>Register</Link></span>
        <span className='forgetpassword'><Link to="/forget">Forget Password?</Link></span>

      </div>
    </div>


  )
}

export default Login
