import { GET_SUBJECTS, ADD_SUBJECT } from '../actions/subjects';

export default function subjectReducer(state={}, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_SUBJECTS:
            newState.subjects = action.subjects
            return newState
        case ADD_SUBJECT:
            newState.subjects.push(action.subject.name)
            return newState
        default:
            return state
    }
}
