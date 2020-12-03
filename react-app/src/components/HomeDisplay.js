import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

const HomeDisplay = () => {
    const [user, setUser] = useState([])
    // const { uid } = useParams()

    useEffect(() => {
        const res = await fetch(`/users/${}`)
    })
}
