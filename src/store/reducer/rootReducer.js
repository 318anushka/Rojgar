import authReducer from './authReducer'
import { combineReducers } from 'redux'
import jobReducer from './jobReducer';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer