const initState = {
  error: {}
};

const profile_reducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_SUCCESS":
      //console.log("account deleted");
      return state;
    case "DELETE_ERROR":
      return {
        ...state,
        error: "The password may not be correct"
      };
    case "ERROR_RESET":
      return {
        ...state,
        error: {}
      };

    default:
      return state;
  }
};

export default profile_reducer;
