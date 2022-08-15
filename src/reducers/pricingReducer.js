const initialState = {
    totalScans : 0,
    users : 0,
    alerts : 0,
    totalCost : 0,
    costPerDeveloper:0,
    annualCost:0,
    totalWithDiscount : 0,
    niahFlexiUserPricing : {},
    niahFlexiScanPricing : {},
    niahEnterprisePricing : {},
    niahLitePricing : {},
    selectedSubscriptionModel : '',
    selectedSubscriptionModelDisplayName : '',
    subscriptionNew : [],
    flexiPopup : false,
    paymentPopup : false,
    pricingPopup : false,
    errorMsg : '',
    transactionResponse : {},
    updateSubscription: false
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
            return {...state, totalCost : getTotalCost(state), 
                            costPerDeveloper: getCostPerDeveloper(state),
                            annualCost : getAnnualCost(state),
                            totalWithDiscount : getTotalCost(state,true)
            }
        case "set_pricing_configurations" :
            return {...state, niahFlexiUserPricing : action.payload.data[0] , 
                                niahFlexiScanPricing: action.payload.data[1], 
                                niahLitePricing : action.payload.data[2],
                                niahEnterprisePricing : action.payload.data[3]}
        case "set_model":
                return {...state, selectedSubscriptionModel : action.payload.model, 
                            selectedSubscriptionModelDisplayName:action.payload.displayName}
        case "update_costs":
            return {...state,totalWithDiscount : action.payload.totalCost, annualCost : action.payload.annualCost }
              
         case "update_subscription" :
            return {...state,subscriptionNew : action.payload};

        case "open_flexiPopup":
            return { ...state, flexiPopup: action.payload };
        case "open_pricingPopup":
            return { ...state, pricingPopup: action.payload };

        case "open_paymentpopup":
            return { ...state, paymentPopup: action.payload };

        case "error_msg":
            return { ...state, errorMsg: action.payload };

        case "transaction_response":
            return { ...state, transactionResponse: action.payload };

        case "update_subscription_value":
            return { ...state, updateSubscription: action.payload };

        default:
            return state;
    }
}

const getTotalCost = (state, isDiscount) => {
    return (getScansCost(state,isDiscount) + getUsersCost(state,isDiscount));
}

const getScansCost = (state,isDiscount) => {
    return isDiscount  ? (state.niahFlexiScanPricing.amount.scans.amount*state.totalScans  - applyDiscount(state.niahFlexiScanPricing.discount.scans.amount, 
                                                                                                state.niahFlexiScanPricing.discount.scans.numbers,
                                                                                                state.totalScans    ) ): state.niahFlexiScanPricing.amount.scans.amount*state.totalScans;
                         ;


}

const getUsersCost = (state, isDiscount) => {
    return isDiscount ? (state.niahFlexiUserPricing.amount.users.amount*state.users - applyDiscount(state.niahFlexiUserPricing.discount.users.amount, 
                                                                                                state.niahFlexiUserPricing.discount.users.numbers,
                                                                                                state.users  )  ) : state.niahFlexiUserPricing.amount.users.amount*state.users;


}

const applyDiscount = (discount, forThisCount, count) => {
    return count >= forThisCount ? discount : 0;
}

const getCostPerDeveloper = (state) =>{
    return (state.totalWithDiscount > 0 ? state.totalWithDiscount/state.users : state.totalCost/state.users)
}

const getAnnualCost = (state) => {
    return (state.totalWithDiscount > 0 ? state.totalWithDiscount * 12 : (state.totalCost * 12));
}

const getTotalCostWithDiscount = () => {
    
}

export default pricingReducer;