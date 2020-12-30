import { SET_SEARCH,
        SET_SEARCH_SETS,
        SET_SEARCH_SUBJECTS,
        SET_SEARCH_USERS,
        SET_SEARCH_CARDS } from '../actions/search';

export default function searchReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case SET_SEARCH:
            return action.searchObj
        case SET_SEARCH_SETS:
            newState.searchSets = action.searchObj.foundSets
            return newState
        case SET_SEARCH_SUBJECTS:
            newState.searchSubjects = action.searchObj.foundSubjects
            return newState
        case SET_SEARCH_USERS:
            newState.searchUsers = action.searchObj.foundUsers
            return newState
        case SET_SEARCH_CARDS:
            newState.searchCards = action.searchObj.foundCards
            return newState
        default:
            return {...state}
    }
}
