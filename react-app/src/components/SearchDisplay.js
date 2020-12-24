import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchListItem from './SearchListItem';
import { Button } from '@material-ui/core';

export default function SearchDisplay() {
    const history = useHistory();
    const searchObj = useSelector(state => state.searchReducer)

    const goHome = (e) => {
        return history.push('/');
    }
    // console.log("SEARCH OBJ", searchObj)
    if (!searchObj.foundSets) {
        console.log("THIS?")
        return (<>
            <div className="search-title-container">
                <div className="search-title">Search expired</div>
                <div>
                    <Button onClick={goHome} variant="contained" color="primary">GO HOME</Button>
                </div>
            </div>
        </>)
    }
    if (!searchObj.foundSets.length && !searchObj.foundSubjects.length && !searchObj.foundCards.length && !searchObj.foundUsers.length) {
        return (<>
            <div className="search-title-container">
                <div className="search-title">No results found for '{searchObj.searchTerm}'</div>
                <div>
                    <Button onClick={goHome} variant="contained" color="primary">GO HOME</Button>
                </div>
            </div>
        </>)
    }
    return (<>
        <div className="search-title">Search results for '{searchObj.searchTerm}'</div>
        <div className="search-container">
            {searchObj.foundSets.map((set) => {
                return (<>
                    <Link to={`/set/${set.id}`} className="homedisplay__links">
                        <SearchListItem item={set} />
                    </Link>
                </>)
            })}
            {searchObj.foundSubjects.map((subject) => {
                return (<>
                    <Link to={`/subjects/${subject.id}`} className="homedisplay__links">
                        <SearchListItem item={subject} />
                    </Link>
                </>)
            })}
            {searchObj.foundUsers.map((user) => {
                return (<>
                    <Link to={`/users/${user.id}`} className="homedisplay__links">
                        <SearchListItem item={user} />
                    </Link>
                </>)
            })}
        </div>
        <div className="search-title-card">{searchObj.foundCards.length} cards containing '{searchObj.searchTerm}'</div>
        <div className="cards-container">
            <div className="card-grid">
                {searchObj.foundCards.map((card) => {
                    return (<>
                        <SearchListItem item={card} />
                    </>)
                })}
            </div>
        </div>
    </>)
}
