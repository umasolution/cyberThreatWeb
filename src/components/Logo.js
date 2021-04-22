import React from 'react';
import Badge from '@material-ui/core/Badge';

function Logo(props) {
  return (
  	<Badge className="logo-beta" badgeContent="Beta" color="primary" >
	  <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
    />
	</Badge>		
    
  );
}

export default Logo;
