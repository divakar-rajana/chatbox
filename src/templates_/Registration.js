import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import addimage from '../Images/add_image.png';


function Registration() {

  function tempAlert(msg, duration) {
    var el = document.createElement("div");
    el.setAttribute("style", "position:absolute;top:10%;left:42%;background-color:transparent;font-size:30px;width:fit-content;height:100px;padding:0.5rem;text-align:center;color:black;border-radius: 10px;");
    el.innerHTML = msg;
    setTimeout(function () {
      el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
  }
  const [err, seterr] = useState(false)

  const navigate = useNavigate()


  const handlersubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);


      // Listen for state changes, errors, and completion of the upload.
      console.log("hii")
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              tempAlert("registration on process.... ", 3000);
              console.log('Upload is running');
              break;
          }
        },

        (error) => {
          seterr(true);
        },
        () => {
          console.log("upload completed");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("hello")
            await updateProfile(res.user, {
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userchat", res.user.uid), {})
            navigate("/login")

          });
        }
      );

    }
    catch (err) {
      seterr(true)
    }
  }
  return (
    <div className="body">
      <div className='largebox'>
        <div className="registration-menu">

          <form className="form-menu" onSubmit={handlersubmit}>
            <div className="header">
              <h2>REGISTRATION FORM</h2> </div>

            <input type="name"
              className="inputbox"
              name="name"
              placeholder=" Write Your username"
            // value={userinput.email}

            ></input>

            <input type="email"
              className="inputbox"
              name="email"
              placeholder=" Write Your Email"
            // value={userinput.email}

            ></input>
            <br></br>

            <div className="password">
              <input type="Password" className="inputbox" name="password" placeholder=" Set password" minlength="8"></input>
            </div>

            <input
              type="file"
              className='inputbox'
            />



            <button className="Button" >ADD</button>
            {
              err && window.alert("username allready exists")
            }

          </form>
          <span className='link'> allready have an Account <Link to="/login">Sign in</Link></span>
        </div>
        <div className='photo'>

        </div>
      </div>
    </div>
  )
}

export default Registration
