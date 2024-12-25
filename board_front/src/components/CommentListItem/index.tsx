import React from 'react';
import './style.css';
import { CommentItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png'

interface Props{
    commentListItem: CommentItem
}

export default function CommentListItem({commentListItem}:Props) {

    const {nickname, profileImage, writeDateTime, content} = commentListItem;

    return (
        <div className='comment-list-item'>
            <div className='comment-list-item-top'>
                <div className='comment-list-item-profile-box'>
                    <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage  : defaultProfileImage})`}}></div>   
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{'\|'}</div>
                <div className='comment-list-item-time'>{writeDateTime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-content'>{content}</div>
            </div>
        </div>
    );
}
