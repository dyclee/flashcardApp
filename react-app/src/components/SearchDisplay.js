import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchListItem from './SearchListItem';
import { Button } from '@material-ui/core';
import SearchFilter from './SearchFilter';

export default function SearchDisplay() {
    const history = useHistory();
    const searchObj = useSelector(state => state.searchReducer)

    // console.log(searchObj)

    // const [subjects, setSubjects] = useState([]);
    // const [users, setUsers] = useState([]);
    // const [cards, setCards] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         console.log("hitting this?")
    //         setSets(searchObj.foundSets);
    //         setSubjects(searchObj.foundSubjects);
    //         setUsers(searchObj.foundUsers);
    //         setCards(searchObj.foundCards);
    //         console.log(sets, subjects, users, cards)
    //     })()
    // },[])
    // setSets(searchObj.foundSets);

    const goHome = (e) => {
        return history.push('/');
    }
    // console.log("SEARCH OBJ", searchObj)
    if (!searchObj.foundSets) {
        // console.log("THIS?")
        return (<>
            <div className="search-title-container">
                <div className="homedisplay__header">
                    <div className="homedisplay__welcome">Search expired</div>
                    <div>
                        <Button onClick={goHome} variant="contained" color="primary">GO HOME</Button>
                    </div>
                </div>
            </div>
        </>)
    }
    if (!searchObj.foundSets.length && !searchObj.foundSubjects.length && !searchObj.foundCards.length && !searchObj.foundUsers.length) {
        return (<>
            <div className="search-title-container">
                <div className="homedisplay__header">
                    <div className="homedisplay__welcome">No results found for '{searchObj.searchTerm}'</div>
                    <div>
                        <Button onClick={goHome} variant="contained" color="primary">GO HOME</Button>
                    </div>
                </div>
            </div>
        </>)
    }
    // console.log("WORKING", searchObj.foundSets[0].hidden && searchObj.foundSubjects[0].hidden && searchObj.foundUsers[0].hidden && searchObj.foundCards[0].hidden)
    return (<>
    <main>
        {/* <div className="search-title">Search results for '{searchObj.searchTerm}'</div> */}
            <div className="search-title-container">
                <div className="homedisplay__header">
                    <div className="homedisplay__welcome">Search results for '{searchObj.searchTerm}'</div>
                </div>
            </div>
        <div className="search-with-filter">
            <SearchFilter />
            <div className="search-container"
                hidden={
                (searchObj.foundSets.length === 0 || searchObj.foundSets[0].hidden) &&
                (searchObj.foundSubjects.length === 0 || searchObj.foundSubjects[0].hidden) &&
                (searchObj.foundUsers.length === 0 || searchObj.foundUsers[0].hidden) &&
                (searchObj.foundCards.length === 0 || searchObj.foundCards[0].hidden)
                // searchObj.foundSets[0].hidden &&
                // searchObj.foundSubjects[0].hidden &&
                // searchObj.foundUsers[0].hidden &&
                // searchObj.foundCards[0].hidden
                }>

                {searchObj.foundSets.length && searchObj.foundSets[0].hidden ? null : searchObj.foundSets.map((set) => {
                    return (<>
                        <Link to={`/set/${set.id}`} className="homedisplay__links">
                            <SearchListItem item={set} />
                        </Link>
                    </>)
                })}
                {searchObj.foundSubjects.length && searchObj.foundSubjects[0].hidden ? null : searchObj.foundSubjects.map((subject) => {
                    return (<>
                        <Link to={`/subjects/${subject.id}`} className="homedisplay__links">
                            <SearchListItem item={subject} />
                        </Link>
                    </>)
                })}
                {searchObj.foundUsers.length && searchObj.foundUsers[0].hidden ? null : searchObj.foundUsers.map((user) => {
                    return (<>
                        <Link to={`/users/${user.id}`} className="homedisplay__links">
                            <SearchListItem item={user} />
                        </Link>
                    </>)
                })}
            </div>
        </div>
        {searchObj.foundCards.length && searchObj.foundCards[0].hidden ? null :
            <div className="search-title-container">
                    <div className="homedisplay__header">
                        <div className="homedisplay__welcome">{searchObj.foundCards.length} cards containing '{searchObj.searchTerm}'</div>
                    </div>
            </div>
        }
        {/* <div className="search-title-card">{searchObj.foundCards.length} cards containing '{searchObj.searchTerm}'</div> */}
        <div className="cards-container">
            <div className="card-grid">
                {searchObj.foundCards[0].hidden ? null : searchObj.foundCards.map((card) => {
                    return (<>
                        <SearchListItem item={card} />
                    </>)
                })}
            </div>
        </div>
    </main>
    </>)
}
