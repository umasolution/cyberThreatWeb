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

export {setIntegrations,setConnectorList,setConnectedRepos, filterRepoByText};