import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSets } from '../store/actions/sets';
import SetListItem from './SetListItem';
import { CreateSetForm } from './SetForm';


const HomeDisplay = () => {
    const allSets = useSelector(state => state.setReducer.allSets);


    if (!allSets) return null;

    return (<>
            <article>
                <h1>All Sets</h1>
                <CreateSetForm />
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
