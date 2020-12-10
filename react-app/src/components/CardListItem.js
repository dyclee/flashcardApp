import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteCard } from '../store/actions/cards';
import { editSet } from '../store/actions/sets';

export default function CardListItem({ card, hidden }) {
    const { setId } = useParams();
    const cardId = card.id;
    const dispatch = useDispatch()

    const onDelete = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/cards/${cardId}/delete`, {
            method: 'DELETE'
        })
        const deletedCard = await res.json();
        dispatch(deleteCard(deletedCard))

        const getNewSet = await fetch(`/api/sets/${setId}`)
        const newSet = await getNewSet.json();
        // console.log("NEW SET", newSet)
        dispatch(editSet(newSet))

    }
    return (<>
        <div>{card.question}</div>
        <div>{card.answer}</div>
        <button hidden={hidden} onClick={onDelete}>DELETE CARD</button>
    </>)
}
