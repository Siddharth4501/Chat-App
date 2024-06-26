import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './HomePage.css'
import { allOnlineUsers,getRealTimeConversations,updateMessage } from '../../Slices/usersSlice'
import { Navigate } from 'react-router-dom'
import Search from '../Search/Search'


const HomePage = () => {
  
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message,setMessage]=useState('')
  const [userUid, setUserUid] = useState(null);
  const [filteredUsers,setFilteredUsers]=useState('')
  

  

  const dispatch=useDispatch()
  const data=useSelector(state=>state.auth)
  const users=useSelector(state=>state.users)
  
  
  const conversations=useSelector(state=>state.users)
  

  
  console.log(users,"om")

  useEffect(()=>{
    const UID=data.user.uid;
    dispatch(allOnlineUsers(UID))
  },[])

  useEffect(()=>{
    if(userUid!=null){
      console.log(userUid,'hhhhhhreeeewww')
      const myObj={
        my_uid:data.user.uid,
        friend_uid:userUid,
      }

      dispatch(getRealTimeConversations(myObj))
    }
  },[dispatch,userUid,message])

  const initChat=(user)=>{
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    console.log(user.uid,'hhhhhhreeeewww')
    
    setUserUid(user.uid);
    
    
  }

  
    
  

  const submitMessage=(e)=>{
    const msgObj = {
      my_uid: data.user.uid,
      friend_uid: userUid,
      message
    }


    if(message !== ""){
      const response=dispatch(updateMessage(msgObj))
      if(response){
        setMessage('')
        console.log("done",response)
      }
      
      
     
    }

    //console.log(msgObj);

    }

    
  const getSearchData=(data)=>{
      setFilteredUsers(data)
      console.log(filteredUsers,"shushu")
  }

  useEffect(()=>{
    console.log("goa");
    
  },[filteredUsers])

  return (
    <>
    {
      !data.user.authenticated?
      (<>
      <center><h1>Login First</h1></center>
      <Navigate to={'/login'}/></>
      )
      :
      (
      <div className="ChatPageContainer">
        <div className={`chat-app ${chatStarted ? 'user-selected' : ''}`}>
          <div className="ChatUsers">
            
            <Search data={getSearchData}/>
            {
              filteredUsers?
              filteredUsers.map((item,index)=>{
                return(
                  <>
                    <div className="wrapper" onClick={()=>initChat(item)} key={index} >
                      <div className="allUsers wrapper_cmn" >
                        {item}
                      </div>
                      <div className="wrapper_cmn">
                        <div className="online"></div>
                      </div>
                      
                    </div>
                  </>
                  
                )
              })
              :
              users.users.map((item,index)=>{
                return(
                  <>
                    <div className="wrapper" onClick={()=>initChat(item)} key={index} >
                      <div className="allUsers wrapper_cmn" >
                        {item.firstName}
                      </div>
                      <div className="wrapper_cmn">
                        <div className="online"></div>
                      </div>
                      
                    </div>
                  </>
                  
                )
              })
              
            }
          
            
          </div>
          <div className="ChatWindow">
            <div className="ChatWindowItems_cmn ChatWindowItem1"><center><h3>{chatStarted?chatUser:''}</h3></center></div>
            <div className="ChatWindowItems_cmn ChatWindowItem2">
              {
                chatStarted ?
                <div className="messages">
                  {
                  conversations.conversations.map((item)=>{
                  return(
                    <>
                      {
                      item.my_uid == data.user.uid ? (
                      
                      <div className='messages_together' style={{textAlign: 'right'}}  >
                        <div className="messages_of_messages_together">
                          <span style={{backgroundColor:'green',padding:'0.7rem 1rem 0.7rem 1rem',borderRadius:'50px',backgroundColor: 'cadetblue'}}>{item.message}</span>
                        </div>
                        
                      </div>
                      ):(
                      <div className='messages_together' style={{textAlign: 'left'}}  >
                        <div className="messages_of_messages_together">
                          <span style={{backgroundColor:'green',padding:'0.7rem 1rem 0.7rem 1rem',borderRadius:'50px',backgroundColor: 'cadetblue'}}>{item.message}</span>
                          
                        </div>
                        
                      </div>
                      )}

                    
                    </>
                  
                  )
                })}
                </div>
                :
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh',flexWrap:'wrap'}}>
                  <center><h1>Start Conversation</h1></center>
                </div>
              }
                

            </div>
            <div className="ChatWindowItems_cmn ChatWindowItem3">
              {
                  chatStarted ? 
                  <div className="chatControls">
                    <div className="chatControlsItem1">
                      <textarea 
                        className="chat_textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write Message"/>
                    </div>
                    <div className="chatControlsItem2">
                      <button onClick={submitMessage} className="chatsendbtn">Send</button>
                    </div>
                    
                    
                </div> : null
                }
              
          
            </div>
          </div>
        </div>
        
      </div>
      )
    }
    
    </>
  )
}
    
  

export default HomePage