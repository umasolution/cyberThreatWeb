export const SHOW_SBOA_DIALOG = "@report/show-sboa-dialog";
export const SBOA_XML_RESPONSE_DATA = "@report/sboa-xml-response-data";
export const SBOA_JSON_RESPONSE_DATA = "@report/sboa-json-response-data";
export const SBOA_DATA_TYPE = "@report/sboa-data-type";
export const SBOA_GENERATE_DATA = "@report/sboa-generate-data";
export const CLEAR_RESPONSE = "@report/clear-response"

export const setShowSBOADialog = (details) => {
    return (dispatch) => dispatch({
        type: SHOW_SBOA_DIALOG,
        payload: {
            details
        }
    });
};

export const setSBOAXmlResponseData = (details) => {
    return (dispatch) => dispatch({
        type: SBOA_XML_RESPONSE_DATA,
        payload: {
            details
        }
    });
};

export const setSBOAJsonResponeData = (details) => {
    return (dispatch) => dispatch({
        type: SBOA_JSON_RESPONSE_DATA,
        payload: {
            details
        }
    });
};

export const setSBOADataType = (details) => {
    return (dispatch) => dispatch({
        type: SBOA_DATA_TYPE,
        payload: {
            details
        }
    });
};
export const setSBOAGenerateData = (details) => {
    return (dispatch) => dispatch({
        type: SBOA_GENERATE_DATA,
        payload: {
            details
        }
    });
};
export const clearResponse = (details) => {
    return (dispatch) => dispatch({
        type: CLEAR_RESPONSE,
        payload: {
            details
        }
    });
};