import React, { useState, useEffect } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { Dialog, DialogContent, DialogTitle, LinearProgress } from '@material-ui/core';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import XMLViewer from 'react-xml-viewer'
import JsonFormatter from 'react-json-formatter'
import { clearResponse, setSBOADataType, setSBOAGenerateData, setSBOAJsonResponeData, setSBOAXmlResponseData, setShowSBOADialog } from 'src/actions/reportAction';

const SBOMDialog = ({ reportName, projectId, report }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getResponseData('xml');
  }, []);

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' }
  }

  const getResponseData = async (dataType, generate) => {
    setLoading(true);
    const url = '/generate/sbom';
    const response = await Axios.post(url, {
      generate: generate == undefined ? report.generateData : generate,
      projectid: projectId,
      type: dataType,
      reportname: reportName
    });
    if (response.data) {
      setLoading(false)
    };
    if (dataType == 'xml') {
      dispatch(setSBOAXmlResponseData(response.data));
    } else {
      dispatch(setSBOAJsonResponeData(response.data));
    }
  };
  const handleClose = () => {
    dispatch(setShowSBOADialog(false));
    dispatch(clearResponse());
  };
  const onClickType = (dataType) => {
    dispatch(clearResponse());
    dispatch(setSBOAGenerateData('no'))
    getResponseData(dataType, 'no');
    dispatch(setSBOADataType(dataType))
  };
  const onClickGenerate = () => {
    dispatch(setSBOAGenerateData('yes'))
    getResponseData(report.dataType, 'yes');
  };
  const getLoader = () => {
    if (loading) {
      return <LinearProgress style={{ margin: '15px' }} />
    }
    return null;
  }

  return (
    <>
      <div>
        <Dialog
          open={report.showSBOADialog}
          contentStyle={{
            width: '80%',
          }}
          fullWidth={true}
          maxWidth={'md'}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <div>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Button variant="contained">CycloneDX</Button>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                  <Button
                    style={{ margin: '5px' }}
                    variant={'text'}
                    onClick={() => onClickGenerate()}
                  >
                    Generate
                  </Button>
                  <Button
                    style={{ margin: '5px' }}
                    variant={'text'}
                    onClick={() => handleClose()}
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{ margin: '5px' }}
                  variant={report.dataType == 'xml' ? "contained" : 'text'}
                  onClick={() => onClickType('xml')}
                >
                  XML
                </Button>
                <Button
                  style={{ margin: '5px' }}
                  variant={report.dataType == 'json' ? "contained" : 'text'}
                  onClick={() => onClickType('json')}
                >
                  JSON
                </Button>
              </div>
              {
                getLoader()
              }
            </div>
          </DialogTitle>
          <DialogContent  style={!loading ? {margin: " 15px", border: '2px solid black', borderRadius: '2px'}:{}}>
            <div>
              {
                report.dataType == 'xml' ? (
                  report.xmlResponseData.data ? (
                    <p>
                      <XMLViewer xml={report.xmlResponseData.data} />
                    </p>
                  ) : <>
                  </>
                ) : (
                  report.jsonResponseData.data ? (<p>
                    <JsonFormatter
                      json={JSON.stringify(report?.jsonResponseData?.data?.components)}
                      tabWith={4}
                      jsonStyle={jsonStyle} />
                  </p>) : <></>
                )
              }
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SBOMDialog;