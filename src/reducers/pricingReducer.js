const initialState = {
    totalScans : 0,
    users : 0,
    alerts : 0,
    totalCost : 0,
    costPerDeveloper:0,
    annualCost:0
}

const pricingReducer = (state = initialState, action) => {
    switch(action.type){
        case "update_total_scans" :
            return {...state,totalScans : action.payload};
        case "update_users" : 
            return {...state, users : action.payload};
        case "update_alerts" : 
            return {...state, alerts : action.payload};
        case "update_total_cost" :
            return {...state, totalCost : getTotalCost(state), costPerDeveloper: getCostPerDeveloper(state),annualCost : getAnnualCost(state)}
                 
            default : 
            return state;
    }
}

const getTotalCost = (state) => {
    return (0.4*state.totalScans*state.users + 0.3 * state.alerts * state.users);
}

const getCostPerDeveloper = (state) =>{
    return (state.totalCost/state.users)
}

const getAnnualCost = (state) => {
    return (state.totalCost * 12) //Annual cost without discount
}

export default pricingReducer;