import { createContext, useEffect, useReducer } from "react";
import { supabaseUserClient } from "../supabase/auth";

export const UsersContext = createContext()

const usersReducer = (userState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            return {...userState, userSession: action.payload}
        case 'SETPROFILE': 
            return {...userState, userProfile:action.payload}
        case 'STATECHANGE':
            return {...userState, stateChange:action.payload, userAuthReady:true}
        case 'LOGOUT':
                return {...userState, userSession: action.payload, userAuthReady:true}        
    default : return userState
    }
}


export function UsersProvider({children, setUserSession}){
 
    const [userState, dispatch] = useReducer(usersReducer, {
        userSession : null,
        userProfile: null,
        userAuthReady: false,
        stateChange:null
        })
        
useEffect(()=>{
            setUserSession(userState?.userSession?.session)
 }, [userState])

useEffect(()=>{
    supabaseUserClient.auth.getSession().then((res)=>{
console.log(res.data)
        dispatch({type:'LOGIN', payload:res.data})
        if(res.session){
            return supabaseUserClient.from("profiles").select("*").eq("id", res.session.user.id).single()
        }
        return  null;
    }).then((res)=>{
        if(res?.data){
        dispatch({type:'SETPROFILE', payload:res.data})
        } else
        return null
    })
},[])


    return (
        <UsersContext.Provider value={{...userState, dispatch}}>
            {children}
        </UsersContext.Provider>
    )
}