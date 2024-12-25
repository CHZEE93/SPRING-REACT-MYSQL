import BoardListItem from 'components/BoardListItem';
import Top3ListItem from 'components/Top3ListItem';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import React from 'react';

/*{latestBoardListMock.map(boardListItem => <BoardListItem boardListItem={boardListItem} />)}*/

function App() {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3ListItem top3ListItem={top3ListItem} /> )}
      </div>
    </>
  );
}

export default App;
