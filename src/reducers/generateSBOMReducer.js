import produce from "immer";
import { SET_FILE_DETAILS, SET_FILE_LANGUAGE, SET_FILE_TYPE } from "src/actions/generateSBOMAction";


const initialState = {
    fileType: '',
    fileDetails: {},
    fileOptions: [
        {
            id: 1,
            language: 'Java'
        },
        {
            id: 1,
            language: 'Python'
        },
        {
            id: 1,
            language: 'Javascript'
        },
        {
            id: 1,
            language: 'Php'
        }
    ]
};

const generateSBOMReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILE_TYPE: {
            const { details } = action.payload;

            return produce(state, (report) => {
                const fileType = details.split('.').pop();
                if (fileType == 'xml') {
                    report.fileType = 'Java';
                } else if (fileType == 'txt') {
                    report.fileType = 'Python';
                } else if (fileType == 'json') {
                    if (details == 'package.json') {
                        report.fileType = 'Javascript';
                    } else if (details == 'composer.json') {
                        report.fileType = 'Php'
                    };
                } else {
                    report.fileType = 'Python'
                }
            })
        };
        case SET_FILE_DETAILS: {
            const { details } = action.payload;

            return produce(state, (report) => {
                report.fileDetails = details
            })
        };
        case SET_FILE_LANGUAGE: {
            const { details } = action.payload;
            console.log(details)

            return produce(state, (report) => {
                report.fileType = details
            })
        };
        default: {
            return state;
        }
    }

};

export default generateSBOMReducer;