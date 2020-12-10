import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet, editSet } from '../store/actions/sets';
import { Redirect, useParams } from 'react-router-dom';
import { createSubject } from '../store/actions/sets';

import { ActionAndCancelButtons, AddTitle, AddDescription, AddSubject } from './FormInputs';
import { Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';

export const CreateSubjectForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState()
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState([])

    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)

    const onCreate = async (e) => {
        e.preventDefault()
        setOpen(false)
        const res = await fetch(`/api/subjects/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name
            })
        });
        if (res.ok) {
            const newSubject = await res.json();
            console.log("NEW SUBJECT", newSubject)
            dispatch(createSubject(newSubject))
        }
    }

    const updateName = (e) => setName(e.target.value)

    return (<>
        <button onClick={handleOpen}>Create Subject</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="subjectForm-dialog-title">Create a new subject</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={name}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={updateName}
                    />
                    <ActionAndCancelButtons handleClose={handleClose} onAction={onCreate} actionName={"Create"} />
                </DialogContent>
        </Dialog>
    </>)
}
