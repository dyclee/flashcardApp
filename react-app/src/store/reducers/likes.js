import { GET_LIKES, CREATE_LIKE, DELETE_LIKE, RESET_LIKES } from '../actions/likes';

export default function likeReducer(state = {}, action) {
    const newState = {...state }
    switch(action.type) {
        case GET_LIKES:
            return action.likes
        case CREATE_LIKE:
            newState[action.like.id] = action.like
            return newState
        case DELETE_LIKE:
            delete newState[action.like.id]
            return newState
        case RESET_LIKES:
            return {}
        default: return state
    }
}
