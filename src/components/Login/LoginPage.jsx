import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { loginUser } from '../../Slices/AuthenticationSlice'
import { Navigate,NavLink} from 'react-router-dom'
import './LoginPage.css'
import {toast,Bounce} from 'react-toastify'


const LoginPage=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [authenticating,setAuthenticating]=useState(false)
    const dispatch=useDispatch()
    const data=useSelector(state=>state.auth)
   
    
    

    const signInUser=(e)=>{
        e.preventDefault();
        const user={
        email,password
        }
        setAuthenticating(true)
        dispatch(loginUser({user,callback:(error,d1)=>{
          if(d1){
            signinSuccessToast()
            setEmail('')
            setPassword('')
            setAuthenticating(false)
            console.log("moye moye",d1)
          }
          else{
            console.log(`${error} occurred`)
            setAuthenticating(false)
            signinErrorToast();
            
          }
        }}))
        
           
        
        
        
    }

    const signinSuccessToast=()=>{
      toast.success('Sign In Successful!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    const signinErrorToast=()=>{
      toast.error('Invalid Credentials', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    

    return(
    <>
      {
        !authenticating? 
        <section className="signinpg">
        <center>
          <div className="LoginInFormContainer">
            <h2>Sign In</h2>
            <form onSubmit={signInUser} className='form'>
              <div className="email">
                <div className="emailTag cmn_item1">
                  <label htmlFor="email">Email:</label>
                </div>
                <div className="emmailInput cnm_item2">
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
              </div>
              
              <br />
              <div className="password">
                <div className="passwordTag cmn_item1">
                  <label htmlFor="password">Password:</label>
                </div>
                <div className="passwordInput">
                  <input type="password" name="password cmn_item2" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
              </div>
              
              
              <br />
              <div className="buttons">
                <div className="submitbtn">
                  <button type="submit">Submit</button>
                </div>
                <br />
                <div className="signupbtn">
                  Doesn't Have An Acoount? <NavLink to="/register" className="signupbtnlink">Signup</NavLink>
                </div>
              </div>
              
            </form>
          </div>
        </center>
      </section>
      :
      <div className="preloader"></div>
      
      }
      {
        !data.user.authenticated?'':<Navigate to="/"/>
      }
      
    </>
    )
}

export default LoginPage
