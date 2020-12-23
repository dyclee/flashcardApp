import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FlashcardList from './FlashcardList';
import Quiz from './Quiz';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    top: 'auto',
    bottom: 0,
  }
}));

export default function FullTabPanel({set}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("SET IN TABNAV", set);
  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar className={classes.appbar} position="fixed" color="secondary">
          <TabList onChange={handleChange} centered aria-label="simple tabs example">
            <Tab label="Cards" value="1" />
            <Tab label="Quiz" value="2" />
            {/* <Tab label="" value="3" /> */}
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <div className="cards-container">
            <FlashcardList set={set} hidden={set.hidden} />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <Quiz setId={set.id} />
        </TabPanel>
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </div>
  );
}
