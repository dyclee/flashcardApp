import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ActionAndCancelButtons, AddQuestion, AddAnswer } from './FormInputs';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

export function CreateCardForm({setId}) {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)

    // const [redirect, setRedirect] = useState(false)
    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)

    const onCreate = async (e) => {
        e.preventDefault();
        setOpen(false)
        const res = await fetch(`/api/cards/create`, {
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
            // handleClose()
            // window.location.reload(false)
        }
    }
    // if (redirect) {
    //     console.log("HIT THIS")
    //     return <Redirect to={`/set/${setId}`} />
    // }
    return (<>
        <button onClick={handleOpen}>Create Card</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="setForm-dialog-title">Create a new card</DialogTitle>

            <DialogContent>
                <AddQuestion question={question} setQuestion={setQuestion} />
                <AddAnswer answer={answer} setAnswer={setAnswer} />
                <ActionAndCancelButtons handleClose={handleClose} onAction={onCreate} actionName={"Create"} />
            </DialogContent>
        </Dialog>
    </>)
}
