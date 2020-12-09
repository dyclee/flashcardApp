import { CREATE_SET, RESET_SETS } from "./sets"

export const GET_CARDS = 'GET CARDS'
export const CREATE_CARD = 'CREATE CARD'
export const DELETE_CARD = 'DELETE CARD'
export const EDIT_CARD = 'EDIT CARD'
export const RESET_CARDS = 'RESET CARDS'

export const getCards = (cards) => ({ type: GET_CARDS, cards})
export const createCard = (card) => ({ type: CREATE_CARD, card })
export const deleteCard = (card) => ({ type: DELETE_CARD, card })
export const editCard = (card) => ({ type: EDIT_CARD, card })
export const resetCards = () => ({ type: RESET_CARDS })
