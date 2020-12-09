import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteCard } from '../store/actions/cards';


export default function CardListItem({ card, hidden }) {
    const { setId } = useParams();
    const cardId = card.id;
    const dispatch = useDispatch()
    // console.log("CARD ID", cardId)
    // const history = useHistory();
    // useEffect(async () => {
    //     // return history.push(`/set/${setId}`)

    // })

    const onDelete = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/cards/${cardId}/delete`, {
            method: 'DELETE'
        })
        const deletedCard = await res.json();
        dispatch(deleteCard(deletedCard))
    }
    return (<>
        <div>{card.question}</div>
        <div>{card.answer}</div>
        <button hidden={hidden} onClick={onDelete}>DELETE CARD</button>
    </>)
}
