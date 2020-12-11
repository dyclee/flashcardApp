import { GET_FAVORITES, CREATE_FAVORITE, DELETE_FAVORITE, RESET_FAVORITES } from '../actions/favorites';

export default function favoriteReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
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
