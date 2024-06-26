import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../Slices/AuthenticationSlice";
import createSagaMiddleware from 'redux-saga'
import authenticationSaga from '../saga/authenticationSaga'
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';
import allUsersSaga from "../saga/allUsersSaga";
import usersSlice from "../Slices/usersSlice";
import rootSaga from "../saga/rootSaga";
// import persistReducer from 'redux-persist/es/persistReducer';

const sagaMiddleware=createSagaMiddleware();

const rootReducer=combineReducers({
    auth:AuthenticationSlice,
    users:usersSlice,
})

const persistConfig={
    key:'root',
    storage,
};
const persistedReducer =persistReducer(persistConfig,rootReducer)
const store=configureStore({
    reducer:persistedReducer,
    middleware:()=>[sagaMiddleware]
})



sagaMiddleware.run(rootSaga)

export const persistor=persistStore(store);

export default store