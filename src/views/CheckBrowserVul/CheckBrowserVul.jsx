import React, { useEffect, useState } from 'react';
import MySnackbar from 'src/Shared/Snackbar/MySnackbar';
import { browserName, fullBrowserVersion } from 'react-device-detect';
import axios from 'src/utils/axios';
import './CheckBrowserVul.css';
import { Divider } from '@material-ui/core';

const CheckBrowserVul = () => {

  const [snackBar, setSnackBar] = useState({ open: true, msg: 'Checking Browser Vulnerability' });
  const [browserData, setBrowserData] = useState(null);

  useEffect(async () => {
    try {
      console.log(browserName, fullBrowserVersion);
      const response = await axios.post('http://cyberthreatinfo.ca/api/checkBrowserVul', {
        browserName,
        fullBrowserVersion
      });
      console.log(response);
      setBrowserData(response.data);
      setSnackBar({
        open: true,
        msg: 'Success'
      });
    } catch (error) {
      setSnackBar({
        open: true,
        msg: 'Failed to check vunerability'
      })
      setBrowserData([
        {
          Vulnerability: 'yes'
        },
        {
          'Developed By': 'Haresh'
        }
      ]);
    }


  }, []);


  return (
    <div className="container">
      <MySnackbar snackbarOpen={snackBar.open} snackbarMessage={snackBar.msg} />
      {
        browserData ?
          browserData.map(data => {
            return (
              <div style={{margin: '10px'}}>
                <h6 className="details-header">
                  {Object.keys(data)[0]}
                </h6>
                {data[Object.keys(data)[0]]}
                <Divider />
              </div>
            )

          })
          : null
      }
    </div>
  );
};

export default CheckBrowserVul;