
export const SET_PRODUCT_TYPE = '@license/set-product-type';
export const SET_SUBSCRIPTION_MESSAGE = '@licens/set-subscription-message';
export const SET_SUBSCRIPTION_STATUS = '@licens/set-subscription-status';
export const SET_LICENSE_MESSAGE = '@licens/set-license-message';
export const SET_LICENSE_DETAILS = '@license/set-license-details';

export function setProductType(details) {
    return (dispatch) => dispatch({
      type: SET_PRODUCT_TYPE,
      payload: {
        details
      }
    });
  }

  export function setSubscriptionMessage(details) {
    return (dispatch) => dispatch({
      type: SET_SUBSCRIPTION_MESSAGE,
      payload: {
        details
      }
    });
  }

  export function setSubscriptionStatus(details) {
    return (dispatch) => dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: {
        details
      }
    });
  }

  export function setLicenseMessage(details) {
    return (dispatch) => dispatch({
      type: SET_LICENSE_MESSAGE,
      payload: {
        details
      }
    });
  }

  export function setLicenseDetails(details) {
    return {
      type: SET_LICENSE_DETAILS,
      payload: {
        details
      }
    };
  }
  