export const GET_FAVORITES = 'GET FAVORITES'
export const CREATE_FAVORITE = 'CREATE FAVORITE'
export const DELETE_FAVORITE = 'DELETE FAVORITE'
export const RESET_FAVORITES = 'RESET FAVORITES'
export const SET_FAVORITE = 'SET FAVORITE'

export const getFavorites = (favorites) => ({ type: GET_FAVORITES, favorites })
export const createFavorite = (favorite) => ({ type: CREATE_FAVORITE, favorite })
export const deleteFavorite = (favorite) => ({ type: DELETE_FAVORITE, favorite })
export const resetFavorites = () => ({ type: RESET_FAVORITES })
export const setFavorite = (favorite) => ({ type: SET_FAVORITE, favorite})
