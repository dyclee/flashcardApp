import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FilterButton() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handlePopularity = () => {
      let sortedSet = sets.sort((a, b) => {
        return b.num_upvotes - a.num_upvotes;
      });
      setSets(sortedSet);
      setAnchorEl(null);
    };

    const handleDate = () => {
      let sortedSet = sets.sort((a, b) => {
        return b.id - a.id;
      });
      setSets(sortedSet);
      setAnchorEl(null);
    };

    const handleCount = () => {
      let sortedSet = sets.sort((a, b) => {
        return b.card_count - a.card_count;
      });
      setSets(sortedSet);
      setAnchorEl(null);
    };

    return (
      <div>
        <Button className={classes.button} onClick={handleOpen}>
          Filter
        </Button>
        <FormControl className={classes.formControl}>
          {/* <InputLabel id="demo-controlled-open-select-label">Age</InputLabel> */}
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
