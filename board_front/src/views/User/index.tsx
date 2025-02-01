import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useNavigate, useParams } from 'react-router-dom';
import { BoardItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardListItem from 'components/BoardListItem';
import { BOARD_PATH, BOARD_WRITE_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';

export default function User() {

  //네비게이트 함수 
  const navigate = useNavigate();
  
  // userEmail Path variable 상태
  const {userEmail} = useParams(); 

  //로그인 유저 상태 
  const {loginUser} = useLoginUserStore();

  //마이페이지 여부 상태
  const [isMyPage, setMyPage] = useState<boolean>(true);
  
  //유저화면 상단 컴포넌트
  const UserTop = () => {

    //이미지 파일 input 참조 
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //닉네임 변경 여부 상태
    const[isNicknameChange, setNicknameChange] = useState<boolean>(false);

    //닉네임 상태
    const[nickname, setNickname] = useState<string>('');

    //변경 닉네임 상태
    const[changeNickname, setChangeNickname] = useState<string>('');

    //프로필 이미지 상태
    const[profileImage, setProfileImage] = useState<string | null>(null);

    //프로필 박스 클릭 이벤트 핸들러 
    const onProfileBoxClickHandler = () => {
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    //닉네임 수정 버튼 클릭 이벤트 핸들러 
    const onNicknameEditButtonClickHandler = () =>{
      setChangeNickname(nickname);
      setNicknameChange(!isNicknameChange);
    }

    //프로필 이미지 변경 이벤트 핸들러 
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      if(!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }

    //닉네임 변경 이벤트 핸들러 
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const { value } = event.target;
      setChangeNickname(value);
    }

    //email path variable 변경시 effect
    useEffect(()=>{
      if(!userEmail) return;
      setNickname('나는주코야키');
      setProfileImage('https://game.donga.com/media/__sized__/images/2025/1/31/9d89fd10543e45bb-thumbnail-1920x1080-70.jpg');
    },[userEmail])

    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className='user-top-my-profile-image-box'>
            {profileImage !== null ?
            <div className='user-top-profile-image' style={{backgroundImage: `url(${profileImage})`}} onClick={onProfileBoxClickHandler}></div> :
            <div className='icon-box-large'>
              <div className='icon image-box-white-icon'></div>
            </div>
            }
            <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onProfileImageChangeHandler} />
          </div> :
          <div className='user-top-profile-image-box' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
          }
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ?
              <>
              {isNicknameChange ?
              <input className='user-top-info-nickname-input' type='text' size={nickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/> :  
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
            </div>
            <div className='user-top-info-email'>{'email@email.com'}</div>
          </div>
        </div>
      </div>
    );
  }

  //유저화면 하단 컴포넌트
  const UserBottom = () => {

    // 게시물 갯수 상태
    const [count, setCount] = useState<number>(1);

    // 게시물 리스트 상태(임시)
    const[userBoardList, setUserBoardList] = useState<BoardItem[]>([]);

    //side card 클릭 이벤트 핸들러 
    const onSideCardClickHandler = () => {
      if(isMyPage) navigate(BOARD_WRITE_PATH());
      else if(loginUser) navigate(USER_PATH(loginUser.email));
    };

    //userEmail path variable이 변경될 때마다 실행할 함수 
    useEffect(()=>{
      setUserBoardList(latestBoardListMock);
    },[userEmail])

    return(
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
          <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
          <div className='user-bottom-contents-box'>
            {count == 0 ?
            <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
            <div className='user-bottom-contents'>
              {userBoardList.map(boardListItem => <BoardListItem boardListItem={boardListItem}/>)}
            </div>
            }
            <div className='user-bottom-side-box'>
              <div className='user-bottom-side-card' onClick={onSideCardClickHandler}>
                <div className='user-bottom-side-container'>
                  {isMyPage ?
                  <>
                  <div className='icon-box'>
                    <div className='icon edit-icon'></div>
                  </div>
                  <div className='user-bottom-side-text'>{'글쓰기'}</div>
                  </>:
                  <>
                  <div className='user-bottom-side-text'>{'글쓰기'}</div>
                  <div className='icon-box'>
                    <div className='icon arrow-right-icon'></div>
                  </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='user-bottom-pagination-box'></div>
        </div>
      </div>
    );
  }
  
  return (
    <>
    <UserTop />
    <UserBottom />
    </>
  )
}
