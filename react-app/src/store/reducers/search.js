import { SET_SEARCH,
        SET_SEARCH_SETS,
        SET_SEARCH_SUBJECTS,
        SET_SEARCH_USERS,
        SET_SEARCH_CARDS,
        SWITCH_HIDDEN } from '../actions/search';

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
        case SWITCH_HIDDEN:
            const filterState = action.filterState;
            // console.log("FILTER STATE", filterState)
            if (filterState.all === true) {
                newState.foundSets.forEach((item) => {
                    item.hidden = false;
                })
                newState.foundSubjects.forEach((item) => {
                    item.hidden = false;
                })
                newState.foundUsers.forEach((item) => {
                    item.hidden = false;
                })
                newState.foundCards.forEach((item) => {
                    item.hidden = false;
                })
                return newState;
            }
            if (filterState.sets === true) {
                newState.foundSets.forEach((item) => {
                    item.hidden = false;
                })
            } else {
                newState.foundSets.forEach((item) => {
                    item.hidden = true;
                })
            }
            if (filterState.subjects === true) {
                newState.foundSubjects.forEach((item) => {
                    item.hidden = false;
                })
            } else {
                newState.foundSubjects.forEach((item) => {
                    item.hidden = true;
                })
            }
            if (filterState.users === true) {
                newState.foundUsers.forEach((item) => {
                    item.hidden = false;
                })
            } else {
                newState.foundUsers.forEach((item) => {
                    item.hidden = true;
                })
            }
            if (filterState.cards === true) {
                newState.foundCards.forEach((item) => {
                    item.hidden = false;
                })
            } else {
                newState.foundCards.forEach((item) => {
                    item.hidden = true;
                })
            }
            return newState
        default:
            return {...state}
    }
}
