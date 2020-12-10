import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSets } from '../store/actions/sets';
import SetListItem from './SetListItem';
import { CreateSetForm } from './SetForm';
import { CreateSubjectForm } from './SubjectForm';


const HomeDisplay = ({subjects}) => {
    const user = useSelector(state => state.userReducer.user);
    const sets = useSelector(state => state.setReducer);
    // const setsWithHidden = useSelector(state => {
    //     let newSets = Object.items(sets).map((pair) => {
    //         console.log(pair)
    //     })
    // })
    const allSets = Object.keys(sets).map((key) => {
        return { [key]: sets[key] }
    })

    const subjectOptions = useSelector(state => state.setReducer.subjects)


    if (!allSets) return null;

    return (<>
            <article>
                <h1>All Sets</h1>
                <CreateSetForm subjectOptions={subjectOptions}/>
                <CreateSubjectForm />
                <div>
                    {allSets.map(set => {
                        let id = Object.keys(set)[0]
                        let setObj = Object.values(set)[0]
                        return (<>
                            <Link to={`/set/${id}`}>
                                <SetListItem set={setObj}></SetListItem>
                            </Link>
                        </>)
                    })}
                </div>
            </article>
        </>
    )

}

export default HomeDisplay;
