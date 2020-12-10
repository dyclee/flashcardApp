import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet, editSet } from '../store/actions/sets';
import { Redirect, useParams } from 'react-router-dom';

import { ActionAndCancelButtons, AddTitle, AddDescription, AddSubject } from './FormInputs';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


export const CreateSetForm = ({subjectOptions}) => {
    const user = useSelector(state => state.userReducer.user)

    const dispatch = useDispatch()

    const [title, setTitle] = useState()
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)

    const [redirect, setRedirect] = useState(false)
    const [createdSetId, setCreatedSetId] = useState()

    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)

    const onCreate = async (e) => {
        e.preventDefault();
        setOpen(false);
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

export function EditSetForm({set, hidden}) {
    const { setId } = useParams()
    // const set = useSelector(state => state.setReducer[setId])
    // console.log("SETID", setId, "--------SET,", set)
    const user = useSelector(state => state.userReducer.user)
    const subjectOptions = useSelector(state => state.setReducer.subjects)

    const dispatch = useDispatch()

    const [title, setTitle] = useState(set.title)
    const [subject, setSubject] = useState(set.subject.name)
    const [description, setDescription] = useState(set.description)
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)

    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)


    const onEdit = async (e) => {
        e.preventDefault();
        setOpen(false)
        const res = await fetch(`/api/sets/${set.id}/edit`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title,
                description,
                subject,
                created_by: user.id
            })
        });
        const editedSet = await res.json()
        dispatch(editSet(editedSet))
        // window.location.reload(false)
    }
    if (!set) return null;
    return (<>
        <div>
            <button hidden={hidden} onClick={handleOpen}>Edit Set</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {set.title}</DialogTitle>
                <DialogContent>
                <AddTitle title={title} setTitle={setTitle} />
                <AddDescription description={description} setDescription={setDescription} />
                <AddSubject subjects={subjectOptions} subject={subject} setSubject={setSubject} />
                <ActionAndCancelButtons handleClose={handleClose} onAction={onEdit} actionName={"Save"} />
                </DialogContent>
            </Dialog>
        </div>
    </>)
}
