import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullTabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} centered aria-label="simple tabs example">
            <Tab label="Cards" value="1" />
            <Tab label="Quiz" value="2" />
            {/* <Tab label="" value="3" /> */}
          </TabList>
        </AppBar>
        <TabPanel value="1">Cards</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </div>
  );
}
