import Axios from 'axios';
import { takeLatest, call, delay,take, race, put } from 'redux-saga/effects';
import { pollAction } from './rootSaga';

const POLLING_DELAY = 30000

export function* startPollingWorker() {
     yield race({
         task : call(pollingWorker),
         cancel : take("CANCEL_POLLING")
     })
}

export function* pollingWorker() {
    while(true){
        const data  = yield call(callAPI);

        yield put({type: "updatedTasks", payload : data.data.lists})

        yield delay(POLLING_DELAY);
    }
}

const callAPI = async () => {
    let data = "";
    try{
        data = await Axios.post("http://niahsecurity.online/api/get/projects/tasks");
    }catch(e) {
        console.log(e);
        data = "Erorr from API"
    }

    return data;
   
}

export function* pollingSaga() {
    yield takeLatest("POLL_DATA_SAGA", startPollingWorker);
}

