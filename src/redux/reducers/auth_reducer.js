const initState = {
  authError: null,
  signupError: null,
  errors: {}
};
const auth_reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "login failed"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
        error: {}
      };
    case "LOGOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        signupError: null,
        error: {}
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        signupError: action.payload.message
      };
    case "FORM_ERROR":
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default auth_reducer;
