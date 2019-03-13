export const deleteAccount = password => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { uid, email } = getState().firebase.auth;
    const { images } = getState().images;

    //Reauthenticate user before deleting (firabse require this)
    //Delete the account
    const user = await firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    user
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(async () => {
        //Delete user document from database
        await firestore
          .collection("users")
          .doc(uid)
          .delete()
          .catch(err => {
            return dispatch({ type: "DELETE_ERROR", payload: err });
          });

        //Delete the document with all the image URLs
        await firestore
          .collection("imageUrls")
          .doc(uid)
          .delete()
          .catch(err => {
            return dispatch({ type: "DELETE_ERROR", payload: err });
          });

        //Delete images from storage
        //When there is no files left in the folder firebase will delete the folder by it self
        const storageRef = await firebase.storage().ref();
        await images.forEach(async item => {
          const imageRef = storageRef.child(`${uid}/${item.imageName}`);
          await imageRef.delete().catch(err => {
            return dispatch({ type: "DELETE_ERROR", payload: err });
          });
        });

        //User account
        await user.delete().catch(err => {
          dispatch({ type: "DELETE_ERROR", payload: err });
        });

        dispatch({ type: "DELETE_SUCCESS" });
      })
      .catch(err => {
        return dispatch({ type: "DELETE_ERROR", payload: err });
      });
  };
};

export const resetError = () => {
  return (dispatch, getState) => {
    dispatch({ type: "ERROR_RESET" });
  };
};
