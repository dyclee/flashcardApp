import React from 'react';
import { useSelector } from 'react-redux';
import pencil from '../icons/pencil-alt.svg';
import trashcan from '../icons/trash-alt.svg';


export default function SetHeader({set}) {

    // console.log("SET", set)
    if (!set) return null;
    return (<>
        <div className="setheader-container">
            <div className="setheader-icons">
                <img src={pencil} name="edit" />
                <img src={trashcan} name="delete" />
            </div>
            <div className="setheader">
                <div className="setheader-title">{set.title}</div>
                <div className="setheader-description">{set.description}</div>
                <div className="setheader-creator">Creator: {set.creator.username}</div>
            </div>
        </div>
    </>)
}
