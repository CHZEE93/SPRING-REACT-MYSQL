import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'
import './style.css'
import { Board, CommentItem, FavoriteItem } from 'types/interface'
import FavoriteListItem from 'components/FavoriteListItem'
import CommentListItem from 'components/CommentListItem'
import Pagenation from 'components/Pagination'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useLoginUserStore } from 'stores'
import { useNavigate, useParams } from 'react-router-dom'
import { BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant'
import { getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest } from 'apis'
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto'
import ResponseDto from 'apis/response/response.dto'
import { GetCommentListResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto } from 'apis/response/board'
import dayjs from 'dayjs'

export default function BoardDetail() {

  //게시물 번호 path variable 상태
  const {boardNumber} = useParams();

  //로그인 유저 상태
  const {loginUser} = useLoginUserStore();

  //네비게이트 함수
  const navigator = useNavigate();

  //increase view count response 처리 함수
  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const {code} = responseBody;
    if(code == 'NB') alert('존재하지 않는 게시물입니다.');
    if(code == 'DBE') alert('데이터베이스 오류입니다.');
    return;
  }

  //상단 컴포넌트
  const BoardDetailTop = () => {
    //작성자 여부 상태
    const [isWriter, setWriter] = useState<boolean>(false);

    //more 버튼 상태
    const [board, setBoard] = useState<Board | null>(null);

    //more 버튼 상태
    const [showMore, setShowMore] = useState<boolean>(false);

    //작성일 포맷 변경 함수
    const getWriteDatetimeFormat = () => {
      if(!board) return '';
      const date = dayjs(board.writeDatetime);
      return date.format('YYYY. MM. DD.')
    }

    //get Board Response 처리 함수
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code == 'NB') alert('존재하지 않는 게시물입니다.');
      if(code == 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU'){
        navigator(MAIN_PATH());
        return;
      }

      const board:Board = {...responseBody as GetBoardResponseDto};
      setBoard(board)

      if(!loginUser){
        setWriter(false);
        return;
      }
      const isWriter = loginUser.email === board.writerEmail;
      setWriter(isWriter);
    } 

    //닉네임 클릭 이벤트 핸들러
    const onNicknameClickHandler = () => {
      if(!board) return
      navigator(USER_PATH(board.writerEmail));
    }

    //more 버튼 클릭 이벤트 핸들러
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }

    //수정 버튼 클릭 이벤트 핸들러
    const onUpdateButtonClickHandler = () => {
      //if(!board || !loginUser) return;
      //if(loginUser.email !== board.writerEmail) return;
      if(!board) return;
      navigator(BOARD_UPDATE_PATH(board.boardNumber));
    }

    //삭제 버튼 클릭 이벤트 핸들러
    const onDeleteButtonClickHandler = () => {
      //if(!board || !loginUser) return;
      //if(loginUser.email !== board.writerEmail) return;
      if(!board) return;
      //DELETE 동작작
      navigator(MAIN_PATH());
    }


    //effect : path variable 바뀔때 마다 게시물 불러오기
    useEffect(()=>{
      if(!boardNumber){
        navigator(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    if(!board) return(<></>)

    return(
      <div id='board-detail-top'>
          <div className='board-detail-top-header'>
            <div className='board-detail-title'>{board.title}</div>
            <div className='board-detail-top-sub-box'>
              <div className='board-detail-write-info-box'>
                <div className='board-detail-writer-profile-image' style ={{ backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultProfileImage})`}}></div>
                <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board.writerNickname}</div>
                <div className='board-detail-writer-info-divider'>{'\|'}</div>
                <div className='board-detail-write-date'>{getWriteDatetimeFormat()}</div>
              </div>
              {isWriter && 
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='icon more-icon'></div>
              </div>
              }
              {showMore && 
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
              </div>
              }
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-top-main'>
            <div className='board-detail-main-text'>{board.content}</div>
            {board.boardImageList.map(image => <img className='board-detail-main-image' src={image} />)}
          </div>
      </div>
    )
  }

  //하단 컴포넌트
  const BoardDetailBottom = () => {

    //댓글 textarea 참조 상태
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    //좋아요 리스트 상태
    const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);

    //댓글 리스트 상태
    const [commentList, setCommentList] = useState<CommentItem[]>([]);

    //좋아요 상태
    const [isFavorite, setFavorite] = useState<boolean>(false);

    //좋아요 상자 보기 상태
    const [showFavorite, setShowFavorite] = useState<boolean>(false);

    //댓글 상자 보기 상태
    const [showComment, setShowComment] = useState<boolean>(false);

    //댓글 상태
    const [comment, setComment] = useState<string>('');

    //get Favorite List Response 처리함수
    const getFavoriteListResponse = (responseBody:GetFavoriteListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const {favoriteList} = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);
      if(!loginUser) {
        setFavorite(false);
        return;
      }
      
      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);

    }

    //get Comment List Response 처리함수
    const getCommentListResponse = (responseBody:GetCommentListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const {commentList} = responseBody as GetCommentListResponseDto;
      setCommentList(commentList);
      
    }


    //좋아요 클릭 이벤트 핸들러러
    const onFavoriteClickHandler = () => {
      setFavorite(!isFavorite);
    }

    //좋아요 보기 클릭 이벤트 핸들러
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    }

    //댓글 보기 클릭 이벤트 핸들러
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    }

    //댓글 작성 클릭 이벤트 핸들러
    const onCommentSubmitButtonClickHandler = () => {
      if(!comment) return;
      alert('댓글 작성');
    }

    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const {value} = event.target;
      setComment(value);
      if(!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }

    //effect : path variable 바뀔때 마다 좋아요 및 댓글 리스트 불러오기기
    useEffect(() => {
      if(!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    },[]);

    return(
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button' onClick={onFavoriteClickHandler}>
              {isFavorite ?
              <div className='icon favorite-fill-icon'></div> :
              <div className='icon favorite-light-icon'></div>
              }
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteClickHandler}>
              {showFavorite ?
              <div className='icon up-light-icon'></div> :
              <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${commentList.length}`}</div>
            <div className='icon-button' onClick={onShowCommentClickHandler}>
              {showComment ?
              <div className='icon up-light-icon'></div> :
              <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
        </div>
        {showFavorite &&
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{' 좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              {favoriteList.map(item => <FavoriteListItem favoriteListItem={item} />)}
            </div>
          </div>
        </div>
        }
        {showComment &&
        <div className='board-detail-bottom-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{' 댓글 '}<span className='emphasis'>{commentList.length}</span></div>
            <div className='board-detail-bottom-comment-list-container'>
              {commentList.map(item => <CommentListItem commentListItem={item} />)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-bottom-comment-pagination-box'>
            <Pagenation />
          </div>
          {loginUser !== null &&
          <div className='board-detail-bottom-comment-input-box'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea ref={commentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler}/>
              <div className='board-detail-bottom-comment-button-box'>
                <div className={comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
              </div>
            </div>
          </div>
          }
        </div>
        }
      </div>
    )
  }

  //effect : path variable 바뀔때 마다 게시물 조회수 증가
  let effectFlag = true;
  useEffect(()=>{
    if(!boardNumber) return;
    if(effectFlag){
      effectFlag = false;
      return;
    }
    increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
  },[boardNumber])

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
