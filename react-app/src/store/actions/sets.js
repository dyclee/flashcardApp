export const GET_SETS = 'GET SETS'
export const GET_USER_SETS = 'GET USER SETS'
export const CREATE_SET = 'CREATE SET'
export const DELETE_SET = 'DELETE SET'
export const EDIT_SET = 'EDIT SET'
export const RESET_SETS = 'RESET SETS'
export const GET_SUBJECTS = 'GET SUBJECTS'

export const getSets = (sets) => ({ type: GET_SETS, sets })
export const getUserSets = (sets) => ({ type: GET_USER_SETS, sets })
export const createSet = (set) => ({ type: CREATE_SET, set })
export const deleteSet = (set) => ({ type: DELETE_SET, set })
export const editSet = (set) => ({ type: EDIT_SET, set })
export const resetSets = () => ({ type: RESET_SETS })
export const getSubjects = (subjects) => ({ type: GET_SUBJECTS, subjects })
