export const SET_SEARCH = "SET SEARCH"
export const SET_SEARCH_SETS = "SET SEARCH SETS"
export const SET_SEARCH_SUBJECTS = "SET SEARCH SUBJECTS"
export const SET_SEARCH_USERS = "SET SEARCH USERS"
export const SET_SEARCH_CARDS = "SET SEARCH CARDS"
export const SWITCH_HIDDEN = "SWITCH HIDDEN"

export const setSearch = (searchObj) => ({ type: SET_SEARCH, searchObj})
export const setSearchSets = (searchObj) => ({ type: SET_SEARCH_SETS, searchObj})
export const setSearchSubjects = (searchObj) => ({ type: SET_SEARCH_SUBJECTS, searchObj})
export const setSearchUsers = (searchObj) => ({ type: SET_SEARCH_USERS, searchObj})
export const setSearchCards = (searchObj) => ({ type: SET_SEARCH_CARDS, searchObj})
export const switchHidden = (filterState) => ({ type: SWITCH_HIDDEN, filterState})


export const setAllSearch = (searchObj, dispatch) => {
    // const dispatch = useDispatch();

    dispatch(setSearch(searchObj));
    dispatch(setSearchSets(searchObj));
    dispatch(setSearchSubjects(searchObj));
    dispatch(setSearchUsers(searchObj));
    dispatch(setSearchCards(searchObj));
    return
}
