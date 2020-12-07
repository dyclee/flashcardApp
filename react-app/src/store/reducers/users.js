import { GET_USER, REMOVE_USER } from '../actions/users';

export default function userReducer(state = {}, action) {
    const newState = {...state }
    switch(action.type) {
        case GET_USER:
            newState.user = action.user
            return newState
        case REMOVE_USER:
            return {}
        default:
            return state

    }
}
