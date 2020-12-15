import { SET_FAVORITE, GET_FAVORITES, CREATE_FAVORITE, DELETE_FAVORITE, RESET_FAVORITES } from '../actions/favorites';

export default function favoriteReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case SET_FAVORITE:
            newState[action.favorite.setId] = false;
            return newState;
        case GET_FAVORITES:
            return action.favorites
        case CREATE_FAVORITE:
            newState[action.favorite.setId] = true
            return newState
        case DELETE_FAVORITE:
            newState[action.favorite.setId] = false
            return newState
        case RESET_FAVORITES:
            return {}
        default: return state
    }
}
