/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
    OPEN_REGISTER_USER,
    OPEN_RESET_PASSWORD,
    SET_MASTER_USERS_LIST,
    UPDATE_DELETED_USER,
    UPDATE_REGISTERD_USER
} from 'src/actions/userMasterAction';

const initialState = {
    masterUsersList: {},
    reset: false,
    registerUser: false,
    updateDeletedUser: false,
    updateRegisteredUser: false
};

const userMasterReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_MASTER_USERS_LIST: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.masterUsersList = details;
            });
        }

        case OPEN_RESET_PASSWORD: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.reset = details;
            });
        }

        case OPEN_REGISTER_USER: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.registerUser = details;
            });
        }

        case UPDATE_DELETED_USER: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.updateDeletedUser = details;
            });
        }

        case UPDATE_REGISTERD_USER: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.updateRegisteredUser = details;
            });
        }

        default: {
            return state;
        }
    }
};

export default userMasterReducer;
