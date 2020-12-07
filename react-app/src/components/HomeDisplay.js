import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSets } from '../store/actions/sets';
import SetListItem from './SetListItem';


const HomeDisplay = () => {
    const allSets = useSelector(state => state.setReducer.allSets);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await fetch(`api/sets`)
            const setObjs = await res.json();
            // console.log("SET OBJS", setObjs);
            dispatch(getSets(setObjs))
            return;
        })()
    }, [])

    const onCreate = async () => {

    }

    if (!allSets) return null;

    return (<>
            <article>
                <h1>All Sets</h1>
                <button onClick={onCreate}>CREATE SET</button>
                <div>
                    {allSets.map(set => {
                        return (<>
                            <Link to={`/set/${set.id}`}>
                                <SetListItem set={set}></SetListItem>
                            </Link>
                        </>)
                    })}
                </div>
            </article>
        </>
    )

}

export default HomeDisplay;
