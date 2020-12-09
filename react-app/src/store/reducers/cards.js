import { GET_CARDS, CREATE_CARD, DELETE_CARD, EDIT_CARD, RESET_CARDS } from '../actions/cards';

export default function cardReducer(state = {}, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_CARDS:
            return action.cards
        case CREATE_CARD:
            newState[action.card.id] = action.card
            return newState
        case DELETE_CARD:
            delete newState[action.card.id]
            return newState;
        case EDIT_CARD:
            newState[action.card.id] = action.card
            return newState;
        case RESET_CARDS:
            return {}
        default: return state
    }
}
