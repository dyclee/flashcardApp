import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteCard } from '../store/actions/cards';
import { editSet } from '../store/actions/sets';

export default function Flashcard({ flashcard, hidden }) {
    const { setId } = useParams();
    const [isFlipped, setIsFlipped] = useState(false);
    const cardId = flashcard.id;
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
    <div
        className={`card ${isFlipped ? 'isFlipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
    >
        <div className="front">
            {flashcard.question}
            <button hidden={hidden} onClick={onDelete}>DELETE CARD</button>
        </div>
        <div className="back">
            {flashcard.answer}
            {/* <button hidden={hidden} onClick={onDelete}>DELETE CARD</button> */}
        </div>
        {/* {isFlipped ? flashcard.answer :flashcard.question} */}
        {/* <button hidden={hidden} onClick={onDelete}>DELETE CARD</button> */}
    </div>
    </>)
}
