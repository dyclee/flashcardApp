import React from 'react';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Flashcard from './Flashcard';
import '../styles/setdisplay.css';

export default function FlashcardList({ hidden }) {
    const {setId} = useParams()
    const flashcards = useSelector(state => state.cardReducer[setId])
    const flashcardArr = []
    for (let key in flashcards) {
        flashcardArr.push(flashcards[key])
    }
    // console.log(flashcardArr)
    if (flashcardArr.length === 0) return null;
    return (<>
        <div className="card-grid">
            {flashcardArr.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} hidden={hidden}/>
            })}
        </div>
    </>)
}
