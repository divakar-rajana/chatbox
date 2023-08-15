import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../Contexts/AuthContext';
import { Chatcontext } from '../Contexts/Chatcontext';


function Chats() {

  const [chats, setchats] = useState([])
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(Chatcontext);


  useEffect(() => {

    const getchats = () => {
      const unsub = onSnapshot(doc(db, "userchat", currentUser.uid), (doc) => {
        setchats(doc.data())
      });
      return () => {
        unsub();
      };
    }
    currentUser.uid && getchats();
  }, [currentUser.uid]);

  const handleselect = (u) => {
    console.log(u)
    dispatch({ type: "CHANGE_USER", payload: u });
  };



  console.log(chats)
  return (

    <div className='chat'>
      {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (

        <div className='userchat' key={chat[0]} onClick={() => handleselect(chat[1].userinfo)}>
          <img className="img" src={chat[1].userinfo.photoURL} alt="divakar" />

          <div className='userchatinfo'>
            <span className='span'>{chat[1].userinfo.displayName}</span>
            <p className='p'>{chat[1].lastmessage?.text}</p>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Chats
