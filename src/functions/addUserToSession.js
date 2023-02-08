import { supabaseUserClient, supabasePharmacyClient } from "../supabase/auth"
import { useUserContext, useOrgContext } from "../Hooks"


export function useAddUserToSession(){
    //get currently loggedin pharmacies ID
    const {orgData:{user}} = useOrgContext()
    const {userSession, userProfile} = useUserContext()

    //get loggedin users email and username and refreshToke
    const rToken = userSession.session.refresh_token
    const lastIn = userSession.session.user.last_sign_in_at
    const email =  userSession.session.user.email
    const username = userProfile?.username
    

  const sessionObject = {rToken:rToken, lastIn:lastIn, email:email, username:username}
  const  setSessionData = async () => {

     //pull down the current sessions object - return array of objects
     const {data:{active_session}, error} = await supabasePharmacyClient
     .from('profiles')
     .select('active_session')
     .eq('id', user.id)
     .single()
   
     //if a session is active then array value is at least 0
     if(active_session){
       console.log("AN AVTIVE ARRAY IS FOUND")
       let currentSessionArray = active_session
       let userIndex = currentSessionArray.findIndex((sesh => sesh?.email == email))
       userIndex >= 0 ? userIndex = userIndex : userIndex = currentSessionArray.length+1
       currentSessionArray[userIndex] = sessionObject
       // currentSessionArray = currentSessionArray.filter(elements => {return elements !== null;});
   
     const {error} = await supabasePharmacyClient
     .from('profiles')
     .update({ active_session: currentSessionArray })
     .eq('id', user.id)
   
     //if its the first time then array value will be null in which we just add this user as a first
     } else if (!active_session){
       console.log("AN AVTIVE ARRAY IS NOT FOUND")
       const {error} = await supabasePharmacyClient
     .from('profiles')
     .update({ active_session: [sessionObject] })
     .eq('id', user.id)
     } else return
  }

return {setSessionData}

}