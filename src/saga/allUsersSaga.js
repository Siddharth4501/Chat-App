import {takeEvery,put,call} from 'redux-saga/effects'
import {allOnlineUsers,allOnlineUsersSuccess, getRealTimeConversations, updateMessage, updateMessageSuccess,realTimeConversationsSuccess} from '../Slices/usersSlice'
import { collection, onSnapshot,getFirestore,doc,addDoc, orderBy,where,getDocs,query} from "firebase/firestore";
import {getAuth} from "firebase/auth"


// const RJD=(querySnapshot,UID)=> {
//     const realTimeUsers = [];
//     console.log(querySnapshot,"hulll")
//     querySnapshot.forEach(function(doc) {
//         if(doc.data().uid != UID && doc.data().isOnline == true){
//             realTimeUsers.push(doc.data())
//         }
        
//     });
    
//     console.log(realTimeUsers,"loomdd");
//     return realTimeUsers
    
//     }

const fetchRealTimeUsers = (db, UID) => {
    return new Promise((resolve, reject) => {
        const wholeData = collection(db, 'users');
        const unsubscribe = onSnapshot(wholeData, (querySnapshot) => {
            const realTimeUsers = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().uid !== UID && doc.data().isOnline) {
                    realTimeUsers.push(doc.data());
                }
            });
            resolve(realTimeUsers);
        }, (error) => {
            reject(error);
        });

        
        return () => unsubscribe();
    });
};

function* onlineUsers(action){
    
    const db=getFirestore()
    const UID=action.payload
    console.log(UID)
    const allrealTimeUsers =yield call(fetchRealTimeUsers,db,UID);
    console.log(allrealTimeUsers,"hin")
    yield put(allOnlineUsersSuccess(allrealTimeUsers));
    
    
}

function* saveMessage(action){
    console.log("I am here")
    const firestore=getFirestore()
    const db=firestore
    const auth=getAuth()
    const {my_uid,friend_uid,message}=action.payload
    console.log(my_uid,friend_uid,message)

    
    const myObj=yield {
        my_uid:my_uid,
        friend_uid:friend_uid,
        message:message,
        createdAt:new Date(),
        isView:false
    }
    yield doc(collection(db,'conversations'),my_uid)
    
    yield addDoc(collection(db,'conversations'),myObj)
        
    yield console.log("message saved successfully");
            
    const response=yield "Message updated succesfully"
    
    yield put(updateMessageSuccess(response));


    
}

const getAllOneToOneMessages=(messageQuery,my_uid,friend_uid)=>{
    return new Promise((resolve, reject) => {
        console.log("nepo")
        const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
            console.log("hello guys")
            const conversations = [];
            querySnapshot.forEach((doc) => {
                console.log("docyard",doc.data())
                if(
                    
                    (doc.data().my_uid == my_uid && doc.data().friend_uid == friend_uid)
                    || 
                    (doc.data().my_uid == friend_uid && doc.data().friend_uid == my_uid)
                ){
                    
                    conversations.push(doc.data())

                    
                }
            });
            resolve(conversations);
        }, (error) => {
            reject(error);
        });

        
        return () => unsubscribe();
    });
}

function* realTimeConversations(action){
    const {my_uid,friend_uid}=action.payload
    console.log(my_uid,friend_uid);
    const db=getFirestore()
    const messageQuery = yield query(collection(db, 'conversations'), where('my_uid', 'in',[my_uid,friend_uid]),orderBy('createdAt','asc'));
    console.log("dubba",messageQuery)
    
    const allOneToOneMessages =yield call(getAllOneToOneMessages,messageQuery,my_uid,friend_uid);
    console.log(allOneToOneMessages,"owwlw,,,");
    yield put(realTimeConversationsSuccess(allOneToOneMessages));
}
function* allUsersSaga(){
    
    yield takeEvery(allOnlineUsers.type,onlineUsers)
    yield takeEvery(updateMessage.type,saveMessage)
    yield takeEvery(getRealTimeConversations.type,realTimeConversations)
    
}

export default allUsersSaga;