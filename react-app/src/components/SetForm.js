import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet } from '../store/actions/sets';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


const CreateSetForm = () => {
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const [title, setTitle] = useState()
    const [subject, setSubject] = useState()
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])

    const handleOpen = (e) => setOpen(true)
    const handleClose = (e) => setOpen(false)

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
            console.log("SUCCESSFUL RES", res)
            dispatch(createSet(res))
        }
    }
}
