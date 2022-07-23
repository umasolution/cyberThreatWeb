export const UPDATE_POPUP_DETAILS = '@account/update-popup-details';
export const SET_OPEN_POPUP = '@account/set-open-popup';

export function setPopUpDetails(details) {
    return (dispatch) => dispatch({
      type: UPDATE_POPUP_DETAILS,
      payload: {
        details
      }
    });
  }

  export function setOpenPopup(details) {
    return (dispatch) => dispatch({
      type: SET_OPEN_POPUP,
      payload: {
        details
      }
    });
  }