import React, { useContext, useState } from 'react'
import divakar from "../Images/divakar2.jpg";
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

function Search() {
  const [username, setusername] = useState(" ");
  const [user, setuser] = useState(null);
  const [err, seterr] = useState(false);
  const { currentUser } = useContext(AuthContext);


  const handlesearch = async () => {
    console.log(username)
    const Userdata = query(collection(db, "users"), where("displayName", "==", username));
    // let name= responsedata[key].displayName.toLowerCase();

    try {
      const querySnapshot = await getDocs(Userdata);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setuser(doc.data())


      });
      console.log(user)
    }
    catch (err) {
      seterr(true)
    }
  }
  const handlekey = (e) => {
    e.code === "Enter" && handlesearch();

  }

  const handleselect = async () => {
    //combining the end-to-end user
    const combineid = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try {
      //checks weather there is any chat exists or not if not the create
      const res = await getDoc(doc(db, "chats", combineid));
      //creates a chat document inside the firebase 
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineid), { messages: [] })

        //create user chat
        await updateDoc(doc(db, "userchat", currentUser.uid), {
          [combineid + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineid + ".date"]: serverTimestamp()
        })
        ///for other end 
        await updateDoc(doc(db, "userchat", user.uid), {
          [combineid + ".userinfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineid + ".date"]: serverTimestamp()
        });
      }
    }
    catch (err) {
      seterr(true)
    }
    setuser(null)
    setusername("")
  }

  return (
    <div className='search'>
      <div className='searchform'>
        <input className='input' type='text' placeholder='find a user' onKeyDown={handlekey} onChange={(e) => setusername(e.target.value)}></input>
      </div>
      {err && <span>somthing got wrong</span>}
      {user && <div className='userform' onClick={handleselect}>
        <img src={user.photoURL} alt="divakar" />
        <label >{user.displayName}</label>
        <label className='name'></label>
      </div>}

    </div>
  )
}

export default Search
