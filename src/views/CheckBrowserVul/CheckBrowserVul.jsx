import React, { useEffect, useState } from 'react';
import MySnackbar from 'src/Shared/Snackbar/MySnackbar';
import { browserName, fullBrowserVersion } from 'react-device-detect';
import './CheckBrowserVul.css';
import { Divider, Paper } from '@material-ui/core';
import Axios from 'axios';

const CheckBrowserVul = () => {

  const [snackBar, setSnackBar] = useState({ open: true, msg: 'Checking Browser Vulnerability' });
  const [browserData, setBrowserData] = useState([]);

  useEffect(() => {
    const check = async () => {
      try {
        console.log(browserName, fullBrowserVersion);
        const response = await Axios.post('/checkBrowserVul', {
          browserName,
          fullBrowserVersion
        });
        console.log(response);
        setBrowserData(response.data.data);
        setSnackBar({
          open: false,
        });
      } catch (error) {
        console.error(error);
        setSnackBar({
          open: true,
          msg: 'Failed to check vunerability'
        })
      }
    }
    check();


  }, []);


  return (
    <div className="container">
      <div style={{ margin: '10px' }}>
        <h5 className="details-header" style={{ fontSize: '18px', color: 'red' }}>
          Vulnerability of Browser - {browserName} Version - {fullBrowserVersion}
        </h5>
      </div>
      <MySnackbar snackbarOpen={snackBar.open} snackbarMessage={snackBar.msg} />
      {
        browserData.length > 0 ?
          browserData.map(data => {
            return (
              <Paper style={{ marginBottom: '10px', padding: '10px' }}>
                {
                  Object.keys(data).map(key => {
                    return (
                      <span style={{ margin: '10px' }}>
                        <h6 className="details-header">
                          {key}
                        </h6>
                        {data[key]}
                      </span>
                    )
                  })
                }

              </Paper>
            )

          })
          : null
      }
    </div>
  );
};

export default CheckBrowserVul;