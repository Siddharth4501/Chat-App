import React from 'react'
import {NavLink} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { logoutUser } from '../../Slices/AuthenticationSlice';
import './Header.css'
import {toast,Bounce} from 'react-toastify'

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  const dispatch=useDispatch()
  const data=useSelector(state=>state.auth)
  
  console.log(data)
  const UID=data.user.uid
  const userLogout=()=>{
    const response=dispatch(logoutUser(UID))
    if(response){
      LogoutSuccessToast()

    }
  }
  const LogoutSuccessToast=()=>{
    toast.success('Logout Successful!', {
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
    <Navbar expand="lg" className="" style={{backgroundColor:'rgba(72, 80, 87, 0.944)'}}>
      <Container fluid>
        <Navbar.Brand style={{marginRight:'2rem',color:'white'}}><b>Pseudo Chat</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to='/' style={{fontFamily:'sans-serif',color:'white',fontSize:'1.1rem'}}>
            {
              !data.user.authenticated?'':'Home'

            }
            </Nav.Link> 
            
          </Nav>
          <div className="navitem2">
            {
              !data.user.authenticated?'Welcome Guest ':`Welcome ${data.user.firstName}`

            }
          </div>
          {
            !data.user.authenticated?
            <>
              <NavLink to='/login' className="navlink_lgsu">Login</NavLink>
              <NavLink to='/register' className="navlink_lgsu">Sign Up</NavLink>
            </>:<NavLink onClick={userLogout} className="navlink">Logout</NavLink>
          }

        
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header