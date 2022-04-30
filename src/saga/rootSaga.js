import { all } from 'redux-saga/effects';
import { pollingSaga } from './pollingSaga';

export const pollAction = {
    POLL_DATA_SAGA : 'POLL_DATA_SAGA',
    CANCEL_POLLING : "CANCEL_POLLING"
}

export default function* rootSaga() {
    yield all([pollingSaga()])
}