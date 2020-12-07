import React from 'react';
import { useSelector } from 'react-redux';


export default function SetHeader({set}) {


    if (!set) return null;
    return (<>
    <div>
        <h3>Set Header</h3>
        <h4>{set.title} - {set.description}</h4>
        <h5>{set.createdBy.username}</h5>
    </div>
    </>)
}
