const setSelectedProduct = (selectedItem) => {
    return {
        type : "setProduct",
        payload : selectedItem
    }
}

const setAdvisoryResults = (results) => {
    return {
        type: 'setAdvisoryResults',
        payload : results
    }
}

const setScanning = (scanning) => {
    return {
        type: 'setScanning',
        payload : scanning
    }
}

const setPollingId = (resultId) => {
    return {
        type: 'setPollingId',
        payload : resultId
    }
}


export {setSelectedProduct, setAdvisoryResults, setScanning, setPollingId}