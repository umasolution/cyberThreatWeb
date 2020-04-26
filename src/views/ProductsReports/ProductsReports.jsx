import { Box, Container, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from 'src/services/authService';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import Issues from './Issues/Issues';
import ReportHeader from './ReportHeader/ReportHeader';
import JsonFiles from './JsonFiles/JsonFiles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './../Feed/TabPanel/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

const ProductsReports = () => {
    const classes = useStyles();

    const { reportName } = useParams();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [productReportResponse, setProductReportResponse] = useState();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };

    useEffect(() => {
        fetchProductsReports();
    }, [reportName]);

    const fetchProductsReports = async () => {
        try {
            setLoading(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = `http://cyberthreatinfo.ca/report/project/reportname`;
            const response = await Axios.post(url,{
                emailAdd: authService.getUserName(),
                reportName
            });
            setProductReportResponse(response.data);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoading(false);
        } catch (error) {
            const res = {
                "Issues": {
                  "package-lock.json": {
                    "CVE-2018-16487": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://hackerone.com/reports/380873|https://hackerone.com/reports/380873|MISC,https://security.netapp.com/advisory/ntap-20190919-0004/|https://security.netapp.com/advisory/ntap-20190919-0004/|CONFIRM",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.17.9": {
                          "Dependancy": [
                            [
                              "inquirer@1.2.3",
                              "typedoc@0.15.0"
                            ]
                          ],
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    },
                    "CVE-2019-1010266": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://github.com/lodash/lodash/issues/3359|https://github.com/lodash/lodash/issues/3359|MISC,https://github.com/lodash/lodash/wiki/Changelog|https://github.com/lodash/lodash/wiki/Changelog|CONFIRM,https://security.netapp.com/advisory/ntap-20190919-0004/|https://security.netapp.com/advisory/ntap-20190919-0004/|CONFIRM,https://snyk.io/vuln/SNYK-JS-LODASH-73639|https://snyk.io/vuln/SNYK-JS-LODASH-73639|MISC",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:S/C:N/I:N/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.17.9": {
                          "Dependancy": [
                            [
                              "inquirer@1.2.3",
                              "typedoc@0.15.0"
                            ]
                          ],
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    },
                    "CVE-2019-10744": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://access.redhat.com/errata/RHSA-2019:3024|RHSA-2019:3024|REDHAT,https://security.netapp.com/advisory/ntap-20191004-0005/|https://security.netapp.com/advisory/ntap-20191004-0005/|CONFIRM,https://snyk.io/vuln/SNYK-JS-LODASH-450202|https://snyk.io/vuln/SNYK-JS-LODASH-450202|CONFIRM,https://support.f5.com/csp/article/K47105354?utm_source=f5support&amp;utm_medium=RSS|https://support.f5.com/csp/article/K47105354?utm_source=f5support&amp;utm_medium=RSS|CONFIRM",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.17.9": {
                          "Dependancy": [
                            [
                              "inquirer@1.2.3",
                              "typedoc@0.15.0"
                            ]
                          ],
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    }
                  },
                  "package.json": {
                    "CVE-2018-16487": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://hackerone.com/reports/380873|https://hackerone.com/reports/380873|MISC,https://security.netapp.com/advisory/ntap-20190919-0004/|https://security.netapp.com/advisory/ntap-20190919-0004/|CONFIRM",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.15.0": {
                          "product": "lodash",
                          "version": "4.15.0"
                        },
                        "lodash#4.16.0": {
                          "product": "lodash",
                          "version": "4.16.0"
                        },
                        "lodash#4.16.1": {
                          "product": "lodash",
                          "version": "4.16.1"
                        },
                        "lodash#4.16.2": {
                          "product": "lodash",
                          "version": "4.16.2"
                        },
                        "lodash#4.16.3": {
                          "product": "lodash",
                          "version": "4.16.3"
                        },
                        "lodash#4.16.4": {
                          "product": "lodash",
                          "version": "4.16.4"
                        },
                        "lodash#4.16.5": {
                          "product": "lodash",
                          "version": "4.16.5"
                        },
                        "lodash#4.16.6": {
                          "product": "lodash",
                          "version": "4.16.6"
                        },
                        "lodash#4.17.0": {
                          "product": "lodash",
                          "version": "4.17.0"
                        },
                        "lodash#4.17.1": {
                          "product": "lodash",
                          "version": "4.17.1"
                        },
                        "lodash#4.17.10": {
                          "product": "lodash",
                          "version": "4.17.10"
                        },
                        "lodash#4.17.2": {
                          "product": "lodash",
                          "version": "4.17.2"
                        },
                        "lodash#4.17.3": {
                          "product": "lodash",
                          "version": "4.17.3"
                        },
                        "lodash#4.17.4": {
                          "product": "lodash",
                          "version": "4.17.4"
                        },
                        "lodash#4.17.5": {
                          "product": "lodash",
                          "version": "4.17.5"
                        },
                        "lodash#4.17.9": {
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    },
                    "CVE-2018-3721": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://github.com/lodash/lodash/commit/d8e069cc3410082e44eb18fcf8e7f3d08ebe1d4a|https://github.com/lodash/lodash/commit/d8e069cc3410082e44eb18fcf8e7f3d08ebe1d4a|MISC,https://hackerone.com/reports/310443|https://hackerone.com/reports/310443|MISC,https://security.netapp.com/advisory/ntap-20190919-0004/|https://security.netapp.com/advisory/ntap-20190919-0004/|CONFIRM",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:S/C:N/I:P/A:N",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.15.0": {
                          "product": "lodash",
                          "version": "4.15.0"
                        },
                        "lodash#4.16.0": {
                          "product": "lodash",
                          "version": "4.16.0"
                        },
                        "lodash#4.16.1": {
                          "product": "lodash",
                          "version": "4.16.1"
                        },
                        "lodash#4.16.2": {
                          "product": "lodash",
                          "version": "4.16.2"
                        },
                        "lodash#4.16.3": {
                          "product": "lodash",
                          "version": "4.16.3"
                        },
                        "lodash#4.16.4": {
                          "product": "lodash",
                          "version": "4.16.4"
                        },
                        "lodash#4.16.5": {
                          "product": "lodash",
                          "version": "4.16.5"
                        },
                        "lodash#4.16.6": {
                          "product": "lodash",
                          "version": "4.16.6"
                        },
                        "lodash#4.17.0": {
                          "product": "lodash",
                          "version": "4.17.0"
                        },
                        "lodash#4.17.1": {
                          "product": "lodash",
                          "version": "4.17.1"
                        },
                        "lodash#4.17.2": {
                          "product": "lodash",
                          "version": "4.17.2"
                        },
                        "lodash#4.17.3": {
                          "product": "lodash",
                          "version": "4.17.3"
                        },
                        "lodash#4.17.4": {
                          "product": "lodash",
                          "version": "4.17.4"
                        }
                      }
                    },
                    "CVE-2019-1010266": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://github.com/lodash/lodash/issues/3359|https://github.com/lodash/lodash/issues/3359|MISC,https://github.com/lodash/lodash/wiki/Changelog|https://github.com/lodash/lodash/wiki/Changelog|CONFIRM,https://security.netapp.com/advisory/ntap-20190919-0004/|https://security.netapp.com/advisory/ntap-20190919-0004/|CONFIRM,https://snyk.io/vuln/SNYK-JS-LODASH-73639|https://snyk.io/vuln/SNYK-JS-LODASH-73639|MISC",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:S/C:N/I:N/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.15.0": {
                          "product": "lodash",
                          "version": "4.15.0"
                        },
                        "lodash#4.16.0": {
                          "product": "lodash",
                          "version": "4.16.0"
                        },
                        "lodash#4.16.1": {
                          "product": "lodash",
                          "version": "4.16.1"
                        },
                        "lodash#4.16.2": {
                          "product": "lodash",
                          "version": "4.16.2"
                        },
                        "lodash#4.16.3": {
                          "product": "lodash",
                          "version": "4.16.3"
                        },
                        "lodash#4.16.4": {
                          "product": "lodash",
                          "version": "4.16.4"
                        },
                        "lodash#4.16.5": {
                          "product": "lodash",
                          "version": "4.16.5"
                        },
                        "lodash#4.16.6": {
                          "product": "lodash",
                          "version": "4.16.6"
                        },
                        "lodash#4.17.0": {
                          "product": "lodash",
                          "version": "4.17.0"
                        },
                        "lodash#4.17.1": {
                          "product": "lodash",
                          "version": "4.17.1"
                        },
                        "lodash#4.17.10": {
                          "product": "lodash",
                          "version": "4.17.10"
                        },
                        "lodash#4.17.2": {
                          "product": "lodash",
                          "version": "4.17.2"
                        },
                        "lodash#4.17.3": {
                          "product": "lodash",
                          "version": "4.17.3"
                        },
                        "lodash#4.17.4": {
                          "product": "lodash",
                          "version": "4.17.4"
                        },
                        "lodash#4.17.5": {
                          "product": "lodash",
                          "version": "4.17.5"
                        },
                        "lodash#4.17.9": {
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    },
                    "CVE-2019-10744": {
                      "header": {
                        "patch": "None",
                        "recommendation": "None",
                        "reference": "https://access.redhat.com/errata/RHSA-2019:3024|RHSA-2019:3024|REDHAT,https://security.netapp.com/advisory/ntap-20191004-0005/|https://security.netapp.com/advisory/ntap-20191004-0005/|CONFIRM,https://snyk.io/vuln/SNYK-JS-LODASH-450202|https://snyk.io/vuln/SNYK-JS-LODASH-450202|CONFIRM,https://support.f5.com/csp/article/K47105354?utm_source=f5support&amp;utm_medium=RSS|https://support.f5.com/csp/article/K47105354?utm_source=f5support&amp;utm_medium=RSS|CONFIRM",
                        "severity": "None",
                        "vectorString": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
                        "vuln_name": "None"
                      },
                      "modules": {
                        "lodash#4.15.0": {
                          "product": "lodash",
                          "version": "4.15.0"
                        },
                        "lodash#4.16.0": {
                          "product": "lodash",
                          "version": "4.16.0"
                        },
                        "lodash#4.16.1": {
                          "product": "lodash",
                          "version": "4.16.1"
                        },
                        "lodash#4.16.2": {
                          "product": "lodash",
                          "version": "4.16.2"
                        },
                        "lodash#4.16.3": {
                          "product": "lodash",
                          "version": "4.16.3"
                        },
                        "lodash#4.16.4": {
                          "product": "lodash",
                          "version": "4.16.4"
                        },
                        "lodash#4.16.5": {
                          "product": "lodash",
                          "version": "4.16.5"
                        },
                        "lodash#4.16.6": {
                          "product": "lodash",
                          "version": "4.16.6"
                        },
                        "lodash#4.17.0": {
                          "product": "lodash",
                          "version": "4.17.0"
                        },
                        "lodash#4.17.1": {
                          "product": "lodash",
                          "version": "4.17.1"
                        },
                        "lodash#4.17.10": {
                          "product": "lodash",
                          "version": "4.17.10"
                        },
                        "lodash#4.17.11": {
                          "product": "lodash",
                          "version": "4.17.11"
                        },
                        "lodash#4.17.2": {
                          "product": "lodash",
                          "version": "4.17.2"
                        },
                        "lodash#4.17.3": {
                          "product": "lodash",
                          "version": "4.17.3"
                        },
                        "lodash#4.17.4": {
                          "product": "lodash",
                          "version": "4.17.4"
                        },
                        "lodash#4.17.5": {
                          "product": "lodash",
                          "version": "4.17.5"
                        },
                        "lodash#4.17.9": {
                          "product": "lodash",
                          "version": "4.17.9"
                        }
                      }
                    }
                  },
                  "severity": {
                    "high": 0,
                    "low": 0,
                    "medium": 4
                  }
                },
                "header": {
                  "date": "25-04-2020_00:43:18",
                  "dependancies": 316,
                  "project": "InstagramDev",
                  "project owner": "Jayesh",
                  "repository": "",
                  "source type": "source",
                  "tested with": "package-lock.json,package.json",
                  "vulnerabilities found": 4,
                  "vulnerable dependencies": 1
                },
                "jsonFiles": {
                  "package-lock.json": {
                    "@babel/code-frame#7.0.0": {
                      "dependancy": []
                    },
                    "@babel/highlight#7.0.0": {
                      "dependancy": []
                    },
                    "@lifeomic/attempt#3.0.0": {
                      "dependancy": []
                    },
                    "@types/bluebird#3.5.26": {
                      "dependancy": []
                    },
                    "@types/caseless#0.12.2": {
                      "dependancy": []
                    },
                    "@types/chance#1.0.2": {
                      "dependancy": []
                    },
                    "@types/form-data#2.2.1": {
                      "dependancy": []
                    },
                    "@types/lodash#4.17.9": {
                      "dependancy": []
                    },
                    "@types/luxon#1.12.0": {
                      "dependancy": []
                    },
                    "@types/minimatch#3.0.3": {
                      "dependancy": []
                    },
                    "@types/node#10.14.5": {
                      "dependancy": []
                    },
                    "@types/request#2.48.1": {
                      "dependancy": []
                    },
                    "@types/request-promise#4.1.43": {
                      "dependancy": []
                    },
                    "@types/tough-cookie#2.3.5": {
                      "dependancy": []
                    },
                    "ajv#5.5.2": {
                      "dependancy": []
                    },
                    "ansi-escapes#1.4.0": {
                      "dependancy": []
                    },
                    "ansi-regex#2.1.1": {
                      "dependancy": []
                    },
                    "ansi-styles#2.2.1": {
                      "dependancy": []
                    },
                    "ansi-styles#3.2.1": {
                      "dependancy": [
                        "@babel/highlight@7.0.0",
                        "pretty-quick@1.10.0",
                        "tslint@5.16.0"
                      ]
                    },
                    "ansi-styles1#3.2.1": {
                      "dependancy": [
                        "@babel/highlight@7.0.0 > chalk@2.4.2"
                      ]
                    },
                    "arg#4.1.0": {
                      "dependancy": []
                    },
                    "argparse#1.0.10": {
                      "dependancy": []
                    },
                    "array-differ#2.1.0": {
                      "dependancy": []
                    },
                    "array-union#1.0.2": {
                      "dependancy": []
                    },
                    "array-uniq#1.0.3": {
                      "dependancy": []
                    },
                    "arrify#1.0.1": {
                      "dependancy": []
                    },
                    "asn1#0.2.4": {
                      "dependancy": []
                    },
                    "assert-plus#1.0.0": {
                      "dependancy": []
                    },
                    "asynckit#0.4.0": {
                      "dependancy": []
                    },
                    "aws-sign2#0.7.0": {
                      "dependancy": []
                    },
                    "aws4#1.8.0": {
                      "dependancy": []
                    },
                    "backbone#1.4.0": {
                      "dependancy": []
                    },
                    "balanced-match#1.0.0": {
                      "dependancy": []
                    },
                    "bcrypt-pbkdf#1.0.2": {
                      "dependancy": []
                    },
                    "bignumber.js#7.2.1": {
                      "dependancy": []
                    },
                    "bluebird#3.7.1": {
                      "dependancy": []
                    },
                    "brace-expansion#1.1.11": {
                      "dependancy": []
                    },
                    "buffer-from#1.1.1": {
                      "dependancy": []
                    },
                    "builtin-modules#1.1.1": {
                      "dependancy": []
                    },
                    "caller-callsite#2.0.0": {
                      "dependancy": []
                    },
                    "caller-path#2.0.0": {
                      "dependancy": []
                    },
                    "callsites#2.0.0": {
                      "dependancy": []
                    },
                    "caseless#0.12.0": {
                      "dependancy": []
                    },
                    "chalk#1.1.3": {
                      "dependancy": []
                    },
                    "chalk#2.4.2": {
                      "dependancy": [
                        "@babel/highlight@7.0.0",
                        "pretty-quick@1.10.0",
                        "tslint@5.16.0"
                      ]
                    },
                    "chance#1.0.18": {
                      "dependancy": []
                    },
                    "ci-info#2.0.0": {
                      "dependancy": []
                    },
                    "class-transformer#0.2.0": {
                      "dependancy": []
                    },
                    "cli-cursor#1.0.2": {
                      "dependancy": []
                    },
                    "cli-width#2.1.0": {
                      "dependancy": []
                    },
                    "co#4.6.0": {
                      "dependancy": []
                    },
                    "code-point-at#1.1.0": {
                      "dependancy": []
                    },
                    "color-convert#1.9.3": {
                      "dependancy": []
                    },
                    "color-name#1.1.3": {
                      "dependancy": []
                    },
                    "combined-stream#1.0.6": {
                      "dependancy": [
                        "form-data@2.3.2"
                      ]
                    },
                    "combined-stream#1.0.7": {
                      "dependancy": []
                    },
                    "commander#2.20.0": {
                      "dependancy": []
                    },
                    "commander#2.20.3": {
                      "dependancy": [
                        "uglify-js@3.6.9"
                      ]
                    },
                    "concat-map#0.0.1": {
                      "dependancy": []
                    },
                    "concat-stream#1.6.0": {
                      "dependancy": []
                    },
                    "core-util-is#1.0.2": {
                      "dependancy": []
                    },
                    "cosmiconfig#5.2.0": {
                      "dependancy": []
                    },
                    "cross-spawn#5.1.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "cross-spawn#6.0.5": {
                      "dependancy": [
                        "execa@1.0.0"
                      ]
                    },
                    "dashdash#1.14.1": {
                      "dependancy": []
                    },
                    "debug#4.1.1": {
                      "dependancy": []
                    },
                    "delayed-stream#1.0.0": {
                      "dependancy": []
                    },
                    "diff#3.5.0": {
                      "dependancy": []
                    },
                    "dotenv#6.2.0": {
                      "dependancy": []
                    },
                    "ecc-jsbn#0.1.2": {
                      "dependancy": []
                    },
                    "end-of-stream#1.4.1": {
                      "dependancy": []
                    },
                    "error-ex#1.3.2": {
                      "dependancy": []
                    },
                    "escape-string-regexp#1.0.5": {
                      "dependancy": []
                    },
                    "esprima#4.0.1": {
                      "dependancy": [
                        "js-yaml@3.13.1"
                      ]
                    },
                    "esutils#2.0.2": {
                      "dependancy": []
                    },
                    "execa#0.8.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "execa#1.0.0": {
                      "dependancy": []
                    },
                    "exit-hook#1.1.1": {
                      "dependancy": []
                    },
                    "extend#3.0.2": {
                      "dependancy": [
                        "request@2.88.0"
                      ]
                    },
                    "external-editor#1.1.1": {
                      "dependancy": []
                    },
                    "extsprintf#1.3.0": {
                      "dependancy": []
                    },
                    "fast-deep-equal#1.1.0": {
                      "dependancy": []
                    },
                    "fast-json-stable-stringify#2.0.0": {
                      "dependancy": []
                    },
                    "figures#1.7.0": {
                      "dependancy": []
                    },
                    "find-up#2.1.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "find-up#3.0.0": {
                      "dependancy": []
                    },
                    "forever-agent#0.6.1": {
                      "dependancy": []
                    },
                    "form-data#2.3.2": {
                      "dependancy": []
                    },
                    "fs-extra#8.1.0": {
                      "dependancy": []
                    },
                    "fs.realpath#1.0.0": {
                      "dependancy": []
                    },
                    "get-stdin#5.0.1": {
                      "dependancy": [
                        "json-ts@1.6.4"
                      ]
                    },
                    "get-stdin#6.0.0": {
                      "dependancy": []
                    },
                    "get-stream#3.0.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "get-stream#4.1.0": {
                      "dependancy": []
                    },
                    "getpass#0.1.7": {
                      "dependancy": []
                    },
                    "glob#7.1.2": {
                      "dependancy": []
                    },
                    "glob#7.1.3": {
                      "dependancy": [
                        "rimraf@2.6.3"
                      ]
                    },
                    "graceful-fs#4.2.2": {
                      "dependancy": []
                    },
                    "handlebars#4.5.3": {
                      "dependancy": []
                    },
                    "har-schema#2.0.0": {
                      "dependancy": []
                    },
                    "har-validator#5.1.0": {
                      "dependancy": []
                    },
                    "has-ansi#2.0.0": {
                      "dependancy": []
                    },
                    "has-flag#3.0.0": {
                      "dependancy": []
                    },
                    "highlight.js#9.15.10": {
                      "dependancy": []
                    },
                    "hosted-git-info#2.7.1": {
                      "dependancy": []
                    },
                    "http-signature#1.2.0": {
                      "dependancy": []
                    },
                    "husky#1.3.1": {
                      "dependancy": []
                    },
                    "ignore#3.3.10": {
                      "dependancy": []
                    },
                    "image-size#0.7.3": {
                      "dependancy": []
                    },
                    "immutable#3.8.2": {
                      "dependancy": []
                    },
                    "import-fresh#2.0.0": {
                      "dependancy": []
                    },
                    "inflight#1.0.6": {
                      "dependancy": []
                    },
                    "inherits#2.0.3": {
                      "dependancy": []
                    },
                    "inquirer#1.2.3": {
                      "dependancy": []
                    },
                    "interpret#1.2.0": {
                      "dependancy": []
                    },
                    "ip-regex#4.1.0": {
                      "dependancy": []
                    },
                    "is-arrayish#0.2.1": {
                      "dependancy": []
                    },
                    "is-ci#2.0.0": {
                      "dependancy": []
                    },
                    "is-directory#0.3.1": {
                      "dependancy": []
                    },
                    "is-fullwidth-code-point#1.0.0": {
                      "dependancy": []
                    },
                    "is-promise#2.1.0": {
                      "dependancy": []
                    },
                    "is-stream#1.1.0": {
                      "dependancy": []
                    },
                    "is-typedarray#1.0.0": {
                      "dependancy": []
                    },
                    "isarray#1.0.0": {
                      "dependancy": []
                    },
                    "isexe#2.0.0": {
                      "dependancy": []
                    },
                    "isstream#0.1.2": {
                      "dependancy": []
                    },
                    "jquery#3.4.1": {
                      "dependancy": []
                    },
                    "js-tokens#4.0.0": {
                      "dependancy": []
                    },
                    "js-yaml#3.13.1": {
                      "dependancy": []
                    },
                    "jsbn#0.1.1": {
                      "dependancy": []
                    },
                    "json-bigint#0.3.0": {
                      "dependancy": []
                    },
                    "json-parse-better-errors#1.0.2": {
                      "dependancy": []
                    },
                    "json-schema#0.2.3": {
                      "dependancy": []
                    },
                    "json-schema-traverse#0.3.1": {
                      "dependancy": []
                    },
                    "json-stringify-safe#5.0.1": {
                      "dependancy": []
                    },
                    "json-ts#1.6.4": {
                      "dependancy": []
                    },
                    "jsonfile#4.0.0": {
                      "dependancy": []
                    },
                    "jsprim#1.4.1": {
                      "dependancy": []
                    },
                    "locate-path#2.0.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "locate-path#3.0.0": {
                      "dependancy": []
                    },
                    "lock": "yes",
                    "lodash#4.17.9": {
                      "dependancy": [
                        "inquirer@1.2.3",
                        "typedoc@0.15.0"
                      ]
                    },
                    "lru-cache#4.1.3": {
                      "dependancy": []
                    },
                    "lunr#2.3.6": {
                      "dependancy": []
                    },
                    "luxon#1.12.1": {
                      "dependancy": []
                    },
                    "make-error#1.3.5": {
                      "dependancy": []
                    },
                    "map-obj#4.1.0": {
                      "dependancy": []
                    },
                    "marked#0.7.0": {
                      "dependancy": []
                    },
                    "mime-db#1.36.0": {
                      "dependancy": []
                    },
                    "mime-types#2.1.20": {
                      "dependancy": []
                    },
                    "minimatch#3.0.4": {
                      "dependancy": []
                    },
                    "minimist#0.0.8": {
                      "dependancy": []
                    },
                    "minimist#1.2.0": {
                      "dependancy": [
                        "json-ts@1.6.4"
                      ]
                    },
                    "mkdirp#0.5.1": {
                      "dependancy": []
                    },
                    "mri#1.1.4": {
                      "dependancy": []
                    },
                    "ms#2.1.2": {
                      "dependancy": []
                    },
                    "multimatch#3.0.0": {
                      "dependancy": []
                    },
                    "mute-stream#0.0.6": {
                      "dependancy": []
                    },
                    "needsquotes#1.0.0": {
                      "dependancy": []
                    },
                    "neo-async#2.6.1": {
                      "dependancy": []
                    },
                    "nice-try#1.0.5": {
                      "dependancy": []
                    },
                    "normalize-package-data#2.5.0": {
                      "dependancy": []
                    },
                    "npm-run-path#2.0.2": {
                      "dependancy": []
                    },
                    "number-is-nan#1.0.1": {
                      "dependancy": []
                    },
                    "oauth-sign#0.9.0": {
                      "dependancy": []
                    },
                    "object-assign#4.1.1": {
                      "dependancy": []
                    },
                    "once#1.4.0": {
                      "dependancy": []
                    },
                    "onetime#1.1.0": {
                      "dependancy": []
                    },
                    "optimist#0.6.1": {
                      "dependancy": []
                    },
                    "os-shim#0.1.3": {
                      "dependancy": []
                    },
                    "os-tmpdir#1.0.2": {
                      "dependancy": []
                    },
                    "p-finally#1.0.0": {
                      "dependancy": []
                    },
                    "p-limit#1.3.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "p-limit#2.2.0": {
                      "dependancy": []
                    },
                    "p-locate#2.0.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "p-locate#3.0.0": {
                      "dependancy": []
                    },
                    "p-try#1.0.0": {
                      "dependancy": [
                        "pretty-quick@1.10.0"
                      ]
                    },
                    "p-try#2.2.0": {
                      "dependancy": []
                    },
                    "parse-json#4.0.0": {
                      "dependancy": []
                    },
                    "path-exists#3.0.0": {
                      "dependancy": []
                    },
                    "path-is-absolute#1.0.1": {
                      "dependancy": []
                    },
                    "path-key#2.0.1": {
                      "dependancy": []
                    },
                    "path-parse#1.0.6": {
                      "dependancy": []
                    },
                    "performance-now#2.1.0": {
                      "dependancy": []
                    },
                    "pify#3.0.0": {
                      "dependancy": []
                    },
                    "pinkie#2.0.4": {
                      "dependancy": []
                    },
                    "pinkie-promise#2.0.1": {
                      "dependancy": []
                    },
                    "pkg-dir#3.0.0": {
                      "dependancy": []
                    },
                    "please-upgrade-node#3.1.1": {
                      "dependancy": []
                    },
                    "prettier#1.19.1": {
                      "dependancy": []
                    },
                    "pretty-quick#1.10.0": {
                      "dependancy": []
                    },
                    "process-nextick-args#1.0.7": {
                      "dependancy": []
                    },
                    "progress#2.0.3": {
                      "dependancy": []
                    },
                    "pseudomap#1.0.2": {
                      "dependancy": []
                    },
                    "psl#1.1.31": {
                      "dependancy": []
                    },
                    "pump#3.0.0": {
                      "dependancy": []
                    },
                    "punycode#1.4.1": {
                      "dependancy": [
                        "request@2.88.0"
                      ]
                    },
                    "punycode#2.1.1": {
                      "dependancy": []
                    },
                    "qs#6.5.2": {
                      "dependancy": []
                    },
                    "read-pkg#4.0.1": {
                      "dependancy": []
                    },
                    "readable-stream#2.3.3": {
                      "dependancy": []
                    },
                    "rechoir#0.6.2": {
                      "dependancy": []
                    },
                    "reflect-metadata#0.1.13": {
                      "dependancy": []
                    },
                    "request#2.88.0": {
                      "dependancy": []
                    },
                    "request-promise#4.2.4": {
                      "dependancy": []
                    },
                    "request-promise-core#1.1.2": {
                      "dependancy": []
                    },
                    "resolve#1.10.0": {
                      "dependancy": []
                    },
                    "resolve-from#3.0.0": {
                      "dependancy": []
                    },
                    "restore-cursor#1.0.1": {
                      "dependancy": []
                    },
                    "rimraf#2.6.3": {
                      "dependancy": []
                    },
                    "run-async#2.3.0": {
                      "dependancy": []
                    },
                    "run-node#1.0.0": {
                      "dependancy": []
                    },
                    "rx#4.1.0": {
                      "dependancy": []
                    },
                    "rxjs#6.5.2": {
                      "dependancy": []
                    },
                    "safe-buffer#5.1.1": {
                      "dependancy": []
                    },
                    "safe-buffer#5.1.2": {
                      "dependancy": [
                        "request@2.88.0"
                      ]
                    },
                    "safer-buffer#2.1.2": {
                      "dependancy": []
                    },
                    "semver#5.7.0": {
                      "dependancy": []
                    },
                    "semver-compare#1.0.0": {
                      "dependancy": []
                    },
                    "shebang-command#1.2.0": {
                      "dependancy": []
                    },
                    "shebang-regex#1.0.0": {
                      "dependancy": []
                    },
                    "shelljs#0.8.3": {
                      "dependancy": []
                    },
                    "signal-exit#3.0.2": {
                      "dependancy": []
                    },
                    "slash#2.0.0": {
                      "dependancy": []
                    },
                    "snakecase-keys#3.1.0": {
                      "dependancy": []
                    },
                    "source-map#0.6.1": {
                      "dependancy": []
                    },
                    "source-map-support#0.5.12": {
                      "dependancy": []
                    },
                    "spawn-sync#1.0.15": {
                      "dependancy": []
                    },
                    "spdx-correct#3.1.0": {
                      "dependancy": []
                    },
                    "spdx-exceptions#2.2.0": {
                      "dependancy": []
                    },
                    "spdx-expression-parse#3.0.0": {
                      "dependancy": []
                    },
                    "spdx-license-ids#3.0.3": {
                      "dependancy": []
                    },
                    "sprintf-js#1.0.3": {
                      "dependancy": [
                        "argparse@1.0.10"
                      ]
                    },
                    "sshpk#1.14.2": {
                      "dependancy": []
                    },
                    "stealthy-require#1.1.1": {
                      "dependancy": []
                    },
                    "string-width#1.0.2": {
                      "dependancy": []
                    },
                    "string_decoder#1.0.3": {
                      "dependancy": []
                    },
                    "strip-ansi#3.0.1": {
                      "dependancy": []
                    },
                    "strip-eof#1.0.0": {
                      "dependancy": []
                    },
                    "supports-color#2.0.0": {
                      "dependancy": []
                    },
                    "supports-color#5.5.0": {
                      "dependancy": [
                        "@babel/highlight@7.0.0",
                        "pretty-quick@1.10.0",
                        "tslint@5.16.0"
                      ]
                    },
                    "through#2.3.8": {
                      "dependancy": []
                    },
                    "tlds#1.203.1": {
                      "dependancy": []
                    },
                    "tmp#0.0.29": {
                      "dependancy": [
                        "external-editor@1.1.1"
                      ]
                    },
                    "to-no-case#1.0.2": {
                      "dependancy": []
                    },
                    "to-snake-case#1.0.0": {
                      "dependancy": []
                    },
                    "to-space-case#1.0.0": {
                      "dependancy": []
                    },
                    "tough-cookie#2.4.3": {
                      "dependancy": [
                        "request@2.88.0"
                      ]
                    },
                    "tough-cookie#2.5.0": {
                      "dependancy": []
                    },
                    "transducers-js#0.4.174": {
                      "dependancy": []
                    },
                    "ts-custom-error#2.2.2": {
                      "dependancy": []
                    },
                    "ts-node#8.1.0": {
                      "dependancy": []
                    },
                    "ts-xor#1.0.6": {
                      "dependancy": []
                    },
                    "tslib#1.9.3": {
                      "dependancy": []
                    },
                    "tslint#5.16.0": {
                      "dependancy": []
                    },
                    "tsutils#2.29.0": {
                      "dependancy": []
                    },
                    "tunnel-agent#0.6.0": {
                      "dependancy": []
                    },
                    "tweetnacl#0.14.5": {
                      "dependancy": []
                    },
                    "typedarray#0.0.6": {
                      "dependancy": []
                    },
                    "typedoc#0.15.0": {
                      "dependancy": []
                    },
                    "typedoc-default-themes#0.6.0": {
                      "dependancy": []
                    },
                    "typedoc-plugin-markdown#2.0.11": {
                      "dependancy": []
                    },
                    "typescript#2.9.2": {
                      "dependancy": [
                        "json-ts@1.6.4"
                      ]
                    },
                    "typescript#3.5.3": {
                      "dependancy": [
                        "typedoc@0.15.0"
                      ]
                    },
                    "typescript#3.7.2": {
                      "dependancy": []
                    },
                    "uglify-js#3.6.9": {
                      "dependancy": []
                    },
                    "underscore#1.9.1": {
                      "dependancy": []
                    },
                    "universalify#0.1.2": {
                      "dependancy": []
                    },
                    "url-regex#5.0.0": {
                      "dependancy": []
                    },
                    "util-deprecate#1.0.2": {
                      "dependancy": []
                    },
                    "utility-types#3.10.0": {
                      "dependancy": []
                    },
                    "uuid#3.3.2": {
                      "dependancy": []
                    },
                    "validate-npm-package-license#3.0.4": {
                      "dependancy": []
                    },
                    "verror#1.10.0": {
                      "dependancy": []
                    },
                    "which#1.3.0": {
                      "dependancy": []
                    },
                    "wordwrap#0.0.3": {
                      "dependancy": []
                    },
                    "wrappy#1.0.2": {
                      "dependancy": []
                    },
                    "yallist#2.1.2": {
                      "dependancy": []
                    },
                    "yn#3.1.0": {
                      "dependancy": []
                    }
                  },
                  "package.json": {
                    "dependencies": [
                      {
                        "product": "ts-xor",
                        "version": "^1.0.6"
                      },
                      {
                        "product": "json-bigint",
                        "version": "^0.3.0"
                      },
                      {
                        "product": "lodash",
                        "version": "^4.17.5"
                      },
                      {
                        "product": "luxon",
                        "version": "^1.12.1"
                      },
                      {
                        "product": "ts-custom-error",
                        "version": "^2.2.2"
                      },
                      {
                        "product": "utility-types",
                        "version": "^3.10.0"
                      },
                      {
                        "product": "bluebird",
                        "version": "^3.7.1"
                      },
                      {
                        "product": "chance",
                        "version": "^1.0.2"
                      },
                      {
                        "product": "request",
                        "version": "^2.88.0"
                      },
                      {
                        "product": "class-transformer",
                        "version": "^0.2.0"
                      },
                      {
                        "product": "request-promise",
                        "version": "^4.2.4"
                      },
                      {
                        "product": "image-size",
                        "version": "^0.7.3"
                      },
                      {
                        "product": "chance",
                        "version": "^1.0.18"
                      },
                      {
                        "product": "request-promise",
                        "version": "^4.1.43"
                      },
                      {
                        "product": "tough-cookie",
                        "version": "^2.5.0"
                      },
                      {
                        "product": "url-regex",
                        "version": "^5.0.0"
                      },
                      {
                        "product": "rxjs",
                        "version": "^6.5.2"
                      },
                      {
                        "product": "debug",
                        "version": "^4.1.1"
                      },
                      {
                        "product": "attempt",
                        "version": "^3.0.0"
                      },
                      {
                        "product": "snakecase-keys",
                        "version": "^3.1.0"
                      },
                      {
                        "product": "reflect-metadata",
                        "version": "^0.1.13"
                      }
                    ],
                    "devDependencies": [
                      {
                        "product": "pretty-quick",
                        "version": "^1.10.0"
                      },
                      {
                        "product": "ts-node",
                        "version": "^8.1.0"
                      },
                      {
                        "product": "lodash",
                        "version": "^4.14.123"
                      },
                      {
                        "product": "typedoc",
                        "version": "^0.15.0"
                      },
                      {
                        "product": "tslint",
                        "version": "^5.16.0"
                      },
                      {
                        "product": "bluebird",
                        "version": "^3.5.26"
                      },
                      {
                        "product": "luxon",
                        "version": "^1.12.0"
                      },
                      {
                        "product": "inquirer",
                        "version": "^1.1.2"
                      },
                      {
                        "product": "tough-cookie",
                        "version": "^2.3.5"
                      },
                      {
                        "product": "typedoc-plugin-markdown",
                        "version": "^2.0.11"
                      },
                      {
                        "product": "typescript",
                        "version": "^3.7.2"
                      },
                      {
                        "product": "prettier",
                        "version": "^1.19.1"
                      },
                      {
                        "product": "husky",
                        "version": "^1.3.1"
                      },
                      {
                        "product": "dotenv",
                        "version": "^6.2.0"
                      },
                      {
                        "product": "node",
                        "version": "^10.14.5"
                      },
                      {
                        "product": "rimraf",
                        "version": "^2.6.3"
                      },
                      {
                        "product": "json-ts",
                        "version": "^1.6.4"
                      }
                    ]
                  }
                }
              };
            setProductReportResponse(res)
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoading(false);
        }
    }

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const getTabs = () => {
        return (
            <div className={classes.root}>
            <AppBar style={{    minWidth: '900px'}} position="static">
            <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Issues"   />
              <Tab label="Dependencies"  />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Issues issues={productReportResponse.Issues} />

          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <JsonFiles jsonFiles={productReportResponse.jsonFiles}/>
          </TabPanel>
          </div>
        );
    }


    return (
        <Container className={classes.root} maxWidth="lg">
            <Grid
              container
              spacing={1}
            >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="left"
                  height="100%"
                  style={{ marginTop: '25px' }}
                >
                    {productReportResponse ? 
                    (
                        <>
                    <ReportHeader header={productReportResponse.header} /> 
                    <Divider />
                    {getTabs()}
                        </>
                    )
                    : ''}

                    {loading ? getLoader() : null}
                    <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

                </Box>
            </Grid>
        </Container>

    );
};

export default ProductsReports;