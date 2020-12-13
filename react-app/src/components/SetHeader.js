import React from 'react';
import { useSelector } from 'react-redux';


export default function SetHeader({set}) {

    // console.log("SET", set)
    if (!set) return null;
    return (<>
    <div className="setheader">
        <div className="setheader-title">{set.title}</div>
        <div className="setheader-description">{set.description}</div>
        <div className="setheader-creator">Creator: {set.creator.username}</div>
    </div>
    </>)
}
