import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import SetHeader from './SetHeader';
import CardListItem from './Flashcard';
import { deleteSet } from '../store/actions/sets';
import { CreateCardForm } from './CardForm';
import {EditSetForm} from './SetForm';
import FlashcardList from './FlashcardList';

export default function SetDisplay() {
    const { setId } = useParams()

    const set = useSelector(state => state.setReducer[setId])
    const user = useSelector(state => state.userReducer.user)
    // const flashcards = useSelector(state => state.cardReducer[setId])

    const [userLike, setUserLike] = useState([])
    const [userFavorite, setUserFavorite] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    const onDelete = async (e) => {
        e.preventDefault();

        // dispatch(deleteSet(set))
        const res = await fetch(`/api/sets/${setId}/delete`, {
            method: "DELETE"
        });
        const deleted = await res.json();
        dispatch(deleteSet(deleted))
        return history.push('/')
    }

    // console.log("CARDS", cards)
    // console.log("LIKES", likes)
    // console.log("FAVORITES", favorites)
    if (!set) return null;
    // console.log("FLASHCARDS", flashcards)
    return (<>
        <h1>Set Display Page</h1>
        <SetHeader set={set} />
        <button hidden={set.hidden} onClick={onDelete}>DELETE SET</button>
        <EditSetForm hidden={set.hidden} set={set}/>
        <h4>Number of cards: {set.card.length}</h4>
        <h4>Number of likes: {set.like.length}</h4>
        <h4>Number of favorites: {set.favorite.length}</h4>
        <CreateCardForm setId={setId} hidden={set.hidden} />
        <div className="cards-container">
            <FlashcardList hidden={set.hidden} />
        </div>
        {/* {set.cards.map((card) => (<>
            <CardListItem card={card} hidden={set.hidden} />
            <button hidden={hidden}>DELETE</button>
        </>))} */}

    </>)
}
