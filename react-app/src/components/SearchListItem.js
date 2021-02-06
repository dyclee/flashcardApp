import React from 'react';
import { useSelector } from 'react-redux';
import Flashcard from './Flashcard';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { Avatar } from '@material-ui/core';
import userCircle from '../icons/userCircle.svg';

export default function SearchListItem({item}) {
    const user = useSelector(state => state.userReducer.user);
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);

    if (item.title) {
        const id = item.id;

        const isFave = faves[id];
        const isLike = likes[id].exists;
        const count = likes[id].count;

        // console.log("SET STUFF", isFave, isLike, count);
        return (<>
            <div className="search__item-container set-color">
                <div className="search__item-type">
                    <div className="type-text">Set</div>
                </div>
                <div className="type-line"></div>
                <div className="search__item-header">
                    <div className="search__item-headliner">
                        {item.title}
                    </div>
                    <div className="search__item-subheader">
                        Made by: <strong><i>{item.creator.username}</i></strong>
                    </div>
                </div>
                <div className="search__item-icons">
                    <div className="icon__card-count">
                        <DynamicFeedIcon fontSize="large" variant="filled" style={{ color: "black" }}/>
                        <strong className="search__icon-placement">{item.card.length}</strong>
                    </div>
                    <div className="icon__like-count">
                        <LikeIcon id={id} count={count} isLike={isLike} user={user} disable={true}/>
                        <strong className="search__icon-placement">{count}</strong>
                    </div>
                    <div className="icon__fave">
                        <FaveIcon id={id} isFave={isFave} user={user}/>
                    </div>
                </div>
            </div>
        </>)
    }
    if (item.name) {
        return (<>
            <div className="search__item-container subject-color">
                <div className="search__item-type type-subject">
                    <div className="type-text">Subject</div>
                </div>
                <div className="type-line"></div>
                <div className="search__item-header">
                    <div className="search__item-headliner">
                        {item.name}
                    </div>
                    <div className="search__item-subheader">
                        Number of sets: <strong><i>{item.setss.length}</i></strong>
                    </div>
                </div>
            </div>
        </>)
    }
    if (item.username) {
        return (<>
            <div className="search__item-container user-color">
                <div className="search__item-type type-user">
                    <div className="type-text">User</div>
                </div>
                <div className="type-line"></div>
                <div className="search__item-header">
                    <div className="search__item-headliner search__item-user">
                        <div>{<Avatar alt={`${item.username}`} src={item.avatarUrl === "/user-circle.svg" ? userCircle : item.avatarUrl}/>}</div>
                        <div>{item.username}</div>
                    </div>
                    <div className="search__item-subheader">
                        Number of sets: <strong><i>{item.setss.length}</i></strong>
                    </div>
                </div>
            </div>
        </>)
    }

    if (item.question) {
        return (<>
            <Flashcard flashcard={item} hidden={true} />
        </>)
    }
    // return null;
}
