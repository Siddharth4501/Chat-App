import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../Slices/AuthenticationSlice'
import './RegisterPage.css'
import { NavLink } from 'react-router-dom'
import {toast,Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RegisterPage = () => {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [empty,setEmpty]=useState(true)
  const [finputError,setFInputError]=useState('')
  const [correctFInput,setCorrectFInput]=useState('')
  const [linputError,setLInputError]=useState('')
  const [correctLInput,setCorrectLInput]=useState('')
  const [einputError,setEInputError]=useState('')
  const [correctEInput,setCorrectEInput]=useState('')
  const [pinputError,setPInputError]=useState('')
  const [correctPInput,setCorrectPInput]=useState('')
  const [signup_processing,setSignupProcessing]=useState(false)

  const dispatch=useDispatch()
  useEffect(()=>{
    console.log("input error handling")
  },[linputError,pinputError,einputError,finputError,correctFInput,correctLInput,correctEInput,correctPInput,firstName,lastName,email,password,empty])

  const handleFirstName=(e)=>{
    e.preventDefault()
    if(e.target.value.length==0)
      {
        setEmpty(true)
        setFirstName('')
        setFInputError('')
        setCorrectFInput('')
      }
    else{
      setEmpty(false)
      if(e.target.value.length <5){
        setFirstName(e.target.value)
        setFInputError("Length of First Name can't be  less than 5")
        setCorrectFInput('')
        
      }
      else if(e.target.value.length==0){
        setFirstName('')
        setFInputError('')
        setCorrectFInput('')
      }
  
      else{
        setFInputError('')
        setCorrectFInput('Correct')
        setFirstName(e.target.value)
      }
    }
    
    
  }
  const handleLastName=(e)=>{
    e.preventDefault()
    if(e.target.value.length==0)
      {
        setEmpty(true)
        setLastName('')
        setLInputError('')
        setCorrectLInput('')
      }
    else{
      setEmpty(false)
      if(e.target.value.length <5){
        setLastName(e.target.value)
        setLInputError("Length of Last Name can't be  less than 5")
        setCorrectLInput('')
        
      }
      else if(e.target.value.length==0){
        setLastName('')
        setFInputError('')
        setCorrectLInput('')
      }
  
      else{
        setLInputError('')
        setCorrectLInput('Correct')
        setLastName(e.target.value)
      }
    }
    
    
  }

  const handlePassword=(e)=>{
    e.preventDefault()
    
    if(e.target.value.length<1 || e.target.value.length<8){
      setPassword(e.target.value)
      setPInputError("Length of Password can't be  less than 8")
      setCorrectPInput('')
      
    }
    else if(e.target.value.length==0){
      setPassword('')
      setPInputError('')
      setCorrectPInput('')
    }

    else{
      setPInputError('')
      setCorrectPInput('Correct')
      setPassword(e.target.value)
    }
    
  }

  const userRegistration=(e)=>{
    e.preventDefault();
    if(firstName.length<5 || lastName.length<5 ||password.length<5){
      signupErrorToast()
    }
    else{
      const user={
        firstName,lastName,email,password
      }
      setSignupProcessing(true)
      dispatch(registerUser({user,callback:(error,d1)=>{
        if(d1){
          signupSuccessToast()
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setSignupProcessing(false)
        }
        else{
          console.log(`${error} occurred`)
          setSignupProcessing(false)
          signupErrorToast()
        }
      }}))
    }
    
    
  }
  
  const signupSuccessToast=()=>{
    toast.success('Sign Up Successful!', {
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
  const signupErrorToast=()=>{
    toast.error('Please fill the required fields in correct format', {
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
  return (
    <>
    {
      !signup_processing?
        <section className="signuppg">
        <center>
          <div className={firstName?"RegisterFormCSSOnClick":"RegistrationFormContainer"}>
            <h2>Sign Up</h2>
            <form onSubmit={userRegistration} className='form_s'>
              <div className="firstName">
                <div className="firstNameTag cmn_item1">
                  <label htmlFor="fname">First Name:</label>
                </div>
                <div className="firstNameInput cmn_item2">
                  <input type="text" name="fname" value={firstName} onChange={handleFirstName} required />
                  
                </div>
                
              </div>
              {
                firstName && {finputError}?<p style={{color:'red',fontSize:'0.9rem'}}>{finputError}</p>:null
              
              }
              {
                firstName && {correctFInput}?<p style={{color:'green',fontSize:'0.9rem'}}>{correctFInput}</p>:null
              }
              <br style={{display: firstName?'none':'block' }}/>
              <div className="lastName">
                <div className="lastNameTag cmn_item1">
                  <label htmlFor="lname">Last Name:</label>
                </div>
                <div className="lastNameInput cmn_item2">
                  <input type="text" name="lname" value={lastName} onChange={handleLastName} required/>
                </div>
              </div>
              {
                lastName && {linputError}?<p style={{color:'red',fontSize:'0.9rem'}}>{linputError}</p>:null
                  
              }
              {
                lastName && {correctLInput}?<p style={{color:'green',fontSize:'0.9rem'}}>{correctLInput}</p>:null
              }
              <br style={{display: lastName?'none':'block' }} />
              <div className="email">
                <div className="emailTag cmn_item1">
                  <label htmlFor="email">Email:</label>
                </div>
                <div className="emailInput cmn_item2">
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
              </div>
              {
                email && {einputError}?<p style={{color:'red',fontSize:'0.9rem'}}>{einputError}</p>:null
                  
              }
              {
                email && {correctEInput}?<p style={{color:'green',fontSize:'0.9rem'}}>{correctEInput}</p>:null
              }
              <br style={{display: email?'none':'block' }} />
              <div className="password">
                <div className="passwordLabel cmn_item1">
                  <label htmlFor="password">Password:</label>
                </div>
                <div className="passwordInput cmn_item2">
                  <input type="password" name="password" value={password} onChange={handlePassword} required/>
                </div>
              </div>
              {
                password && {pinputError}?<p style={{color:'red',fontSize:'0.9rem'}}>{pinputError}</p>:null
                  
              }
              {
                password && {correctPInput}?<p style={{color:'green',fontSize:'0.9rem'}}>{correctPInput}</p>:null
              }
              <br  style={{display: password?'none':'block' }} />
              <div className="buttons">
                <div className="submitbtn">
                
                  <center>
                    <button type="submit">Submit</button>
                  </center>
                </div>
                <br />
                <div className="signinbtn">
                  <center><span>Already Signed Up? <NavLink to="/login" className="signinbtnlink">Login</NavLink></span></center>
                </div>
              </div>
              <br /><br />
              
            </form>
          </div>
        </center>
        
      </section>
      :
      <div className="preloader"></div>
      
    }
      
    </>
  )
}

export default RegisterPage