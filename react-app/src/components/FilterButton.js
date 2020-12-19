import React from 'react';
import {useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { getSets } from '../store/actions/sets';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";


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

export default function FilterButton({sets, setSetArr}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handlePopularity = () => {
        const setArr = [];
        for (let key in sets) {
            setArr.push({ [key]: sets[key] })
            // console.log("SET ARR", setArr)
        }
        // console.log("SET ARR", setArr)
        let sortedSets = setArr.sort((a, b) => {
            let akey = Object.keys(a)[0]
            let bkey = Object.keys(b)[0]
            return b[bkey].like.length - a[akey].like.length;
        });
        // console.log("SORTED SETS", sortedSets)
        setSetArr(sortedSets);
        setAnchorEl(null);
    };

    const handleDate = () => {
      let sortedSet = sets.sort((a, b) => {
        return b.id - a.id;
      });
      dispatch(getSets(sortedSet));
      setAnchorEl(null);
    };

    const handleCount = () => {
      let sortedSet = sets.sort((a, b) => {
        return b.card_count - a.card_count;
      });
      dispatch(getSets(sortedSet));
      setAnchorEl(null);
    };

    // console.log("SETS FROM FILTER BUTTON", sets);
    return (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ color: "#00695f" }}
          >
            Filter <FilterListIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handlePopularity}>
              <Link to="/" style={{ color: '#00897b' }}>Likes</Link>
            </MenuItem>
            <MenuItem onClick={handleDate}>
              <Link to="/" style={{ color: '#00897b' }}>Newest</Link>
            </MenuItem>
            <MenuItem onClick={handleCount}>
              <Link to="/" style={{ color: '#00897b' }}># Cards</Link>
            </MenuItem>
          </Menu>
        </div>
      );
  }
