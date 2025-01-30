import React, { useEffect, useState } from 'react'
import './style.css'
import Top3ListItem from 'components/Top3ListItem'
import { BoardItem } from 'types/interface'
import { latestBoardListMock, top3BoardListMock } from 'mocks'
import BoardListItem from 'components/BoardListItem'
import Pagination from 'components/Pagination'
import { useNavigate } from 'react-router-dom'
import { SEARCH_PATH } from 'constant'
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis'
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board'
import ResponseDto from 'apis/response/response.dto'
import { usePagination } from 'hooks'
import { GetPopularListResponseDto } from 'apis/response/search'

export default function Main() {

  //네비게이트 함수 
  const navigate = useNavigate();

  //상단 컴포넌트
  const MainTop = () => {

    //주간 top3 게시물 리스트 상태
    const [top3BoardList, setTop3BoardList] = useState<BoardItem[]>([]);

    // get Top3 Board List Response 처리 함수
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const {top3List} = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }
    
    //첫 마운트시 실행될 함수
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);

    return(
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'Hoons board에서 다양한 이야기를 나눠보세요'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'></div>
            <div className='main-top-contents'>
              {top3BoardList.map(top3BoardListItem => <Top3ListItem top3ListItem={top3BoardListItem}/>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  //하단 컴포넌트
  const MainBottom = () => {

    //페이지네이션 관련 상태
    const{currentPage,currentSection,viewList,viewPageList,totalSection,
      setCurrentPage, setCurrentSection, setTotalList} = usePagination<BoardItem>(5);

    //최신 게시물 리스트 상태
    //const [currentBoardList, setCurrentBoardList] = useState<BoardItem[]>([]);

    //인기 검색어 리스트 상태
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    // get Latest Board List Response 처리 함수
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'DBE') alert('데이터베이스 오류 입니다.');
      if(code !== 'SU') return;

      const {latestList} = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    }

    // get Popular List Response 처리 함수
    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'DBE') alert('데이터베이스 오류 입니다.');
      if(code !== 'SU') return;

      const {popularWordList} = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    }

    //인기 검색어 클릭 이벤트 핸들러 
    const onPopularWordClickHandler = (word:string) =>{
      navigate(SEARCH_PATH(word));
    }

    //첫 마운트시 실행될 함수
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    return(
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {viewList.map(currentBoardListItem => <BoardListItem boardListItem={currentBoardListItem}/>)}
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-box'>
                  <div className='main-bottom-popular-card-title'></div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(popularWordListItem => <div className='word-badge' onClick={() => onPopularWordClickHandler(popularWordListItem)}>{popularWordListItem}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  )
}
