import { GET_SUBJECTS, GET_SETS, GET_USER_SETS, CREATE_SET, DELETE_SET, EDIT_SET, RESET_SETS } from '../actions/sets';

export default function setReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_SUBJECTS:
            newState.subjects = action.subjects
            return newState
        case GET_SETS:
            return action.sets
            // newState.allSets = []
            // for (let i = 0; i < action.sets.length; i++) {
            //     let set = action.sets[i]
            //     newState.allSets[set.id] = set
            // }
            // return newState
        case GET_USER_SETS:
            newState.userSets = {}
            for (let i = 0; i < action.sets.length; i++) {
                let set = action.sets[i]
                newState.userSets[set.id] = set
            }
            return newState
        case CREATE_SET:
            newState.allSets[action.set.id] = action.set
            newState.userSets[action.set.id] = action.set
            return newState
        case DELETE_SET:
            delete newState.allSets[action.set.id]
            delete newState.userSets[action.set.id]
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
