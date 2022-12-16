import produce from "immer";
import { SBOA_DATA_TYPE, SBOA_GENERATE_DATA, SBOA_JSON_RESPONSE_DATA, SBOA_XML_RESPONSE_DATA, SHOW_SBOA_DIALOG } from "src/actions/reportAction";


const initialState = {
    showSBOADialog: false,
    dataType: 'xml',
    generateData: 'no',
    xmlResponseData: {},
    jsonResponseData: {}
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SBOA_DIALOG: {
            const { details } = action.payload;

            return produce(state, (report) => {
                report.showSBOADialog = details;
            });
        };

        case SBOA_XML_RESPONSE_DATA: {
            const { details } = action.payload;

            return produce(state, (report) => {
                report.xmlResponseData = details;
            })
        };

        case SBOA_JSON_RESPONSE_DATA: {
            const {details} = action.payload;

            return produce(state, (report) => {
                report.jsonResponseData = details;
            })
        };

        case SBOA_DATA_TYPE: {
            const {details} = action.payload;

            return produce(state, (report) => {
                report.dataType = details;
            })
        };

        case SBOA_GENERATE_DATA: {
            const {details} = action.payload;

            return produce(state, (report) => {
                report.generateData = details;
            })
        };

        default: {
            return state;
        }
    }
};

export default reportReducer