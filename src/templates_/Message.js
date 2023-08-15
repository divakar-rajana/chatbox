import React, { useContext, useEffect, useRef } from 'react'
import divakar from "../Images/divakar2.jpg";
import { AuthContext } from '../Contexts/AuthContext';
import { Chatcontext } from '../Contexts/Chatcontext';
function Message({ message }) {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(Chatcontext)
  // console.log("currentuser items",currentUser)
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div ref={ref}>
      <div className={`message ${message.senderId == currentUser.uid && "owner"}`}>
        <div className='userinfo'>
          <img className="img" src={message.senderId == currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL} />
          <label className='messagebox'>{ }</label>
        </div>
        {/* <div className='messagecontent'> */}
        <p className='messagecontent'>{message.text}</p>
        {message.img && <img className='imgcontent' src={message.img} />}
        {/* </div> */}
      </div>

    </div>
  )
}

export default Message
