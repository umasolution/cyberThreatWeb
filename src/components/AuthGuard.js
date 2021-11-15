import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import authService from 'src/services/authService';


function AuthGuard({ children }) {
  const account = useSelector((state) => state.account);
  const query = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  // Github

  if(window.location.pathname === "/app/reports/dashboard" &&
      window.location.search.indexOf('token') !== -1){

        authService.setSession(query.get('token'));

        if(Object.keys(query).length > 0 && query.get('user')){
          authService.setUserName(query.get('user'));
          dispatch({
            type: "@account/login-success",
            payload: {
              user :  query.get('user')
            }
          });
        }else{
          authService.setUserName("GIT_USER");
          dispatch({
            type: "@account/login-success",
            payload: {
              user :  "GIT_USER"
            }
          });
        }

        return children;
  }

  if (!account.user || account.user === null) {
    return <Redirect to="/login" />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
