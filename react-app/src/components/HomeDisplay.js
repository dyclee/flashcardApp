import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSets } from '../store/actions/sets';


const HomeDisplay = () => {
    const allSets = useSelector(state => state.setReducer.allSets);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await fetch(`api/sets`)
            const setObjs = await res.json();
            console.log("ALL SETS", setObjs);
            dispatch(getSets(setObjs))
            return;
        })()
    }, [])

    console.log("DOM SETS", allSets);
    if (!allSets) return null;


    return (
        <h1>ALL THE SETS LEGGO</h1>
    )

}

export default HomeDisplay;
