import {  useState } from 'react'
import { useOrgContext } from './contextConsumers'


export function useLogin(supabaseClient) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {dispatch} = useOrgContext()




    const login = async (email, password) => {
        try {
            setError(null)
            setLoading(true)
           const {data, error} = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
              })
            if (error) throw error
            console.log(data.session, data.user)
            // when authenticated get profile table and set to global state
            supabaseClient.from("profiles").select("*").eq("id", data.user.id).single().then((res)=>{
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
return {error, loading, login}
}

