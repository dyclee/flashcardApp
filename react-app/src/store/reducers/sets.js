import { GET_SETS, GET_USER_SETS, CREATE_SET, DELETE_SET, EDIT_SET, RESET_SETS } from '../actions/sets';

export default function setReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_SETS:
            newState.allSets = action.sets
            return newState
        case GET_USER_SETS:
            newState.userSets = action.sets
            return newState
        case CREATE_SET:
            newState.allSets[action.set.id] = action.set
            newState.userSets[action.set.id] = action.set
            return newState
        case DELETE_SET:
            delete newState.allSets[action.set.id]
            // delete newState.userSets[action.set.id]
            return newState
        case EDIT_SET:
            newState.allSets[action.set.id] = action.set
            newState.userSets[action.set.id] = action.set
            return newState
        case RESET_SETS:
            return {}
        default:
            return state
    }
}
