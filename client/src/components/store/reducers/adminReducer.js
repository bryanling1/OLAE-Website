const initState = {
    addStatsStatus: null
}

const adminReducer = (state = initState, action) =>{
    switch (action.type){
        case "ADD_STATS_BY_MATCH_KEY_SUCCESS":
            return{
                ...state,
                addStatsStatus: true
            }
        case "ADD_STATS_BY_MATCH_KEY_FAILURE":
            return{
                ...state,
                addStatsStatus: false
            }
        default:
            return state;
    }
}

export default adminReducer

