const setTotalScans = (scans) => {
    return{
        type : "update_total_scans",
        payload : scans
    }
}

const setUsers = (users) => {
    return{
        type : "update_users",
        payload : users
    }
}

const setAlerts = (alerts) => {
    return{
        type : "update_alerts",
        payload : alerts
    }
}

const getTotalCost = () => {
    return{
        type : "update_total_cost"
    }
}

const setPricingConfigurations = (pricingData) => {
    return {
        type : "set_pricing_configurations",
        payload : pricingData
    }
}

const setSubscriptionModel = (model) =>{
    return {
        type : "set_model",
        payload : model
    }
}

const setCosts = (totalCost, annualCost) => {
    return {
        type : "update_costs",
        payload : {totalCost, annualCost}
    }
}

export {setTotalScans, setUsers, setAlerts, getTotalCost, setPricingConfigurations, setSubscriptionModel, setCosts};