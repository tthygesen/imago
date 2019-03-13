import { checkFormError, loginFormError } from "../../functions/functions";
import _ from "lodash";

export const logIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const errors = loginFormError(credentials);
    if (!_.isEmpty(errors)) {
      return dispatch({ type: "FORM_ERROR", payload: errors });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "LOGIN_ERROR", payload: err });
        });
    }
  };
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      });
  };
};

export const signUp = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    //Check for errors
    const errors = await checkFormError(user);
    if (!_.isEmpty(errors)) {
      return dispatch({ type: "FORM_ERROR", payload: errors });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            name: user.firstname,
            lastname: user.lastname,
            initials: user.firstname[0] + user.lastname[0]
          });
      })
      .then(dispatch({ type: "SIGNUP_SUCCESS" }))
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", payload: err });
      });
  };
};
