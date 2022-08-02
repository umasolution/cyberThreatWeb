/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  UPDATE_PROFILE,
  IS_ADMIN,
  UPDATE_PROFILE_DETAILS
} from 'src/actions/accountActions';

const initialState = {
  user: null,
  isAdmin: 'no',
  profileDetails :[]
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        draft.user = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case IS_ADMIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.isAdmin = user;
      });
    }

    case UPDATE_PROFILE_DETAILS: {
      const { details } = action.payload;

      return produce(state, (draft) => {
        draft.profileDetails = details;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
