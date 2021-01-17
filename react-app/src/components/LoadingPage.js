import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function LoadingPage () {
    // const classes = useStyles();

    return (<>
      <div className="loadingpage">
        <CircularProgress color="secondary" size={100} thickness={4}/>
        <div className="loadingMsg">Loading...</div>
      </div>
    </>);
}
