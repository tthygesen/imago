//Loading
export const isLoading = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "IS_LOADING" });
  };
};
//Loading
export const isNotLoading = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "ISNOT_LOADING" });
  };
};
