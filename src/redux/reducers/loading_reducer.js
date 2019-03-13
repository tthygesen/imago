const initState = {
  isLoading: false
};
const loading_reducer = (state = initState, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "ISNOT_LOADING":
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loading_reducer;
