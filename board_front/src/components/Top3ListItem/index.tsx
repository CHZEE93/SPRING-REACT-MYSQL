import React from 'react';
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { BoardItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

interface Props{
     top3ListItem : BoardItem;
}

// component
export default function Top3ListItem({top3ListItem} : Props) {

    //properties
    const {boardNumber, title, content, boardTitleImage } = top3ListItem;
    const {favoriteCount, commentCount, viewCount} = top3ListItem;
    const {writeDatetime, writeNickname, writeProfileImage } = top3ListItem;

    //function - navigate
    const navigate = useNavigate();

    //event handler
    const onClick = () => {
        navigate(BOARD_DETAIL_PATH(boardNumber));
    };

    // render
    return (
        <div className='top-3-list-item' style={{backgroundImage : `url(${boardTitleImage})`}} onClick={onClick}>
            <div className='top-3-list-item-main-box'>
                <div className='top-3-list-item-top'>
                    <div className='top-3-list-item-profile-box'>
                        <div className='top-3-list-item-profile-image' style={{backgroundImage: `url(${writeProfileImage ? writeProfileImage : defaultProfileImage})`}}></div>
                    </div>
                    <div className='top-3-list-item-write-box'>
                        <div className='top-3-list-item-nickname'>{writeNickname}</div>
                        <div className='top-3-list-item-write-date'>{writeDatetime}</div>
                    </div>
                </div>
                <div className='top-3-list-item-middle'>
                    <div className='top-3-list-item-title'>{title}</div>
                    <div className='top-3-list-item-content'>{content}</div>
                </div>
                <div className='top-3-list-item-bottom'>
                    <div className='top-3-list-item-counts'>{`댓글 ${commentCount} / 좋아요 ${favoriteCount} / 조회수 ${viewCount}`}</div>
                </div>
            </div>
        </div>
    )
}
