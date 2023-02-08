import React, { useState } from 'react'
import { useOrgContext } from './contextConsumers'

export function useLogOut(supabase, context) {
const [error, setError] = useState()
const {dispatch} = context()

    const logout = async () => {
       const data = await supabase.auth.signOut()
    //    setError(error)
    dispatch({type: 'LOGOUT', payload:error})
    }
  return {logout, error }
}

