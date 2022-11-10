import {
    SET_DASHBOARD_RESPONSE_DATA,
} from 'src/actions/dashboardAction';

const initialState = {
    dashboardResponseData: {},
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_RESPONSE_DATA :
            return {...state, dashboardResponseData: action.payload}
        default: {
            return state;
        }
    }
};

export default dashboardReducer;
