import {createSlice} from '@reduxjs/toolkit'

const usersSlice=createSlice({
    name:'allUsers',
    initialState:[],
    reducers:{
        allOnlineUsers:(state,action)=>{
            console.log("fetch online users request",state,action.payload)
            
        },
        allOnlineUsersSuccess:(state,action)=>{
            console.log("fetch online users success",state)
            state={
                ...state,
                users:action.payload
            }
            console.log(state.users)
            return state
        
        },
        updateMessage:(state,action)=>{
            console.log("update message request",action.payload);
            return state
        },
        updateMessageSuccess:(state,action)=>{
            console.log("updateMessageSuccess",action.payload);
            return state
        },

        getRealTimeConversations:(state,action)=>{
            console.log("fetch message request")
        },
        realTimeConversationsSuccess:(state,action)=>{
            console.log("fetch message success",action.payload)
            state={
                ...state,
                conversations:action.payload
            }
            return state
        }
    }
})

export const {allOnlineUsers,allOnlineUsersSuccess,updateMessage,updateMessageSuccess,getRealTimeConversations,realTimeConversationsSuccess}=usersSlice.actions

export default usersSlice.reducer