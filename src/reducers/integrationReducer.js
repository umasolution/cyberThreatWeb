const initialState = {
    modalContentsByType : [],
    integrationDetails : [],
    connectorList : [],
    connectedRepo : {data : []},
    filteredRepo : {data : []},
    filterTxt : ''

}

initialState.modalContentsByType['GitLab'] = {
    title: "GitLab",
    desc : "Enter your account credentials below to connect Niah to your Gitlab account",
    components: [{ label: "Personal Access Token", type: 'txt', key :"personal_access_token" }]
  
};

initialState.modalContentsByType['Docker'] = {
    title: "Docker",
    desc : "Enter your account credentials below to connect Niah to your Docker account",
    components: [{ label: "Username", type: 'txt', key : 'username' }, 
                { label: "Access Token", type: 'txt', key : 'personal_access_token' }],
   
};

initialState.modalContentsByType['GCR'] = {
    title: "GCR",
    desc : "Enter the registry hostname and a service account JSON key file which Niah should use to connect to your GCR account.",
    components: [{ label: "GCR Hostname", type: 'txt', key :'hostname' }, 
                { label: "JSON Key file", type: 'txt', key : "json_key_file" }]
};

initialState.modalContentsByType['ECR'] = {
    title: "ECR",
    desc : "Enter the Region and Role ARN which Niah should use to connect to your ECR account.",
    components: [{ label: "AWS Region", type: 'txt', key :'region' },
                 { label: "AWS Access Key Id", type: 'txt', key :'aws_access_key_id' },
                 { label: "AWS Secret Access Key", type: 'txt', key :'aws_secret_access_key' }]
};

initialState.modalContentsByType['ACR'] = {
    title: "ACR",
    desc : "Enter your account credentials below to connect Niah to your ACR account.",
    components: [{ label: "Username", type: 'txt', key :'username' },
     { label: "Password", type: 'txt', key :'password' },
      { label: "Container registry name", type: 'txt', key :'registry' }]
};
initialState.modalContentsByType['Quay'] = {
    title: "Quay",
    desc : "Enter your account credentials below to connect Niah to your Quay account.",
    components: [{ label: "Access Token", type: 'txt', key : 'personal_access_token' },
                 { label: "Hostname", type: 'txt', key :'hostname' }
                ]
};
initialState.modalContentsByType['GitHub'] = {
    title: "GitHub",
    desc : "Enter your account credentials below to connect Niah to your Gitub account.",
    components: [{ label: "Login Name", type: 'txt', key :'loginname'},{ label: "Personal Access Token", type: 'txt', key :'personal_access_token' }]
};
initialState.modalContentsByType['DigitalOcean'] = {
    title: "DigitalOcean",
    desc : "Enter your account credentials below to connect Niah to your DigitalOcean account.",
    components: [{ label: "Login Name", type: 'txt', key :'loginname'},{ label: "Personal Access Token", type: 'txt', key :'personal_access_token' }]
};

initialState.modalContentsByType['Heroku'] = {
    title: "Heroku",
    desc : "Enter your account credentials below to connect Niah to your Heroku account. See our Heroku integration documentation for details about generating an API key.",
    components: [{ label: "API Key", type: 'txt', key :'api_key' }]
};
initialState.modalContentsByType['Google Artifact Registry'] = {
    title: "Google Artifact Registry",
    desc : "Enter the registry hostname and a service account JSON key file which Niah should use to connect to your Google Artifact Registry account.",
    components: [{ label: "Artifact Registry hostname", type: 'txt', key :'registry' }, { label: "JSON key file", type: 'txt', key :'json_key_file' }]
};
initialState.modalContentsByType['Cloud Foundry'] = {
    title: "Cloud Foundry",
    desc : "Enter your account credentials below to connect NIah to your Cloud Foundry account.",
    components: [{ label: "You can find out your Cloud Foundry API URL by typing the following command:", type: 'lbl' }, 
                 { label: "$ cf api", type: 'lbl', bold:true },
                 { label: "API endpoint: https://api.example.com (API version: 2.2.0)", type: 'lbl', bold:true  },
                 { label: "API URL", type: 'txt', key :'api_url' },
                 { label: "Username", type: 'txt', key :'username' },
                 { label: "Password", type: 'txt', key :'password' }]
};

