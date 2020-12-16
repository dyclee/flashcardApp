import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet, editSet } from '../store/actions/sets';
import { Redirect, useParams } from 'react-router-dom';
import { addSubject } from '../store/actions/subjects';

import { ActionAndCancelButtons, AddTitle, AddDescription, AddSubject } from './FormInputs';
import { Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';

export const CreateSubjectForm = ({setSubject, handleOpenSubject, openSubject, setOpenSubject}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState()
    // const [openSubject, setOpenSubject] = useState(false)
    const [errors, setErrors] = useState([])

    // const handleOpenSubject = (e) => setOpenSubject(true)
    const handleCloseSubject = (e) => setOpenSubject(false)

    const onCreate = async (e) => {
        e.preventDefault()
        handleCloseSubject()
        const res = await fetch(`/api/subjects/create/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name
            })
        });
        if (res.ok) {
            const newSubject = await res.json();
            dispatch(addSubject(newSubject));
            setSubject(newSubject.name);
            setName()
        }
    }

    const updateName = (e) => setName(e.target.value)

    return (<>
        {/* <button onClick={handleOpenSubject}>Create Subject</button> */}
        <Dialog open={openSubject} onClose={handleCloseSubject}>
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
                    <ActionAndCancelButtons handleClose={handleCloseSubject} onAction={onCreate} actionName={"Create"} />
                </DialogContent>
        </Dialog>
    </>)
}
