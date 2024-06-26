import { all } from 'redux-saga/effects';

import authenticationSaga from './authenticationSaga';

import allUsersSaga from './allUsersSaga';

export default function* rootSaga() {
    yield all([
        authenticationSaga(),
        allUsersSaga(),
    ]);
}