initialState.modalContentsByType['Pivotal Web Services'] = {
    title: "Pivotal Web Services",
    desc : "Enter your account credentials below to connect Niah to your Pivotal Web Services account.",
    components: [{ label: "Username", type: 'txt', key :'username' }, { label: "Password", type: 'txt', key :'password' },]
};

initialState.modalContentsByType['AWS Lambda'] = {
    title: "AWS Lambda",
    desc : "Enter IAM ARN below to connect Niah to your AWS Lambda account. See our AWS Lambda integration documentation for details about generating IAM ARN.",
    components: [{ label: "ARN", type: 'txt', key :'arn' }, { label: "External ID", type: 'txt', key :'external_id' }]
};

initialState.modalContentsByType['Azure Function'] = {
    title: "Azure Functions",
    desc : "Enter your account credentials below to connect Niah to your Azure Functions account. See our Azure Functions integration documentation for details about generating account credentials.",
    components: [{ label: "Service Principal Name ('Client ID')", type: 'txt', key :'client_id' }, 
                { label: "Service Principal Password ('Secret')", type: 'txt', key :'secret' }, 
                { label: "Tenant ('Domain')", type: 'txt', key :'tenant' }]
}

initialState.modalContentsByType['BitBucket'] = {
    title: "BitBucket",
    desc : "Enter your account credentials below to connect Niah to your BitBucket account.",
    components: [{ label: "Username", type: 'txt', key:'username' },
     { label: "Login Name", type: 'txt', key:'loginname' },
     { label: "App Password", type: 'txt', key : 'app_password' },]
};

initialState.modalContentsByType['Jira'] = {
    title: "Jira",
    desc : "Enter your account credentials below to connect Niah to your Azure Repos account.",
    components: [{ label: "Hostname", type: 'txt', key :'hostname' },
             { label: "Personal access token", type: 'txt', key :'personal_access_token' }, 
             { label: "Project Key", type: 'txt', key :'project_key' },
             { label: "Username", type: 'txt', key:'username' }]
};

initialState.modalContentsByType['Bugzilla'] = {
    title: "Bugzilla",
    desc : "Enter your account credentials below to connect Niah to your Azure Repos account.",
    components: [{ label: "Hostname", type: 'txt', key :'hostname' },
             { label: "Username", type: 'txt', key :'username' }, 
             { label: "Password", type: 'txt', key :'password' }]
};

initialState.modalContentsByType['Pivotal Web Services'] = {
    title: "Pivotal Web Services",
    desc : "Enter your account credentials below to connect Niah to your Azure Repos account.",
    components: [
             { label: "Username", type: 'txt', key :'username' }, 
             { label: "Password", type: 'txt', key :'password' }]
};

const integrationReducer = (state = initialState, action) => {
    switch(action.type){
        case "setIntegrations":
            return {...state, integrationDetails : Object.entries(action.payload)}
        case "setConnectorList":
            return {...state, connectorList : setConnectorList(action.payload)}
        case "setConnectedRepos":
                return {...state, connectedRepo : action.payload, filteredRepo : action.payload}
        case "filterRepoByTxt" : 
            return {...state, filteredRepo : filterRepoByTxt(action.payload, state.connectedRepo), filterTxt : action.payload}
        case "updateSelectedProject" :
            return {...state, 
                        connectedRepo : updateProjectSelection(action.payload.project, action.payload.mode,{...state.connectedRepo}),
                            filteredRepo :  filterRepoByTxt(state.filterTxt,updateProjectSelection(action.payload.project, action.payload.mode,{...state.connectedRepo}))
                    }
        default : 
            return state;
    }
}

const setConnectorList = (connectorList) => {
    const tempArr = [];
    tempArr.push(connectorList);

    return Array.isArray(connectorList) ? connectorList : tempArr;
}

const updateProjectSelection = (project,mode,repos) => {
    
    repos.data =  repos.data.map(repo => {
                if(repo.projectname == project.projectname){
                    repo.mode = mode
                }

                return repo;
            })

    return repos;
}


const filterRepoByTxt = (searchTxt,connectedRepo) => {
    const clonedRepos = {...connectedRepo};

    if(searchTxt == '')
        return clonedRepos
    

    clonedRepos.data = clonedRepos.data.filter(repo => repo[clonedRepos.search_header] == searchTxt);

    return clonedRepos;
}

export default integrationReducer;
