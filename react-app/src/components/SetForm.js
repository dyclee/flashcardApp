import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet, getSets, getUserSets } from '../store/actions/sets';
import { Redirect } from 'react-router-dom';

import { ActionAndCancelButtons, AddTitle, AddDescription, AddSubject } from './FormInputs';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


export const CreateSetForm = () => {
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const [title, setTitle] = useState()
    const [subject, setSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState()
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)

    const [redirect, setRedirect] = useState(false)
    const [createdSetId, setCreatedSetId] = useState()

    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)

    useEffect(() => {
        (async() => {
            const res = await fetch('/api/subjects');
            const subjectArray = await res.json();
            setSubjectOptions(subjectArray)
            return;
        })()
    }, [])

    const onCreate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/sets/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                subject,
                description,
                created_by: user.id,
            })
        })
        if (res.ok) {
            const resObj = await res.json()
            console.log("SUCCESSFUL RES", resObj)
            dispatch(createSet(resObj))
            handleClose()
            setCreatedSetId(resObj.id)
            setRedirect(true)
        }
    }
    if (redirect) return <Redirect to={`/set/${createdSetId}`} />
    return (<>

        <button onClick={handleOpen}>Create Set</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="setForm-dialog-title">Create a new set</DialogTitle>

            <DialogContent>
                <AddTitle title={title} setTitle={setTitle} />
                <AddDescription description={description} setDescription={setDescription} />
                <AddSubject subjects={subjectOptions} subject={subject} setSubject={setSubject} />
                <ActionAndCancelButtons handleClose={handleClose} onAction={onCreate} actionName={"Create"} />
            </DialogContent>
        </Dialog>
    </>)
}
