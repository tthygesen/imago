import { newImageName } from "../../functions/functions";

//Read all users images
export const getImages = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //Get images from database
    const firestore = getFirestore();
    const collection = await firestore.collection("imageUrls");

    //Do the query
    const documentRef = await collection.doc(id);
    const document = await documentRef.get().catch(err => {
      dispatch({ type: "GETDATA_ERROR", payload: err });
    });
    if (document.exists) {
      const data = document.data();
      const imagesArray = data.urls;
      dispatch({ type: "GET_IMAGES", payload: imagesArray });
    }
  };
};

//Create/upload an image
export const uploadImage = (id, image) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //Upload images from database
    const firebase = getFirebase();
    const firestore = getFirestore();
    let { images } = getState().images;

    //give image a uniqe name
    const newImage = await newImageName(image);

    //Initializie the storage in your firebase/firestore database
    const storageRef = await firebase.storage().ref(`${id}/${newImage}`);

    //Save the image to the folder where you wanna store the images
    //I called my folder in storage the same as the users' id
    //In put() you want to to put the image file / image object
    const uploadTask = await storageRef.put(image).catch(err => {
      console.log(err);
    });

    //get the url for picutre
    const downloadURL = await uploadTask.ref.getDownloadURL();
    const imageInfo = {
      imageName: newImage,
      imageUrl: downloadURL
    };
    images = images.concat([imageInfo]);

    //Pick collection
    const collection = await firestore.collection("imageUrls");

    //Do the query
    const documentRef = await collection.doc(id);
    await documentRef
      .set({
        urls: images
      })
      .catch(err => {
        dispatch({ type: "UPLOAD_ERROR", payload: err });
      });

    //Dispatch success with the new array
    dispatch({ type: "UPLOAD_SUCCESS", payload: images });
    dispatch({ type: "ISNOT_LOADING" });
  };
};

export const emptyImagesArray = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT_SUCCESS" });
  };
};

//Delete image
export const deleteImage = (item, index) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const { images } = getState().images;
    const { uid } = getState().firebase.auth;

    const storageRef = firebase.storage().ref();

    //Filter out the element the user want to delete
    let newImageArray = await images.filter(image => {
      return image.imageUrl !== item.imageUrl;
    });

    //Find the image from STORAGE the user want to delete
    const imageRef = await storageRef.child(`${uid}/${item.imageName}`);

    //Delete image from the STORAGE
    imageRef.delete().catch(err => {
      console.log(err);
      dispatch({ type: "DELETE_ERROR", payload: err });
    });

    //Pick collection from DATABASE
    const collection = await firestore.collection("imageUrls");

    //Do the query for the user image URLS
    const documentRef = await collection.doc(uid);
    await documentRef
      .set({
        urls: newImageArray
      })
      .catch(err => {
        dispatch({ type: "UPLOAD_ERROR", payload: err });
      });

    dispatch({ type: "DELETE_IMAGE", payload: newImageArray });
  };
};

export const successReset = () => {
  return (dispatch, getState) => {
    dispatch({ type: "SUCCESS_RESET" });
  };
};

//Update image
export const updateImage = (image, index) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    /* //Initialize firebase and firestore
    const firebase = getFirebase();
    const firestore = getFirestore();

    //Get state
    const state = getState();
    const { uid } = state.firebase.auth;
    const { images } = state.images;
    console.log(images);

    //Finde the right image
    let the_image = "";
    await images.forEach(image => {
      const imageIndex = images.indexOf(image);
      if (imageIndex === index) {
        the_image = image;
      }
    });

    //Initialize refrence to storage
    const storageRef = firebase.storage().ref();

    //#1 Delete images from storage
    const imageRef = await storageRef.child(`${uid}/${the_image.imageName}`);
    console.log(imageRef);

    //#2 Create array without the deletede image and uploade it

    //Everything went good
    const newImageArray = [];
    dispatch({ type: "UPDATE_SUCCESS", palyolad: newImageArray }); */
  };
};
