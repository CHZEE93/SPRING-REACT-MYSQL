import React from 'react'
import { FavoriteItem } from 'types/interface'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css'

interface Props{
    favoriteListItem :FavoriteItem;
}

export default function FavoriteListItem({favoriteListItem}:Props) {

    const {profileImage, nickname} = favoriteListItem;

    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-profile-image'style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>   
            </div>
            <div className='favorite-list-item-profile-nickname'>{nickname}</div>
        </div>
    )
}
