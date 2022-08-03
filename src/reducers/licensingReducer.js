import produce from 'immer';
import {
    SET_LICENSE_DETAILS,
    SET_LICENSE_MESSAGE,
    SET_PRODUCT_TYPE,
    SET_SUBSCRIPTION_MESSAGE,
    SET_SUBSCRIPTION_STATUS
} from 'src/actions/licensingAction';

const initialState = {
    subscriptionStatus: false,
    productType: '',
    subscriptionMsg: {},
    licenseMsg: {},
    isLicense: false,
    licenseDetails: {}
}


const licensingReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT_TYPE: {
            const { details } = action.payload;

            return produce(state, (license) => {
                license.productType = details;
            });
        }

        case SET_SUBSCRIPTION_MESSAGE: {
            const { details } = action.payload;

            return produce(state, (license) => {
                license.subscriptionMsg = details;
            });
        }

        case SET_SUBSCRIPTION_STATUS: {
            const { details } = action.payload;

            return produce(state, (license) => {
                license.subscriptionStatus = details;
            });
        }

        case SET_LICENSE_MESSAGE: {
            const { details } = action.payload;

            return produce(state, (license) => {
                license.licenseMsg = details;
            });
        }

        case SET_LICENSE_DETAILS: {
            const { details } = action.payload;

            return produce(state, (license) => {
                license.licenseDetails = details;
            });
        }

        default: {
            return state;
        }
    }
};

export default licensingReducer;
