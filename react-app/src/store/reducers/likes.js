import { SET_LIKE, GET_LIKES, CREATE_LIKE, DELETE_LIKE, RESET_LIKES } from '../actions/likes';

export default function likeReducer(state = {}, action) {
    const newState = {...state }
    switch(action.type) {
        case SET_LIKE:
            // console.log("ACTION", action);
            // newState[action.like.setId].exists = false;
            newState[action.like.setId] = {"exists": false, "count": 0}
            return newState;
        case GET_LIKES:
            return action.likes
        case CREATE_LIKE:
            newState[action.like.setId].exists = true;
            newState[action.like.setId].count += 1
            return newState
        case DELETE_LIKE:
            newState[action.like.setId].exists = false;
            newState[action.like.setId].count -= 1
            return newState
        case RESET_LIKES:
            return {}
        default: return state
    }
}
