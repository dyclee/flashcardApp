import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import SetHeader from './SetHeader';
import CardListItem from './CardListItem';
import { deleteSet } from '../store/actions/sets';
import { CreateCardForm } from './CardForm';
import {EditSetForm} from './SetForm';


export default function SetDisplay() {
    const { setId } = useParams()

    const set = useSelector(state => state.setReducer[setId])
    const user = useSelector(state => state.userReducer.user)
    // const cards = useSelectdor(state => state.cardReducer.setCards)
    let hidden = true
    // const [hidden, setHidden] = useState(set ? false:true)

    const [userLike, setUserLike] = useState([])
    const [userFavorite, setUserFavorite] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async() => {
            console.log("SET in SET DISPLAY", set)
            if (set) {
                if (set.createdBy === user.id) {
                    hidden = false

                }
            }
        })()
    },[set])

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
        <h1>Set Display Page</h1>
        <SetHeader set={set} />
        <button hidden={hidden} onClick={onDelete}>DELETE SET</button>
        <EditSetForm hidden={hidden} set={set}/>
        <h4>Number of cards: {set.card.length}</h4>
        <h4>Number of likes: {set.like.length}</h4>
        <h4>Number of favorites: {set.favorite.length}</h4>
        <CreateCardForm setId={setId} />
        {set.cards.map((card) => (<>
            <CardListItem card={card} hidden={hidden} />
            {/* <button hidden={hidden}>DELETE</button> */}
        </>))}

    </>)
}
