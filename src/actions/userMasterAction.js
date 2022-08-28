export const SET_MASTER_USERS_LIST = '@user/set-master-users-list';
export const OPEN_RESET_PASSWORD = '@user/open-reset-password';
export const OPEN_REGISTER_USER = '@user/open-register-user';
export const UPDATE_DELETED_USER = '@user/update-deleted-user';
export const UPDATE_REGISTERD_USER = '@user/update-registered-user';


export function setMasterUsersList(details) {
    return (dispatch) => dispatch({
        type: SET_MASTER_USERS_LIST,
        payload: {
            details
        }
    });
}

export function openResetPassword(details) {
    return (dispatch) => dispatch({
        type: OPEN_RESET_PASSWORD,
        payload: {
            details
        }
    });
}

export function openRegisterUser(details) {
    return (dispatch) => dispatch({
        type: OPEN_REGISTER_USER,
        payload: {
            details
        }
    });
}

export function updateDeletedUser(details) {
    return (dispatch) => dispatch({
        type: UPDATE_DELETED_USER,
        payload: {
            details
        }
    });
}

export function updateRegisteredUser(details) {
    return (dispatch) => dispatch({
        type: UPDATE_REGISTERD_USER,
        payload: {
            details
        }
    })
}