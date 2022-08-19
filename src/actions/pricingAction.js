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

const setSubcriptionNew = (details) => {
    return {
        type : "update_subscription",
        payload : details
    }
}

const openFlexiPopup = (details) => {
    return {
        type : "open_flexiPopup",
        payload : details
    }
}

const openPaymentPopup = (details) => {
    return {
        type : "open_paymentpopup",
        payload : details
    }
}

const openPricingPopup = (details) => {
    return {
        type : "open_pricingPopup",
        payload : details
    }
}

const setErrorMsg = (details) => {
    return {
        type : "error_msg",
        payload : details
    }
}

const setTransactionResponse = (details) => {
    return {
        type : "transaction_response",
        payload : details
    }
}

const updateSubscription = (details) => {
    return {
        type : "update_subscription_value",
        payload : details
    }
}

const setDisablePay = (details) => {
    return {
        type : "disable_pay",
        payload : details
    }
}

export {
    setTotalScans,
    setUsers,
    setAlerts,
    getTotalCost,
    setPricingConfigurations,
    setSubscriptionModel,
    setCosts,
    setSubcriptionNew,
    openFlexiPopup,
    openPaymentPopup,
    setErrorMsg,
    openPricingPopup,
    setTransactionResponse,
    updateSubscription,
    setDisablePay
};