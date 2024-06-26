import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {initializeApp} from 'firebase/app';
import {Provider} from 'react-redux'
import store,{persistor} from '../src/Store/store.js'
import { getAuth } from 'firebase/auth';
import { PersistGate } from 'redux-persist/integration/react'
import {ToastContainer} from 'react-toastify'

const firebaseConfig = {
  apiKey: "AIzaSyDt7RfVTsM-huBg09t6zvg6B2UI3Dk_8Jk",
  authDomain: "chat-app-c7e1f.firebaseapp.com",
  projectId: "chat-app-c7e1f",
  storageBucket: "chat-app-c7e1f.appspot.com",
  messagingSenderId: "343564100396",
  appId: "1:343564100396:web:32cac9378e9dcbd4d4c289",
  measurementId: "G-1L4EJJ28RH"
};

const app=initializeApp(firebaseConfig);
const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  

)
