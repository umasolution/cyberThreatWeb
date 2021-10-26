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

export {setTotalScans, setUsers, setAlerts, getTotalCost};