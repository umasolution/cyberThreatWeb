import React from "react";
import Snackbar from '@material-ui/core/Snackbar';

 const MySnackbar = ({ snackbarOpen, snackbarMessage, closeSnackbar }) => {

    return (
        <Snackbar
          anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
          open={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        />
    );

}

export default MySnackbar;