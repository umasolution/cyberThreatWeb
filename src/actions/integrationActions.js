const setIntegrations = (integrations) =>{
    return {
        type : "setIntegrations",
        payload : integrations
    }
}

const setConnectorList = (connectors) => {
    return {
        type : "setConnectorList",
        payload : connectors
    }
}

const setConnectedRepos= (repos) => {
    return {
        type : "setConnectedRepos",
        payload : repos
    }
}

const filterRepoByText= (filterRepoByTxt) => {
    return {
        type : "filterRepoByTxt",
        payload : filterRepoByTxt
    }
}

const updateSelectedProject = (payload) => {
    return {
        type : "updateSelectedProject",
        payload : payload
    }
}

const updateSelectedTag = (payload) => {
    return {
        type: "updateSelectedTag",
        payload : payload
    }
}

const setMachineList = (payload) => {
    return {
        type: "setMachineList",
        payload : payload
    }
}

export {setIntegrations,setConnectorList,setConnectedRepos, filterRepoByText, updateSelectedProject,updateSelectedTag,setMachineList};