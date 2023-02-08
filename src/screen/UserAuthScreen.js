import React, { useState, useRef } from 'react'
import { useLogin, useLogOut } from '../Hooks'
import { supabasePharmacyClient } from '../supabase/auth'
import { useOrgContext } from '../Hooks'
import { useLoginUser } from '../Hooks/useLoginUser'
import { LoginCard } from '../components'

function UserAuthScreen() {
  const {logout, error} = useLogOut(supabasePharmacyClient, useOrgContext)
  const [newlogin, setNewLogin] = useState(false)
  const {profileData} = useOrgContext()
  const emailRef = useRef()
  const passwordRef = useRef()
  const {loginUserError, login} = useLoginUser()
  const activeSessions = profileData?.data?.active_session
  const [loading, setLoading] = useState(true)


  console.log(activeSessions)

 function handleLogoutOfOrg(e){
    e.preventDefault()
    logout()
  }

  // console.log(profileData)
function handleLogin(e){
e.preventDefault()
const email = e.target[0].value
const password = e.target[1].value
login(email, password)

}
if(!profileData){
  return <p>loading...</p>
}
  return (
    <>
    <div>You are signed into <span style={{color:'grey'}}>{profileData?.data.organisation_name}</span></div>
    {newlogin ? <h5>already logged in ?<span style={{color:'#596CBE', cursor:'pointer'}} onClick={()=>setNewLogin(!newlogin)}> select account</span></h5> : (
    <>
    <h5>pick a user account or <span style={{color:'#596CBE', cursor:'pointer'}} onClick={()=>setNewLogin(!newlogin)}>log in</span></h5>
    {activeSessions.map((session, index)=>{
      return (
        <LoginCard key={index} name={session.email} lastIn={session.lastIn} refreshToken={session.rToken}/>
      )
    })}
    </>
    )}
    {newlogin && (
      <div>
        <form  style={style.form} onSubmit={handleLogin}>
  <div style={{...style.container,}}>
    <label  style={{float:'left'}}><b>Email Address</b></label>
    <input type="text" value={emailRef.current} placeholder="Enter Email" name="uname" required style={style.input} />

    <label  style={{float:'left'}}><b>Password</b></label>
    <input  value={passwordRef.current} placeholder="Enter Password" name="psw" required style={style.input}/>
    <button type="submit" style={style.button1} >Login</button>
      <div style={{display:'flex', flexDirection:'row'}}>
      <label>
        <input type="checkbox" checked="checked" name="remember" onChange={()=>{console.log("checkbox")}} style={{}}/> 
        remeber me</label>
      </div>
  </div>

  <div  style={{...style.container, backgroundColor:'#f1f1f1', display:'flex', justifyContent:'space-between'}}>
    <button type="button" style={style.cancelbtn}>Cancel</button>
    <span style={style.spanPsw}>Forgot password?</span>
  </div>
</form>
        <p style={{fontSize:'20px'}}>don't have an account ? <span style={{color:'#596CBE', cursor:'pointer'}}>create account</span></p>
      </div>
    )}
     <div>UserAuthScreen</div>
     {error && <div>{error}</div>}
     <button onClick={handleLogoutOfOrg}>LogOut of Organisation</button>
    </> 
  )
}


const style = {
  form : {
    border: '3px solid #f1f1f1'
  },
  
  /* Full-width inputs */
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  
  /* Set a style for all buttons */
  button1: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%'
  },
  
  /* Add a hover effect for buttons */
  button: {
    opacity: '0.8'
  },
  
  /* Extra style for the cancel button (red) */
  cancelbtn: {
    width: 'auto',
    padding: '10px 18px',
    backgroundColor: '#f44336',
  },
  
  /* Center the avatar image inside this container */
  imgcontainer: {
    textAlign: 'center',
    margin: '24px 0 12px 0'
  },
  
  /* Avatar image */
  avatar: {
    width: '40%',
    borderRadius: '50%'
  },
  
  /* Add padding to containers */
  container: {
    padding: '16px',
  },
  
  /* The "Forgot password" text */
  spanPsw: {
    float: 'right',
    paddingTop: '16px',
    color: '#596CBE'
  }
  
  /* Change styles for span and cancel button on extra small screens */
  // @media screen and (max-width: 300px) {
  //   span.psw {
  //     display: block;
  //     float: none;
  //   }
  //   .cancelbtn {
  //     width: 100%;
  //   }
  // }
}

export {UserAuthScreen}