import { SET_CLOSE_BETWEEN_PAGES, ENABLE_POPUP, SET_OPEN_POPUP, UPDATE_POPUP_DETAILS } from "src/actions/popupAction";
import produce from 'immer';

const initialState = {
    details: {},
    open: false,
    enable: true,
    close: false
}


const popupReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_POPUP_DETAILS: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.details = details;
            });
        }

        case SET_OPEN_POPUP: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.open = details;
            });
        }

        case ENABLE_POPUP: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.enable = details;
            });
        }

        case SET_CLOSE_BETWEEN_PAGES: {
            const { details } = action.payload;

            return produce(state, (draft) => {
                draft.close = details;
            });
        }

        default: {
            return state;
        }
    }
};

export default popupReducer;
