const initialState = {
    selectedSideBarItem : 'dependencies'
}

const sideBarReducer = (state = initialState, action) => {
    switch(action.type){
        case "setSideBarSelectedItem":
            return {...state, selectedSideBarItem: action.payload}
        
            default:
                return state;
    }
}

export default sideBarReducer;