import React, { useState } from 'react'
import divakar from "../Images/divakar2.jpg";
import myprofile from "../Images/Myprofile.svg"
import edit from "../Images/edit.png"
import logout from "../Images/log-out.png"
import setting from "../Images/settings.png"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Home from '../static/Home.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const { currentUser } = useContext(AuthContext)
  const [open, setopen] = useState(false)
  return (
    <div>
      <div className="Navbar">
        <span className='logo'>CHATBOX</span>
        <div className='menu-container'>
          <div className='profile' onClick={() => { setopen(!open) }}>
            <img className="img" src={currentUser.photoURL} alt="" />
          </div>
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <ul>
              <Dropdownitem img={myprofile} text={"MyProfile"} />
              <Dropdownitem img={edit} text={"Edit profile"} />
              <Dropdownitem img={setting} text={"Settings"} />
              <Dropdownitem img={logout} text={<button className='button' onClick={() => signOut(auth)}>LOGOUT</button>}></Dropdownitem>
              {/* <button className='button' onClick={()=>signOut(auth)}>LOGOUT</button> */}
            </ul>

          </div>

        </div>

      </div>
    </div>
  )
}

function Dropdownitem(props) {
  return (
    <li className='dropdownitem'>
      <img className='img' src={props.img} alt="" />
      <a className='a'>{props.text}</a>
    </li>
  )
}

export default Navbar
