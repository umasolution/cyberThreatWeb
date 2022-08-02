import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/assets/css/prism.css';
import 'src/mixins/chartjs';
import 'src/mixins/prismjs';
import 'src/mock';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'src/serviceWorker';
import { SettingsProvider } from 'src/context/SettingsContext';
import { configureStore } from 'src/store';
import { restoreSettings } from 'src/utils/settings';
import App from 'src/App';
import Axios from 'axios';


enableES5();
export const baseURL=window._env_.API_URL
export const licenseURL= 'http://199.66.93.17/api/'
  Axios.defaults.baseURL=window._env_.API_URL;
// Axios.defaults.baseURL= 'http://34.134.61.199:9182/api'
 //Axios.defaults.baseURL= 'http://35.226.233.71:9182/api'
/*export const baseURL='http://niahsecurity.online:9182/api'*/
/*  Axios.defaults.baseURL= 'http://Niahsecurity.online:9182/api';*/
/*Axios.defaults.baseURL = 'http://cyberthreatinfo.ca:9182/api';*/
/*Axios.defaults.baseURL = 'https://niah.smartcodders.com:9182/';*/

const store = configureStore();
const settings = restoreSettings();

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider settings={settings}>
      <App />
    </SettingsProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
