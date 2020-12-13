import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function FavoritesDisplay(){
    const [userFaves, setUserFaves] = useState()
    const user = useSelector(state => state.userReducer.user);
    const sets = useSelector(state => state.setReducer);
    // const subjects = sets.pop();
    console.log("USER and SETS", user, sets)

    useEffect(() => {
        (async () => {
            const setArr = Object.keys(sets).map((key) => {
                let faveObjArr = sets[key].favorites.map((faveObj) => {
                    return faveObj.userId
                })
                console.log("FAVE OBJ ARR", faveObjArr)
            })
        })()
    })

    return (<>
    </>)
}
