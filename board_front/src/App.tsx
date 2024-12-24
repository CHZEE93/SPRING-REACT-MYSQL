import BoardListItem from 'components/BoardListItem';
import { latestBoardListMock } from 'mocks';
import React from 'react';

function App() {
  return (
    <>
      {latestBoardListMock.map(boardListItem => <BoardListItem boardListItem={boardListItem} />)}
    </>
  );
}

export default App;
