import React, {useState, useRef} from 'react'
import { supabaseUserClient } from '../supabase/auth';


export function LoginCard({name, lastIn,  refreshToken}) {
    const [isHover, setIsHover] = useState(false);
    const [clicked, setClicked] = useState(false)
    const passwordRef = useRef()

    const handleMouseEnter = () => {
        setIsHover(true);
        
     };
     const handleMouseLeave = () => {
        setIsHover(false);
       
     };

const handleLogin = () => {
    console.log("hi")
    // async function handleLoginAsyn(){
    //     console.log(passwordRef.current)
    //     const { user, session, error } = await supabaseUserClient.authsignInWithPassword({
    //         email: name,
    //         password: passwordRef.current,
    //       })
    //  }
    //  handleLoginAsyn()
     return null
}

  return (
    <div style={{border:'solid'}} onBlur={()=>setClicked(false)}>
        {clicked ? (
            <div style={{display:'flex' }}>
            <div style={{flex:'4', flexDirection:'row', display:'flex', cursor:'pointer',  }} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} >
                    <div style={{display:'flex', flex:'2', justifyContent:'center', alignItems:'center', position:'relative', backgroundColor: isHover ? '#54225F' : '#36225F',}}>
                        <input  
                        onSubmit={()=>handleLogin()} 
                        autoFocus 
                         value={passwordRef.current}
                                style={{
                            width:'350px',
                            height:'90px',
                            fontSize:'50px',
                          
                        }}/>
                    </div>
                    <div style={{display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', padding:'0px 20px 0px 2px', backgroundColor: isHover ? '#54225F' : '#36225F',}}>
                        <img style={{marginBottom:'0px', width:'80px', borderRadius:'50%'}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg" alt="Card image cap"/>
                        
                    </div>
                    
            </div>
            <div onClick={handleLogin} style={{flex:'1', alignItems:'center', justifyContent:'center', alignItems:'center', justifyItems:'center', display:'flex', padding:'0px  20px 00px 20px', color:'#BE596A'
        , backgroundColor: isHover ? '#54225F' : '#36225F', cursor:'pointer'}}>
                    <p>Go</p>
            </div>
    </div>
        ) : (
            <div style={{display:'flex' }}>
                <div style={{flex:'4', flexDirection:'row', display:'flex', cursor:'pointer',  }} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={()=>setClicked(true)} >
                        <div style={{display:'flex', flex:'2', justifyContent:'center', alignItems:'center', position:'relative', padding:'0px  50px 0px 40px', backgroundColor: isHover ? '#54225F' : '#36225F',}}>
                            <p>{name ? name : 'username'}</p>
                            <p style={{fontSize:'12px',  position:'absolute', bottom:'2px', }}>{lastIn?lastIn:'last In 20m ago'}</p>
                        </div>
                        <div style={{display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', padding:'0px 20px 0px 2px', backgroundColor: isHover ? '#54225F' : '#36225F',}}>
                            <img style={{marginBottom:'0px', width:'80px', borderRadius:'50%'}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg" alt="Card image cap"/>
                            
                        </div>
                        
                </div>
                <div style={{flex:'1', alignItems:'center', justifyContent:'center', alignItems:'center', justifyItems:'center', display:'flex', padding:'0px  20px 00px 20px', color:'#BE596A'
            , backgroundColor: isHover ? '#54225F' : '#36225F', cursor:'pointer'}}>
                        <p>X</p>
                </div>
        </div>
        )}
  </div>
  )
}

