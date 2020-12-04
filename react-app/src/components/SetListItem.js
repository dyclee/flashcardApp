import React from 'react';


const SetListItem = ({ set }) => {
    return (<>
        <div>
            <h5>{set.title} - {set.description}</h5>
        </div>

    </>)
}

export default SetListItem;
