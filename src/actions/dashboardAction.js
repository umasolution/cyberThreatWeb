export const SET_DASHBOARD_RESPONSE_DATA = '@dashboard/set-dashboard-response-data';
export const SET_PRODUCT_SUMMARY = '@dashboard/set-product-summary';

export function setDashboardResponseData(details) {
    return (dispatch) => dispatch({
        type: SET_DASHBOARD_RESPONSE_DATA,
        payload: details
    });
};
