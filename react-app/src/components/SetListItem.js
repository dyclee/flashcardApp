import React from 'react';


const SetListItem = ({ set }) => {
    console.log(set)
    return (<>
        <div className="homedisplay__set-text">
            <div className="homedisplay__set-title">{set.title}</div>
            <div className="homedisplay__set-description">{set.description}</div>
            <div className="homedisplay__set-subject">{set.subject.name}</div>
        </div>

    </>)
}

export default SetListItem;
