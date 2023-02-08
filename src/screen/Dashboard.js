import React, { useEffect, useMemo, useState } from 'react'
import { supabaseUserClient, supabasePharmacyClient } from '../supabase/auth'
import { useOrgContext, useLogOut, useUserContext } from '../Hooks'
import { useAddUserToSession } from '../functions/addUserToSession'



function Dashboard() {
const [data, setData] = useState()
const [loading, setLoading] = useState(true)
const {orgData:{user}} = useOrgContext()
const {logout} = useLogOut(supabaseUserClient, useUserContext)
const {userSession, userProfile} = useUserContext()
const {setSessionData} = useAddUserToSession()



useEffect(()=>{ 
setSessionData()
console.log("DASHBOARD", data)
},[loading])

function handleLogout(){
 logout()
}
  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard