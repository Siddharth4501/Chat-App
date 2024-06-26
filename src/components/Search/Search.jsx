import React, { useEffect, useState } from 'react'
import './Search.css'
import { useSelector } from 'react-redux'



const Search = (props) => {
  const [onlineUsers,setOnlineUsers]=useState([])
  const [searchQuery,setSearchQuery]=useState('')
  const [filteredUsers,setFilteredUsers]=useState('')
  const users=useSelector(state=>state.users)
  const allOnlineUsers=()=>{
    let userArray=[]
    for(let i=0;i<users.users.length;i++){
      const user=users.users[i].firstName;
      console.log(user,"kam")
      userArray.push(user)
    }
      setOnlineUsers(userArray)
      console.log("snetyfdk",onlineUsers)
    }
  
  useEffect(()=>{
    allOnlineUsers()

  },[])


  

  

  const searchForParticularUser=(e)=>{
    if(e.target.value.length==0){
      setFilteredUsers('')
      setSearchQuery('')
    }
    else{
      setSearchQuery(e.target.value);
      
      
    }
      
      console.log("qwerty",searchQuery)
      
  }
  // useEffect(()=>{
  //   filteredResult()
  //   console.log("paw",filteredUsers)
    

  // },[searchQuery])

  // useEffect(()=>{
  //   props.data(filteredUsers)
  // },[searchQuery])
  
//   const filteredResult =()=>{
//     console.log("qwertyasdfghjkl",searchQuery)
  
//     const filteredItem=onlineUsers.filter((user) =>
//     user.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     setFilteredUsers(filteredItem)

// }

//use useEffect to update value of filtered items immendiately
useEffect(()=>{
  if(searchQuery){
    const filteredItem=onlineUsers.filter((user) =>
      user.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filteredItem)
      props.data(filteredUsers)
      console.log(filteredItem,"nananavanna")
  }
  else{
    console.log("no search data");
    props.data('')
    
  }
  
},[searchQuery,onlineUsers])

  return (
    <>
        <div className="searchBoxContainer">
            <input type="search" name="search" id="searchid" className='searchbox' placeholder='Search for a user' onChange={searchForParticularUser} />
        </div>
        
    </>
  )
}

export default Search