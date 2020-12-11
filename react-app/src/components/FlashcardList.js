import React from 'react';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Flashcard from './Flashcard';
import '../styles/setdisplay.css';

export default function FlashcardList({ hidden }) {
    const {setId} = useParams()
    const flashcards = useSelector(state => state.cardReducer[setId])
    // console.log(setId, flashcards)
    return (<>
        <div className="card-grid">
            {flashcards.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} hidden={hidden}/>
            })}
        </div>
    </>)
}
