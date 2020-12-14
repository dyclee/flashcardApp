import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet, editSet, deleteSet } from '../store/actions/sets';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import trashcan from '../icons/trash-alt.svg';

import { ActionAndCancelButtons, AddTitle, AddDescription, AddSubject, AddSubjectButton } from './FormInputs';
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';


export const CreateSetForm = ({handleOpen, handleClose, open, setOpen}) => {
    const user = useSelector(state => state.userReducer.user)
    const subjectOptions = useSelector(state => state.subjectReducer.subjects)

    const dispatch = useDispatch()

    const [title, setTitle] = useState()
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])
    // const [open, setOpen] = useState(false)

    const [redirect, setRedirect] = useState(false)
    const [createdSetId, setCreatedSetId] = useState()

    // const handleOpen = (e) => setOpen(true)
    // const handleClose = (e) => setOpen(false)

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
            // console.log("SUCCESSFUL RES", resObj)
            dispatch(createSet(resObj))
            handleClose()
            setCreatedSetId(resObj.id)
            setRedirect(true)
            return
        }
    }
    // console.log("REDIRECT", redirect, "------ createdSetId", createdSetId)
    if (redirect) return <Redirect to={`/set/${createdSetId}`} />
    return (<>

        <Dialog open={open}
            onClose={handleClose}
            PaperProps={{
                style: { backgroundColor: "#FFFFDE" }
            }}
        >
            <DialogTitle id="setForm-dialog-title" >Create a set</DialogTitle>

            <DialogContent>
                <AddTitle title={title} setTitle={setTitle} />
                <AddDescription description={description} setDescription={setDescription} />
                <AddSubject subjects={subjectOptions} subject={subject} setSubject={setSubject} />
                <ActionAndCancelButtons subjectButton={<AddSubjectButton setSubject={setSubject} />} handleClose={handleClose} onAction={onCreate} actionName={"Create"} />
            </DialogContent>
        </Dialog>
    </>)
}

export function DeleteSetForm({ set, hidden}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const onDelete = async (e) => {
        e.preventDefault();

        // dispatch(deleteSet(set))
        const res = await fetch(`/api/sets/${set.id}/delete`, {
            method: "DELETE"
        });
        const deleted = await res.json();
        dispatch(deleteSet(deleted))
        handleClose();
        return history.push('/')
    }
    return (<>
        <img src={trashcan} hidden={hidden} name="delete" onClick={handleOpen} />
        <Dialog open={open}
            onClose={handleClose}
            PaperProps={{
                style: { backgroundColor: "#FFFFDE" }
            }}
        >
            <DialogTitle id="setDelete-dialog-title" >Delete "<i>{set.title}"</i>?</DialogTitle>
            <DialogContent>
                <ActionAndCancelButtons handleClose={handleClose} onAction={onDelete} actionName={"Delete"} />
            </DialogContent>
        </Dialog>
    </>)

}

export function EditSetForm({set, hidden, open, setOpen, handleOpen}) {
    const { setId } = useParams()
    // const set = useSelector(state => state.setReducer[setId])
    // console.log("SETID", setId, "--------SET,", set)
    const user = useSelector(state => state.userReducer.user)
    const subjectOptions = useSelector(state => state.subjectReducer.subjects)

    const dispatch = useDispatch()

    const [title, setTitle] = useState(set.title)
    const [subject, setSubject] = useState(set.subject.name)
    const [description, setDescription] = useState(set.description)
    const [errors, setErrors] = useState([])
    // const [open, setOpen] = useState(false)

    // const handleOpen = (e) => setOpen(true)
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
        const editedSet = await res.json();
        handleClose();
        dispatch(editSet(editedSet))

    }
    if (!set) return null;
    // console.log("SUBJECT OPTIONS", subjectOptions)
    return (<>
        <div>
            {/* <button hidden={hidden} onClick={handleOpen}>Edit Set</button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: { backgroundColor: "#FFFFDE" }
                }}
            >
                <DialogTitle >Edit "<i>{set.title}</i>"</DialogTitle>
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
