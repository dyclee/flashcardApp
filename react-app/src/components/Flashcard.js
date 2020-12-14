import React, { useEffect, useRef,  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteCard } from '../store/actions/cards';
import { editSet } from '../store/actions/sets';

import {DeleteCardForm} from './CardForm'

export default function Flashcard({ flashcard, hidden }) {
    const { setId } = useParams();
    const [isFlipped, setIsFlipped] = useState(false);
    const [height, setHeight] = useState('initial')
    const cardId = flashcard.id;
    const dispatch = useDispatch()

    const frontEl = useRef()
    const backEl = useRef()
    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 150))
    }
    useEffect(setMaxHeight, [flashcard.question, flashcard.answer])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    },[])

    return (<>
    <div
        className={`card ${isFlipped ? 'isFlipped' : ''}`}
        style={{ height: height }}
        onClick={() => setIsFlipped(!isFlipped)}
    >
        {/* <div className="card-deleteicon">
            <DeleteCardForm cardId={cardId} setId={setId} />
        </div> */}
        <div className={`card-deleteicon-${isFlipped ? 'back' : 'front'}`}>
            <DeleteCardForm cardId={cardId} setId={setId} hidden={hidden} />
        </div>
        <div className="front" ref={frontEl}>
            {flashcard.question}
        </div>
        <div className="back" ref={backEl}>
            {flashcard.answer}
        </div>
        {/* {isFlipped ? flashcard.answer :flashcard.question} */}
        {/* <button hidden={hidden} onClick={onDelete}>DELETE CARD</button> */}
    </div>
    </>)
}
