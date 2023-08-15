import React, { useContext, useRef, useState } from 'react'
import Message from './Message'
import { useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Chatcontext } from '../Contexts/Chatcontext';
import Inputbox from './Inputbox';

function Chatbox() {
  const [messages, setmessages] = useState([]);
  const { data } = useContext(Chatcontext)


  useEffect(() => {


    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setmessages(doc.data().messages)
    });
    return () => {
      unsub();
    };


  }, [data.chatId]);
  console.log(messages)
  return (
    <div>
      <div className='messages'>
        {messages.map((m) => (
          <Message message={m} key={m.Id} />
        ))}


      </div>
      <div >
        <Inputbox />
      </div>
    </div>
  )
}

export default Chatbox
