import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";



export const Chatcontext = createContext()

export const ChatcontextProvider= ({children})=>{
    const {currentUser}= useContext(AuthContext)
    const INITIAL_STATE ={
        chatId:"null",
        user:{}
    }
    const chatreducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId:
                    currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        }
    };
    const [state,dispatch]=useReducer(chatreducer,INITIAL_STATE)
    
    return(
  <Chatcontext.Provider value={{data:state,dispatch}}>
    {children}
  </Chatcontext.Provider>
    )

};