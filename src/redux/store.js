import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import root_reducer from "./reducers/root_reducer";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase_config from "../config/firebase";

const store = createStore(
  root_reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase_config),
    reactReduxFirebase(firebase_config, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// --- NOTE ---
//react-redux-firebase line 13.
// useFireStoreForProfile tells the system we want to sync the store with firebase users/profiles.
// userProfiles is for declaring what collection we want to use. mine is called 'users'.
//attachAuthIsReady tells the system not to load the application -
// - before firebase has cheked wether an user is present and authenticated or not.
