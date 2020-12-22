import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import SetHeader from './SetHeader';
import CardListItem from './Flashcard';
import { deleteSet } from '../store/actions/sets';
import { CreateCardForm } from './CardForm';
import {EditSetForm} from './SetForm';
import FlashcardList from './FlashcardList';
import Quiz from './Quiz';
import TabPanel from './TabNavigationMUI';


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
    return (<>
        <SetHeader set={set} hidden={set.hidden} onDelete={onDelete} />
        <div>
            <TabPanel set={set}/>
        </div>
        <div>
            <Quiz set={set}/>
        </div>
        <div className="cards-container">
            <FlashcardList hidden={set.hidden} />
        </div>
    </>)
}
