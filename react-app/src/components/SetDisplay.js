import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import SetHeader from './SetHeader';
import CardListItem from './CardListItem';


export default function SetDisplay() {
    const { setId } = useParams()

    const [set, setSet] = useState()
    const [cards, setCards] = useState([])
    const [likes, setLikes] = useState([])
    const [favorites, setFavorites] = useState([])

    const [hidden, setHidden] = useState(true)

    const [userLike, setUserLike] = useState([])
    const [userFavorite, setUserFavorite] = useState([])

    const user = useSelector(state => state.userReducer.user)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async() => {
            const res = await fetch(`/api/sets/${setId}`)
            const resObj = await res.json()
            console.log("RES ", resObj)
            if (resObj.createdBy.id === user.id) {
                setHidden(false)
            }
            setSet(resObj)
            setCards(resObj.card)
            setLikes(resObj.like)
            setFavorites(resObj.favorite)
            return
        })()
    },[])

    const onDelete = async (e) => {
        e.preventDefault();

        // dispatch(deleteSet(set))
        const res = await fetch(`/api/sets/${setId}/delete`, {
            method: "DELETE"
        });
        const deleted = await res.json();
        console.log(deleted);
        return history.push('/')
    }

    // console.log("CARDS", cards)
    // console.log("LIKES", likes)
    // console.log("FAVORITES", favorites)
    // if
    return (<>
        <h1>Set Display Page</h1>
        <SetHeader set={set} />
        <button hidden={hidden} onClick={onDelete}>DELETE SET</button>

            <h4>Number of cards: {cards.length}</h4>
            <h4>Number of likes: {likes.length}</h4>
            <h4>Number of favorites: {favorites.length}</h4>
            {cards.map((card) => (<>
                <CardListItem card={card} hidden={hidden} />
                {/* <button hidden={hidden}>DELETE</button> */}
            </>))}

    </>)
}
