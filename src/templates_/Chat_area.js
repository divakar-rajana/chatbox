import React, { useContext } from 'react'
import videocall from "../Images/videocalling_icon.png"
import call from "../Images/calling_icon.png"
import Chatbox from './Chatbox';
import { Chatcontext } from '../Contexts/Chatcontext';
function Chat_area() {

  const { data } = useContext(Chatcontext);
  return (
    <div>
      <div className="container2">
        <div className="Navbar2">
          <img className="img" src={data.user.photoURL} />
          <span className='friend-name'>{data.user.displayName}</span>
          <div className='iconscointainer'>
            <img className='videocall' src={videocall}></img>
            <img className='call' src={call}></img>
          </div>
        </div>
        <Chatbox />

      </div>

    </div>
  )

}


export default Chat_area
