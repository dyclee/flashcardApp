export const GET_LIKES = 'GET LIKES'
export const CREATE_LIKE = 'CREATE LIKE'
export const DELETE_LIKE = 'DELETE LIKE'
export const RESET_LIKES = 'RESET LIKES'

export const getLikes = (likes) => ({ type: GET_LIKES, likes })
export const createLike = (like) => ({ type: CREATE_LIKE, like })
export const deleteLike = (like) => ({ type: DELETE_LIKE, like })
export const resetLikes = () => ({ type: RESET_LIKES })
