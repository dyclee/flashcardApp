import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import pencil from '../icons/pencil-alt.svg';
import trashcan from '../icons/trash-alt.svg';
import {EditSetForm} from './SetForm';


export default function SetHeader({set, hidden, onDelete}) {
    const [open, setOpen] = useState(false)
    const handleOpen = (e) => setOpen(true)
    // console.log("SET", set)
    if (!set) return null;
    return (<>
        <EditSetForm
            set={set}
            hidden={hidden}
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
        />
        <div className="setheader-container">
            <div className="setheader">
                <div className="setheader-title">{set.title}</div>
                <div className="setheader-description">{set.description}</div>
                <div className="setheader-creator">Made by <i>{set.creator.username}</i></div>
            </div>
            <div className="setheader-icons">
                <img src={pencil} hidden={hidden} name="edit" onClick={handleOpen} />
                <img src={trashcan} hidden={hidden} name="delete" onClick={onDelete} />
            </div>
        </div>
    </>)
}
