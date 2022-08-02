// import axios from 'src/utils/axios';
import axios from 'axios';
import authService from 'src/services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const REGISTER_SUCCESS = '@account/register-success';
export const REGISTER_FAILURE = '@account/register-failure';
export const UPDATE_PROFILE = '@account/update-profile';
export const IS_ADMIN = '@account/is-admin';
export const UPDATE_PROFILE_DETAILS = '@account/update-profile-details';

export function login(email, password) {
  return async (dispatch) => {
    // try {
    dispatch({ type: LOGIN_REQUEST });

    const user = await authService.loginWithEmailAndPassword(email, password)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user
      }
    });
    /* .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          response
        }
      });
    }).catch(error => {
      dispatch({ type: LOGIN_FAILURE });
    throw error;
    }); */


    /* } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    } */
  };
}

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}

export function logout() {
  return async (dispatch) => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register(values) {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER });

      const user = await authService.registerUser(values);

      dispatch({
        type: REGISTER_SUCCESS,
      });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE });
      throw error;
    }
  };
}


export function updateProfile(update) {

  return async (dispatch) => {
    await axios.post('/getProfile/general/update', { ...update });
    dispatch({
      type: UPDATE_PROFILE,
      payload: { user: authService.getUserName() }
    })
  };
}

export function updateNotifications(update) {
  return async (dispatch) => {
    await axios.post('/getProfile/notification/update', { ...update });
    dispatch({
      type: UPDATE_PROFILE,
      payload: { user: authService.getUserName() }
    })

  };
}

export function updatePassword_old(update) {

  return async (dispatch) => {
    await axios.post('/profile/security/edit', { passWord: update.password,oldPassword: update.oldPassword, emailAdd: authService.getUserName() });
    dispatch({
      type: UPDATE_PROFILE,
      payload: { user: authService.getUserName() }
    })
  };
}
export function updatePassword(update) {

  return async (dispatch) => {
    await axios.post('/profile/password/update', { updated_password: update.password,current_password: update.oldPassword });
    dispatch({
      type: UPDATE_PROFILE,
      payload: { user: authService.getUserName() }
    })
  };
}
export function setIsAdmin(user) {
  return (dispatch) => dispatch({
    type: IS_ADMIN,
    payload: {
      user
    }
  });
}

export function updateProfileDetails(details) {
  return (dispatch) => dispatch({
    type: UPDATE_PROFILE_DETAILS,
    payload: {
      details
    }
  });
}