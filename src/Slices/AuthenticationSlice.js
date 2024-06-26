import {createSlice} from '@reduxjs/toolkit';

const initialState={
    user:{
        firstName:'',
        lastName:'',
        uid:'',
        email:'',
        authenticating:false,
        authenticated:false,
        
    }
    
}

const AuthenticationSlice=createSlice({
    name:"LoginSignUp",
    initialState,
    reducers:{
        registerUser:(state,action)=>{
            console.log("signup request",state.user,action.payload)
            
        },
        registerUserSuccess:(state,action)=>{
            
            console.log("signup success",state.user)
        },
        loginUser:(state,action)=>{
            console.log("login request",state.user,action.payload)
            if(action.payload){
                const user={
                    firstName:'',
                    lastName:'',
                    uid:'',
                    email:'',
                    authenticating:true,
                    authenticated:false,
                    
                      
                }
                state={
                    ...state,
                    user:user,
                }
            }
            return state
        },
        loginUserSuccess:(state,action)=>{
            console.log("login success",action.payload)
            console.log("before",state)
            
            const user={
                firstName:action.payload.firstName,
                lastName:action.payload.lastName,
                uid:action.payload.uid,
                email:action.payload.email,
                authenticating:false,
                authenticated:true,  
                
            }
            state={
                ...state,
                user:user,
            }
            console.log("after",state,state.user)
            
            return state

            
        },
        logoutUser:(state,action)=>{
            console.log("logout request")
        },
        logoutUserSuccess:(state,action)=>{
            state={
                ...initialState,
            }
            console.log("logout success")
            return state
        },
}})


export const {registerUser,loginUser,registerUserSuccess,loginUserSuccess,logoutUserSuccess,logoutUser}=AuthenticationSlice.actions
export default AuthenticationSlice.reducer

