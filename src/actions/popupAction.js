export const UPDATE_POPUP_DETAILS = '@account/update-popup-details';
export const SET_OPEN_POPUP = '@account/set-open-popup';
export const ENABLE_POPUP = '@account/enable-popup';
export const SET_CLOSE_BETWEEN_PAGES = '@account/set-close-between-pages';

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

  export function enablePopup(details) {
    return (dispatch) => dispatch({
      type: ENABLE_POPUP,
      payload: {
        details
      }
    });
  }

  export function closeBetweenPages(details) {
    return (dispatch) => dispatch({
      type: SET_CLOSE_BETWEEN_PAGES,
      payload: {
        details
      }
    });
  }