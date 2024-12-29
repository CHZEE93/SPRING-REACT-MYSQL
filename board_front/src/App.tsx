import 'App.css';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH, BOARD_DETAIL_PATH, BOARD_WRITE_PATH, BOARD_UPDATE_PATH } from 'constant';
import Container from 'layouts/Container';
import { Route, Routes } from 'react-router-dom';
import Authentication from 'views/Authentication';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import BoardWrite from 'views/Board/Write';
import Main from 'views/Main';
import Search from 'views/Search';
import User from 'views/User';
/*
import BoardListItem from 'components/BoardListItem';
import CommentListItem from 'components/CommentListItem';
import FavoriteListItem from 'components/FavoriteListItem';
import InputBox from 'components/InputBox';
import Top3ListItem from 'components/Top3ListItem';
import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
import React, { useState } from 'react';


      {latestBoardListMock.map(boardListItem => <BoardListItem boardListItem={boardListItem} />)}
      <div style={{display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3ListItem top3ListItem={top3ListItem} /> )}
      </div>
      <div style={{padding: '0 20px', display:'flex', flexDirection:'column', gap:'30px'}}>
        {commentListMock.map(commentListItem => <CommentListItem commentListItem={commentListItem}/>)}
      </div>
      <div style={{display:'flex', columnGap:'30px', rowGap:'20px'}}>
        {favoriteListMock.map(favoriteList => <FavoriteListItem favoriteListItem={favoriteList} />)}
      </div>

      const [value, setValue] = useState<string>('');
      <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='aaaa'/>
*/

function App() {

  //description: 메인화면 : '/' - Main
  //description: 로그인 + 회원가입 화면 : '/auth' - Authentication
  //description: 검색 화면 : '/search/:word' - Search
  //description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail
  //description: 게시물 작성 : '/board/write' - BoardWrite
  //description: 게시물 수정 : '/board/update/:boardNumber' - BoardUpdate

  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main/>} />
        <Route path={AUTH_PATH()} element={<Authentication/>} />
        <Route path={SEARCH_PATH(':searchWord')} element={<Search/>} />
        <Route path={USER_PATH(':userEmail')} element={<User/>} />
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        </Route>
        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
