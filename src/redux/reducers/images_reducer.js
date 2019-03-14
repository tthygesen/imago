const initState = {
  images: [],
  isLoading: false,
  success: false,
  errors: {}
};
const images_reducer = (state = initState, action) => {
  switch (action.type) {
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        images: action.payload,
        success: true
      };
    case "GET_IMAGES":
      return {
        ...state,
        images: action.payload
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: action.payload
      };
    case "IMAGES_RESET":
      return {
        ...state,
        images: []
      };
    case "SUCCESS_RESET":
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default images_reducer;
