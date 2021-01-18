import React from 'react';
import userCircle from '../icons/userCircle.svg';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress } from '@material-ui/core';

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


const SetListItem = ({ set }) => {
    const classes = useStyles();
    // console.log(set)
    return (<>
        <div className="homedisplay__set-text">
            <div className="homedisplay__set-split">
                <div className="homedisplay__set-title">
                    <div className="homedisplay__set-titletext">
                      {/* <div className="set-dot"></div> */}
                      {set.title}
                    </div>
                    <div className={`${classes.root} homedisplay__set-user`}>
                        by:
                        {<Avatar alt={`${set.creator.username}`} src={set.creator.avatarUrl === "/user-circle.svg" ? userCircle : set.creator.avatarUrl} className={classes.small}/>}
                        {set.creator.username}
                    </div>
                </div>
                <div className="homedisplay__set-separator"></div>
                <div className="homedisplay__set-description">{set.description}</div>
                <div className="homedisplay__set-subject">{set.subject.name}</div>
            </div>
            <div className="homedisplay__set-cardcount"><i>{set.card.length} cards</i></div>
        </div>

    </>)
}

export default SetListItem;
