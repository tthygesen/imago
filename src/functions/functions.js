import uuid from "uuid";
import validator from "validator";

export const newImageName = image => {
  let imageName = image.name;
  let mimeType = image.type;
  imageName = imageName.split(".");
  mimeType = mimeType.split("/")[1];
  imageName[0] = uuid.v4();
  imageName[1] = mimeType;
  imageName = imageName.join(".");
  return imageName;
};

export const checkFormError = form => {
  const errors = {};

  //Email
  if (validator.isEmpty(form.email)) {
    errors.email = "Please supply a email";
  }
  //for valid email uncommen
  /* if (validator.isEmail(form.email)) {
    errors.email = "Please supply a valid email";
  } */

  //Password
  if (!validator.isLength(form.password, { min: 6, max: 20 })) {
    errors.password = "Password must be over 5 characters";
  }
  if (validator.isEmpty(form.password)) {
    errors.password = "Please supply a password";
  }

  //Firstname
  if (validator.isEmpty(form.firstname)) {
    errors.firstname = "Please supply a firstname";
  }

  //Lastname
  if (validator.isEmpty(form.lastname)) {
    errors.lastname = "Please supply a lastname";
  }
  return errors;
};

export const loginFormError = form => {
  const errors = {};
  if (validator.isEmpty(form.email)) {
    errors.email = "Please supply a email";
  }

  if (validator.isEmpty(form.password)) {
    errors.password = "Please supply a password";
  }

  if (!validator.isLength(form.password, { min: 6, max: 20 })) {
    errors.password = "Password must be over 5 characters";
  }

  return errors;
};
