import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



function Forgetpassword() {

  const [err, seterr] = useState(false)
  const [email, setemail] = useState(null)
  const [popup, setpopup] = useState(false)

  const handlersubmit = () => {

    const auth = getAuth();
    try {
      sendPasswordResetEmail(auth, email)
      //emailsend

    }
    catch (err) {
      seterr(true)
    }

    setpopup(true)
  }
  console.log(email)
  return (
    <div className="body">
      <div className="login-menu">
        <form className="form-menu" onChange={(e) => setemail(e.target.value)}>
          <div className="header">
            <h2>FORGET PASSWORD</h2> </div>
          <input type="email"
            className="inputbox"
            name="email"
            placeholder="Email"
          ></input>
          <button className="Button" onClick={handlersubmit}>SEND EMAIL</button>
          {
            err && window.alert("something went wrong")
          }
          {
            popup && window.alert(" check your Email ")
          }

        </form>

        <span className='link'> GO BACK TO SIGNIN PAGE : <Link to="/login">LOGIN</Link></span>

      </div>
    </div>
  )
}

export default Forgetpassword;
