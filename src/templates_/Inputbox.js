import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { Chatcontext } from '../Contexts/Chatcontext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { nanoid } from 'nanoid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import attach from "../Images/attach.png"

function Inputbox() {

  const [text, settext] = useState("")
  const [err, seterr] = useState(false)
  const [img, setimage] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(Chatcontext)

  const handlesend = async () => {
    if (img) {
      const storageRef = ref(storage, nanoid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURl) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: nanoid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURl
              })
            })
          })

        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: nanoid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
    }

    await updateDoc(doc(db, "userchat", currentUser.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),

    });

    await updateDoc(doc(db, "userchat", data.user.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),

    });

    settext("");
    setimage(null)

  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handlesend();
    }
  }

  return (
    <div className='messagesend'>
      <input className="input"
        type='text'
        placeholder='write your message here ...'
        onChange={(e) => settext(e.target.value)}
        value={text}
        onKeyDown={handleKeypress} />

      <div className="send">

        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setimage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img className='file' src={attach} alt="" />
        </label>
      </div>
      <button className='button' onClick={() => handlesend()} ></button>
    </div>
  )
}


export default Inputbox
