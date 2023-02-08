import {  useState } from 'react'
import { useUserContext } from './contextConsumers'
import { supabaseUserClient } from '../supabase/auth'



export function useLoginUser() {
    const [loginUserError, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {dispatch} = useUserContext()




    const login = async (email, password) => {
        try {
            setError(null)
            setLoading(true)
           const {data, error} = await supabaseUserClient.auth.signInWithPassword({
                email: email,
                password: password,
              })
            if (error) throw error
            console.log(data.session, data.user)
            // when authenticated get profile table and set to global state
           supabaseUserClient.from("profiles").select("*").eq("id", data.user.id).single().then((res)=>{
                dispatch({type: 'SETPROFILE', payload:res.data})
            })
            //dispatch login
            dispatch({type: 'LOGIN', payload:data})
            


          } catch (error) {
            setError(error.error_description || error.message)
            console.log(error.error_description || error.message)
          } finally {
            setLoading(false)
          }
    }
return {loginUserError, loading, login}
}

