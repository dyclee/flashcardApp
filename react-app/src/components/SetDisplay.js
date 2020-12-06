import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


export default function SetDisplay() {
    const { setId } = useParams()
    const [cards, setCards] = useState([])
    const [likes, setLikes] = useState([])
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        (async() => {
            const res = await fetch(`/api/sets/${setId}`)
            const resObj = await res.json()
            // console.log("RES ", resObj)
            setCards(resObj.card)
            setLikes(resObj.like)
            setFavorites(resObj.favorite)
            return
        })()
    },[])

    console.log("CARDS", cards)
    console.log("LIKES", likes)
    console.log("FAVORITES", favorites)
    // if
    return (<>
        <h1>Set Display Page</h1>
            <h4>Number of cards: {cards.length}</h4>
            <h4>Number of likes: {likes.length}</h4>
            <h4>Number of favorites: {favorites.length}</h4>
            {cards.map((card) => (
                <ul>
                    <li>Q: {card.question}</li>
                    <li>A: {card.answer}</li>
                </ul>
            ))}

    </>)
}
