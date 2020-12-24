import { SET_SEARCH } from '../actions/search';

export default function searchReducer(state = {}, action) {
    switch(action.type) {
        case SET_SEARCH:
            return action.searchObj
        default:
            return {...state}
    }
}
