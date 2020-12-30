import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function SearchFilter() {
  const { foundSets, foundSubjects, foundUsers, foundCards } = useSelector(state => state.searchReducer);
//   console.log("FOUND SETS", foundSets)
  const classes = useStyles();
  const [state, setState] = React.useState({
    sets: false,
    subjects: false,
    users: false,
    cards: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.name === "sets" && sets === true) {
        // console.log(sets);
    }
  };

  const { sets, subjects, users, cards } = state;
  const error = [ sets, subjects, users, cards].filter((v) => v).length !== 2;

  return (
    <div className={`${classes.root} search__filter`}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={sets} onChange={handleChange} name="sets" />}
            label="Sets"
          />
          <FormControlLabel
            control={<Checkbox checked={subjects} onChange={handleChange} name="subjects" />}
            label="Subjects"
          />
          <FormControlLabel
            control={<Checkbox checked={users} onChange={handleChange} name="users" />}
            label="Users"
          />
          <FormControlLabel
            control={<Checkbox checked={cards} onChange={handleChange} name="cards" />}
            label="Cards"
          />
        </FormGroup>
        <FormHelperText>Select one or more</FormHelperText>
      </FormControl>
    </div>
  )
}
