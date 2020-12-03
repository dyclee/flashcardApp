export const GET_USER = "GET USER";
export const REMOVE_USER = "REMOVE USER"

export const getUser = (user) => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
