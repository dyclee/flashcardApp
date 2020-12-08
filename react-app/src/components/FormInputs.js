import React from 'react';
import {
    Button, TextField, DialogActions, InputLabel, MenuItem, Select, FormControl
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export function ActionAndCancelButtons({handleClose, onAction, actionName }) {
    return (
        <DialogActions>
            <Button onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={onAction}>
                {actionName}
            </Button>
        </DialogActions>
    )
}

export function AddTitle({ title, setTitle }) {
    const updateTitle = (e) => setTitle(e.target.value)
    return (
        <TextField
            autoFocus
            defaultValue={title}
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={updateTitle}
            required
        />
    )
}

export function AddDescription({ description, setDescription }) {
    const updateDescription = (e) => setDescription(e.target.value)
    return (
      <TextField
        autoFocus
        value={description}
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        onChange={updateDescription}
      />
    )
  }

export function AddQuestion({ question, setQuestion }) {
    const updateQuestion = (e) => setQuestion(e.target.value)
    return (
        <TextField
            autoFocus
            value={question}
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            onChange={updateQuestion}
        />
    )
}
export function AddAnswer({ answer, setAnswer }) {
    const updateAnswer = (e) => setAnswer(e.target.value)
    return (
        <TextField
            autoFocus
            value={answer}
            margin="dense"
            id="answer"
            label="Answer"
            type="text"
            fullWidth
            onChange={updateAnswer}
        />
    )
}

export function AddSubject({ subject, setSubject, subjects }) {
    const classes = useStyles();
//   const [disableToggle, setDisableToggle] = useState(false);
//   const [hidden, setHidden] = useState(false);

    const updateSubject = (e) => setSubject(e.target.value)

    return (<>
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select onChange={updateSubject} label="Subject" value={subject}>
            <MenuItem value={"None"}>None</MenuItem>
            {subjects.map(sub => {
                return (
                    <MenuItem value={sub}>{sub}</MenuItem>
                )
            })}
        </Select>

    </FormControl>
    {/* <TextField
        disabled={!disableToggle}
        autoFocus
        value={subject}
        margin="dense"
        id="subject"
        label="Create Subject"
        type="text"
        fullWidth
        onChange={updateSubject}
    /> */}
    </>)
}
