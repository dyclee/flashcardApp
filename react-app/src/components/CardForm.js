import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createCard, deleteCard } from '../store/actions/cards';
import { editSet } from '../store/actions/sets';

import { ActionAndCancelButtons, AddQuestion, AddAnswer } from './FormInputs';
import { Dialog, DialogTitle, DialogContent, Icon, SvgIcon } from '@material-ui/core';
// import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export function CreateCardForm({setId, hidden}) {
    const dispatch = useDispatch()

    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)

    // const [redirect, setRedirect] = useState(false)
    const handleOpen = (e) => {
        if (hidden) {
            alert("Unable to create card for this set.")
            return;
        }
        setOpen(true)
    }
    const handleClose = (e) => setOpen(false)

    const onCreate = async (e) => {
        e.preventDefault();
        setOpen(false)
        const res = await fetch(`/api/cards/create/`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                question,
                answer,
                setId: setId
            })
        });
        if (res.ok) {
            const resObj = await res.json()
            console.log(resObj)
            dispatch(createCard(resObj))
            const setRes = await fetch(`/api/sets/${setId}/`)
            const newSet = await setRes.json()
            // console.log("NEW SET", newSet)
            dispatch(editSet(newSet))
            setQuestion()
            setAnswer()
        }
    }
    // if (redirect) {
    //     console.log("HIT THIS")
    //     return <Redirect to={`/set/${setId}`} />
    // }
    return (<>
        <Icon component="option" fontSize="large" disabled={hidden} onClick={handleOpen}>add_box</Icon>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { backgroundColor: "#FFFFDE" }
            }}
        >
            <DialogTitle id="setForm-dialog-title" >Create a card</DialogTitle>

            <DialogContent>
                <AddQuestion question={question} setQuestion={setQuestion} />
                <AddAnswer answer={answer} setAnswer={setAnswer} />
                <ActionAndCancelButtons handleClose={handleClose} onAction={onCreate} actionName={"Create"} />
            </DialogContent>
        </Dialog>
    </>)
}

export function DeleteCardForm({flashcard, hidden, cardId, setId}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()

    const onDelete = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/cards/${cardId}/delete/`, {
            method: 'DELETE'
        })
        const deletedCard = await res.json();
        dispatch(deleteCard(deletedCard))

        const getNewSet = await fetch(`/api/sets/${setId}/`)
        const newSet = await getNewSet.json();
        // console.log("NEW SET", newSet)
        dispatch(editSet(newSet))

    }
    // console.log("HIDDEN", hidden);
    return (<>
        <Icon component="option" disabled={hidden} onClick={handleOpen}>delete_outline</Icon>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { backgroundColor: "#FFFFDE" }
            }}
        >
            <DialogTitle id="setForm-dialog-title" >Delete this card?</DialogTitle>

            <DialogContent>
                <ActionAndCancelButtons handleClose={handleClose} onAction={onDelete} actionName={"Delete"} />
            </DialogContent>
        </Dialog>
    </>)
}
