import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import pencil from '../icons/pencil-alt.svg';
import trashcan from '../icons/trash-alt.svg';
import {EditSetForm, DeleteSetForm} from './SetForm';
import {CreateCardForm} from './CardForm';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import { Avatar, makeStyles } from '@material-ui/core';
import userCircle from '../icons/userCircle.svg';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


export default function SetHeader({set, hidden, onDelete}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.userReducer.user);
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const id = set.id;

    const isFave = faves[id];
    const isLike = likes[id].exists;
    const count = likes[id].count;

    // console.log("SET", set)
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
                <div className="setheader-topline">
                    <div className="setheader-title">{set.title}</div>
                    <div className="setheader-icons">
                        <img className="setheader-icon" src={pencil} hidden={hidden} name="edit" onClick={handleOpen} />
                        <DeleteSetForm set={set} hidden={hidden} />
                    </div>
                </div>
                <div className="setheader-description">{set.description}</div>
                <div className="setheader-creator">
                    Made by:
                    <div className="whitespace"></div>
                    {<Avatar alt={`${set.creator.username}`} src={set.creator.avatarUrl === "/user-circle.svg" ? userCircle : set.creator.avatarUrl} className={classes.small}/>}
                    <Link to={`/users/${set.creator.id}`} style={{ color: '#00897b', textDecoration: 'none' }}><strong className="setheader-user" ><i> {set.creator.username}</i></strong></Link>
                </div>
                <div className="setheader-stats">
                    <CreateCardForm setId={id} hidden={hidden} />
                    <FaveIcon id={id} isFave={isFave} user={user} />
                    <div>
                        <LikeIcon id={id} count={count} isLike={isLike} user={user}/>
                        <strong className="homedisplay__count">{count}</strong>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
