import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardListItem from 'components/BoardListItem';
import { SEARCH_PATH } from 'constant';
import { usePagination } from 'hooks';
import Pagination from 'components/Pagination';

export default function Search() {
  //페이지네이션 관련 상태
  const{currentPage,currentSection,viewList,viewPageList,totalSection,
    setCurrentPage, setCurrentSection, setTotalList} = usePagination<BoardItem>(5);

  // searchWord Path Variable 상테
  const {searchWord} = useParams();

  //검색 게시물 갯수 상태
  const [count, setCount] = useState<number>(0);

  //검색 게시물 리스트 상태(임시)
  const [searchBoardList, setSearchBoardList] = useState<BoardItem[]>([]);

  //관련 검색어 리스트 상태
  const [relationList, setRelationList] = useState<string[]>([]);

  //네비게이트 함수 
  const navigate = useNavigate();

  //연관 검색어 클릭 이벤트 처리 
  const onRelationWordClickHandler = (word:string) => {
    navigate(SEARCH_PATH(word));
  };

  //첫 마운트시 실행될 effect
  useEffect(()=>{
  },[searchWord])

  if(!searchWord) return(<></>)
  return (
    <div id='search-wrapper'>
      <div className='search-container'>
        <div className='search-title-box'>
          <div className='search-title'><span className='search-title-emphasis'>{searchWord}</span>{'에 대한 검색결과 입니다.'}</div>
          <div className='search-count'>{count}</div>
        </div>
        <div className='search-contents-box'>
          {count == 0 ?
          <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
          <div className='search-contents'>{searchBoardList.map(boardListItem => <BoardListItem boardListItem={boardListItem} />)}</div>
          }
          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'>{'관련 검색어'}</div>
                {relationList.length === 0 ?
                <div className='search-relation-card-contents-nothing'>{'검색 결과가 없습니다.'}</div>:
                <div className='search-relation-card-contents'>
                  {relationList.map(relationListItem => <div className='word-badge' onClick={() => onRelationWordClickHandler(relationListItem)}>{relationListItem}</div>)}
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
          {count !== 0 && 
          <Pagination 
          currentPage={currentPage}
          currentSection={currentSection}
          setCurrentPage={setCurrentPage}
          setCurrentSection={setCurrentSection}
          viewPageList={viewPageList}
          totalSection={totalSection}
          />
          }
        </div>
      </div>
    </div>
  )
}
