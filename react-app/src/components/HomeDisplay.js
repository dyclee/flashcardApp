import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';

const HomeDisplay = () => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        const res = await fetch(`/users/${}`)
    })
}
