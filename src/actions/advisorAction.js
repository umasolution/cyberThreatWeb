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

const setSearchTerm = (searchTerm) => {
    return {
        type: 'setSearchTerm',
        payload : searchTerm
    }
}


export {setSelectedProduct, setAdvisoryResults, setScanning, setPollingId,setSearchTerm}