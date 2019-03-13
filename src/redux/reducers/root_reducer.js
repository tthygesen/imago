import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

//Reducers
import auth_reducer from "./auth_reducer";
import images_reducer from "./images_reducer";
import profile_reducer from "./profile_reducer";
import loading_reducer from "./loading_reducer";

const rootReducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: auth_reducer,
  images: images_reducer,
  profile: profile_reducer,
  loading: loading_reducer
});

export default rootReducers;
