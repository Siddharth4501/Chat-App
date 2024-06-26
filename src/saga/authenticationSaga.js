import {takeEvery,put,call} from 'redux-saga/effects'
import { registerUser,registerUserSuccess,loginUser,loginUserSuccess,logoutUser,logoutUserSuccess} from '../Slices/AuthenticationSlice'
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { getFirestore,collection,addDoc, updateDoc,doc,getDocs,query,where} from 'firebase/firestore';



function* signUp(action){
    const firestore=getFirestore()
    const db=firestore
    const auth=getAuth()
    const {email,password,firstName,lastName}=action.payload.user
    console.log(email,password,firstName,lastName)
    const data=yield call(createUserWithEmailAndPassword,auth,email,password)
    console.log(data)
    const currentUser=yield auth.currentUser;
    console.log(currentUser,"cnddnih")
    const name=yield `${firstName} ${lastName}`
    console.log(name)
    yield updateProfile(data.user, { displayName: name });
    
    const dataSet=yield {
        firstName:firstName,
        lastName:lastName,
        uid:data.user.uid,
        createdAt:new Date(),
        isOnline:false
    }
    yield doc(collection(db,'users'),data.user.uid)
    
    yield addDoc(collection(db,'users'),dataSet)
        
    yield console.log("logged in successfully");
            
    const user={
        email,password
    }
    
    if(action.payload.callback){
        action.payload.callback(null,user);
    }
    yield put(registerUserSuccess(user));
}

function* signIn(action){
    
    try{
        const firestore=getFirestore()
        const db=getFirestore()
        const auth=getAuth()
        const { email,password }=action.payload.user
        console.log(email,password)
        const data=yield call(signInWithEmailAndPassword,auth,email,password)
        console.log(data)
        const userQuery = yield query(collection(firestore, 'users'), where('uid', '==', data.user.uid));
        
        console.log(userQuery)
        
        const userDoc = yield getDocs(userQuery);
        console.log(userDoc,'frfeee')
        const userDataRef =yield userDoc.docs[0];
        console.log(userDataRef.data(), "ririr");
        
        const Ref=yield userDataRef.ref
        yield updateDoc(Ref,{isOnline:true})
        const name=yield data.user.auth.currentUser.displayName.split(" ")
        const firstName= yield name[0];
        const lastName=yield name[1];
        const loggedInUser=yield {
            firstName,
            lastName,
            uid:data.user.uid,
            email:data.user.email
        }
        
        if(action.payload.callback){
            action.payload.callback(null,loggedInUser);
        }
        yield localStorage.setItem('user',JSON.stringify(loggedInUser))
        yield put(loginUserSuccess(loggedInUser));
    }
    catch(error){
        if(action.payload.callback){
            action.payload.callback(error,null);
        }
    }
}

function* logOut(action){
    const UID=action.payload
    console.log(action.payload)
    const firestore=getFirestore()
    // const auth=getAuth()
    yield localStorage.removeItem('user')
    // yield call([auth, auth.signOut]);
    const userQuery = yield query(collection(firestore, 'users'), where('uid', '==', UID));
    
    console.log(userQuery)
    
    const userDoc = yield getDocs(userQuery);
    console.log(userDoc,'frfeee')
    const userDataRef =yield userDoc.docs[0];
    console.log(userDataRef.data(), "ririr");
    
    const Ref=yield userDataRef.ref
    yield updateDoc(Ref,{isOnline:false})
    console.log(userDataRef.data(), "epepepep");
    yield put(logoutUserSuccess());
}

function* authenticationSaga(){
    
    yield takeEvery(registerUser.type,signUp)
    yield takeEvery(loginUser.type,signIn)
    yield takeEvery(logoutUser.type,logOut)
}

export default authenticationSaga;

