import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';

export default function Header() {

  // state : 로그인 유저 상태
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

  // state : Path 상태
  const {pathname} = useLocation(); 

  // state : 쿠키 상태
  const [cookie, setCookie] = useCookies();

  // state : 로그인 상태
  const [isLogin, setLogin] = useState<boolean>(false);

  // 페이지별 state
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  const [isMainPage, setMainPage] = useState<boolean>(false);
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  const [isUserPage, setUserPage] = useState<boolean>(false);

  // navigate
  const navigate = useNavigate();

  const onLogoClickHandler = () =>{
    navigate(MAIN_PATH());
  }

  //검색버튼 컴포넌트
  const SearchButton = () => {

    //검색버튼 요소 참조 상태
    const searchButtonRef = useRef<HTMLInputElement | null>(null);

    //검색버튼 상태
    const [status, setStatus] = useState<boolean>(true);

    //검색어 상태
    const[word, setWord] = useState<string>('');

    //검색어 path variable상태
    const {searchWord} = useParams();

    //search icon click이벤트 처리 함수
    const onSearchButtonClickHandler = ()=>{
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //search 변경 이벤트 처리 함수
    const onSearchBoardChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
      const value = event.target.value;
      setWord(value);
    };

    // 검색어 키 이벤트 처리 함수
    const onSearhcKeydownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(searchButtonRef == null) return;
      searchButtonRef.current?.click();
    };

    //effect 검색어 path variable 변경 될 때 마다 실행되는 함수
    useEffect(() =>{
      if(searchWord){
        setWord(searchWord);
        setStatus(true);
      }
    },[searchWord]);

    if(!status){
      return(
        <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      );
    }
    else{
      return(
        <div className='header-search-input-box'>
          <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchBoardChangeHandler} onKeyDown={onSearhcKeydownHandler}/>
          <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
            <div className='icon search-light-icon'></div>
          </div>
        </div>
      );
    }    
  }

  const MyPageButton = () => {

    const {userEmail} = useParams();

    //event Handler : 마이페이지 버튼 클릭 이벤트 처리 함수
    const onMyPageButtonClickHandler = () => {
      if(!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //event Handler : 로그인 버튼 클릭 이벤트 처리 함수
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    //event Handler : 로그아웃 버튼 클릭 이벤트 처리 함수
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    }

    if(isLogin && userEmail == loginUser?.email ){
      return <div className='black-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
    }
    
    if(isLogin){
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
    }
    else{
      return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
    }
      
  };

  const UploadButton = () => {

    //state 게시물 상태
    const {title, content, boardImageFileList, resetBoard} = useBoardStore();

    // 업로드 버튼 이벤트 핸들러
    const onUploadButtonClickHandler = () => {

    }

    if(title && content)
      return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;

    return <div className='disable-button'>{'업로드'}</div>;
  
  };

  // effect : path가 변경될 때 마다 실행
  useEffect(()=>{
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage)
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage)
    const isBoardDetailPage = pathname.startsWith(BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage)
    const isBoardWritePage = pathname.startsWith(BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage)
    const isBoardUpdatePage = pathname.startsWith(BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage)
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage)

    console.log(isBoardWritePage)
  }, [pathname])

  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Hoons Board'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton/>}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton/>}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton/>}
        </div>
      </div>
    </div>
  )
}
