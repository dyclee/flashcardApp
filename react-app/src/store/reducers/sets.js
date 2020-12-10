import { CREATE_SUBJECT, GET_SUBJECTS, GET_SETS, GET_USER_SETS, CREATE_SET, DELETE_SET, EDIT_SET, RESET_SETS } from '../actions/sets';

export default function setReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_SUBJECTS:
            newState.subjects = action.subjects
            return newState
        case CREATE_SUBJECT:
            newState.subjects.push(action.subject.name)
            return newState
        case GET_SETS:
            return action.sets
        case CREATE_SET:
            newState[action.set.id] = action.set
            return newState
        case DELETE_SET:
            delete newState[action.set.id]
            return newState
        case EDIT_SET:
            newState[action.set.id] = action.set
            return newState
        case RESET_SETS:
            return {}
        default:
            return state
    }
}
