import React, { useEffect, useState } from 'react'
import './style.css'
import { CommentItem, FavoriteItem } from 'types/interface'
import { commentListMock, favoriteListMock } from 'mocks'
import FavoriteListItem from 'components/FavoriteListItem'
import CommentListItem from 'components/CommentListItem'
import Pagenation from 'components/Pagination'
import defaultProfileImage from 'assets/image/default-profile-image.png'

export default function BoardDetail() {

  //more 버튼 상태
  const [showMore, setShowMore] = useState<boolean>(false);

  //more 버튼 클릭 이벤트 핸들러
  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  }

  //상단 컴포넌트
  const BoardDetailTop = () => {
    return(
      <div id='board-detail-top'>
          <div className='board-detail-top-header'>
            <div className='board-detail-title'>{'제목입니다.'}</div>
            <div className='board-detail-top-sub-box'>
              <div className='board-detail-write-info-box'>
                <div className='board-detail-writer-profile-image' style ={{ backgroundImage: `url(${defaultProfileImage})`}}></div>
                <div className='board-detail-writer-nickname'>{'안녕하세요나는주코야끼'}</div>
                <div className='board-detail-writer-info-divider'>{'\|'}</div>
                <div className='board-detail-write-date'>{'2025. 01. 01.'}</div>
              </div>
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='icon more-icon'></div>
              </div>
              {showMore && 
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button'>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button'>{'삭제'}</div>
              </div>
              }
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-top-main'>
            <div className='board-detail-main-text'>{'연말 잘 보내시고 감기 조심하세요 선생님 감사합니다. 연말 잘 보내시고 감기 조심하세요 선생님 감사합니다. 연말 잘 보내시고 감기 조심하세요 선생님 감사합니다.연말 잘 보내시고 감기 조심하세요 선생님 감사합니다.'}</div>
            <img className='board-detail-main-image' src='https://happybean-phinf.pstatic.net/20241226_294/1735180081877fEsCi_JPEG/SUM_%25A9%25E1%25A8%25E11.jpg' />
          </div>
      </div>
    )
  }

  //하단 컴포넌트
  const BoardDetailBottom = () => {

    const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);
    const [commentList, setCommentList] = useState<CommentItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    },[]);

    return(
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon button'>
              <div className='icon favorite-fill-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${12}`}</div>
            <div className='icon button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${12}`}</div>
            <div className='icon button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
        </div>
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요'}<span className='emphasis'>{12}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              {favoriteList.map(item => <FavoriteListItem favoriteListItem={item} />)}
            </div>
          </div>
        </div>
        <div className='board-detail-bottom-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{'댓글'}<span className='emphasis'>{12}</span></div>
            <div className='board-detail-bottom-comment-list-container'>
              {commentList.map(item => <CommentListItem commentListItem={item} />)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-bottom-comment-pagination-box'>
            <Pagenation />
          </div>
          <div className='board-detail-bottom-comment-input-container'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.'/>
              <div className='board-detail-bottom-comment-button-box'>
                <div className='disalbe-button'>{'댓글달기'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 상세 컴포넌트 렌더링
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop/>
        <BoardDetailBottom/>
      </div>
    </div>
  )
}
