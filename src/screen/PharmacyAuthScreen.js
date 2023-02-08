import React, {useRef} from 'react'
import { useLogin } from '../Hooks'
import { supabasePharmacyClient, supabaseUserClient } from '../supabase/auth'

function PharmacyAuthScreen() {
const pharmaceCodeRef = useRef()
const passwordRef = useRef()
const {error, loading, login} = useLogin(supabasePharmacyClient)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const code = e.target[0].value + '@live.co.uk' //need to change this to internal url choice .pharmEx.co.uk
    const password = e.target[1].value

    login(code, password)
  }

  // supabaseUserClient.auth.signUp(
  //   {
  //     email: 'gennesisweb@gmail.com',
  //     password: 'example-password',
  //   },
  //   {
  //     data: {
  //       first_name: 'dispenser3',
  //       age: 27,
  //     }
  //   }
  // ).then((res) => console.log(res))



  return (
    <>
    <h1>PharmEx Organisation Sign In</h1>
    <div>PharmacyAuthScreen</div>
    {error && <div style={errorStyle}><p style={{color:'red'}}>{error}</p></div>}
    <form onSubmit={handleFormSubmit}>
      <input value={pharmaceCodeRef.current} placeholder='enter pharmacy code' name='code' style={inputStyle}/>
      <input value={passwordRef.current} placeholder='password' name='password' style={inputStyle}/>
      <button type='submit' style={buttonStyle} disabled={loading}>{loading ? 'loading..' : 'submit' }</button>
    </form>
    </> 
  )
}

const inputStyle = {width:'100%', padding:'10px', fontSize:'20px', marginTop:'10px'}
const buttonStyle = {width:'100%', padding:'10px', fontSize:'20px', marginTop:'10px',  cursor:'pointer'}
const errorStyle = {backgroundColor:'pink', padding:'0px 10px', border:'solid', borderColor:'red', maxWidth:'400px' }

export {PharmacyAuthScreen}