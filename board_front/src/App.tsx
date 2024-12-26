import BoardListItem from 'components/BoardListItem';
import CommentListItem from 'components/CommentListItem';
import FavoriteListItem from 'components/FavoriteListItem';
import InputBox from 'components/InputBox';
import Top3ListItem from 'components/Top3ListItem';
import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
import React, { useState } from 'react';
import 'App.css';

/*{latestBoardListMock.map(boardListItem => <BoardListItem boardListItem={boardListItem} />)}
<div style={{display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3ListItem top3ListItem={top3ListItem} /> )}
      </div>
<div style={{padding: '0 20px', display:'flex', flexDirection:'column', gap:'30px'}}>
        {commentListMock.map(commentListItem => <CommentListItem commentListItem={commentListItem}/>)}
      </div>
<div style={{display:'flex', columnGap:'30px', rowGap:'20px'}}>
        {favoriteListMock.map(favoriteList => <FavoriteListItem favoriteListItem={favoriteList} />)}
      </div>
*/

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='aaaa'/>
    </>
  );
}

export default App;
