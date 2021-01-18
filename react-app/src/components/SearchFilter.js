import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { switchHidden } from '../store/actions/search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#8a3324",
    color: "white",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    color: "white",
  },

}));

export default function SearchFilter() {
    const { foundSets, foundSubjects, foundUsers, foundCards } = useSelector(state => state.searchReducer);
//   console.log("FOUND SETS", foundSets)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = React.useState({
        all: true,
        sets: false,
        subjects: false,
        users: false,
        cards: false,
    });

    const handleChange = async (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        dispatch(switchHidden(state));
    },[state])

  const { all, sets, subjects, users, cards } = state;
  const error = [ all, sets, subjects, users, cards].filter((v) => v).length !== 2;

  return (
    <div className={`${classes.root} search__filter`}>
      <FormControl component="fieldset" className={classes.formControl}>
        {/* <FormLabel className={classes.formLabel} >Type</FormLabel> */}
        <div className="searchFilter-label">Type</div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color='secondary' checked={all} onChange={handleChange} name="all" />}
            label="All"
          />
          <FormControlLabel
            control={<Checkbox color='secondary' checked={sets} onChange={handleChange} name="sets" />}
            label="Sets"
          />
          <FormControlLabel
            control={<Checkbox color='secondary' checked={subjects} onChange={handleChange} name="subjects" />}
            label="Subjects"
          />
          <FormControlLabel
            control={<Checkbox color='secondary' checked={users} onChange={handleChange} name="users" />}
            label="Users"
          />
          <FormControlLabel
            control={<Checkbox color='secondary' checked={cards} onChange={handleChange} name="cards" />}
            label="Cards"
          />
        </FormGroup>
        <FormHelperText className={classes.formLabel}>Select one or more</FormHelperText>
      </FormControl>
    </div>
  )
}
