const initialState = {
    tasks : []
}

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case "updatedTasks":{
            state.tasks = action.payload
        }

        default:
            return state;
    }
}

export default taskReducer;