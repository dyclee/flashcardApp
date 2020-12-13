import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import pencil from '../icons/pencil-alt.svg';
import trashcan from '../icons/trash-alt.svg';
import {EditSetForm} from './SetForm';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';


export default function SetHeader({set, hidden, onDelete}) {
    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.userReducer.user);
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const id = set.id;

    const isFave = faves[id];
    const isLike = likes[id].exists;
    const count = likes[id].count;

    console.log("SET", set)
    const handleOpen = (e) => setOpen(true)
    if (!set) return null;
    return (<>
        <EditSetForm
            set={set}
            hidden={hidden}
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
        />
        <div className="setheader-everything">
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
            <div className="setheader-stats">
                <AddBoxIcon fontSize="large" />
                <FaveIcon id={id} isFave={isFave} user={user} />
                <LikeIcon id={id} count={count} isLike={isLike} user={user}/>
            </div>
        </div>
    </>)
}
