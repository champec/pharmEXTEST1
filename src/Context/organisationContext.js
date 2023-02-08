import { createContext, useEffect, useReducer } from "react";
import { supabasePharmacyClient } from "../supabase/auth";


export const OrganisationContext = createContext()

const orgReducer = (orgState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            return {...orgState, orgData: action.payload, orgAuthReady:true}
        case 'SETPROFILE': 
            return {...orgState, profileData:action.payload}
        case 'STATECHANGE':
            return {...orgState, stateChange:action.payload, orgAuthReady:true}
        case 'LOGOUT':
                return {...orgState, orgData: action.payload, orgAuthReady:true}        
    default : return orgState
    }
}




export function OrganisationProvider({children, setPharmacySession}){
const [orgState, dispatch] = useReducer(orgReducer, {
orgData : null,
profileData: null,
orgAuthReady: false,
stateChange:null
})

useEffect(()=>{
    setPharmacySession(orgState.orgData?.user)
}, [orgState])

useEffect(()=>{
    //get the session if any and set profile 
supabasePharmacyClient.auth.getSession().then(({data:{session}, error}) =>{

    dispatch({type:'LOGIN', payload:session, orgAuthReady:true, orgData:session})
    if(session){
        return supabasePharmacyClient.from("profiles").select("*").eq("id", session.user.id).single()
    } else
    return session   
}).then((res)=>{
    dispatch({type:'SETPROFILE', payload:res})
})
.catch((error) => {
    console.log(error)
})

// if log out or login event again set profile or remove accordingly
// supabasePharmacyClient.auth.onAuthStateChange((_event, session) => {
    
//     dispatch({type:'STATECHANGE', payload:_event})
//   })
      
},[orgState.orgAuthReady])



    return (
        <OrganisationContext.Provider value={{...orgState, dispatch}}>
            {children}
        </OrganisationContext.Provider>
    )
}