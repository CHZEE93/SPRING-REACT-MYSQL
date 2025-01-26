import React, { Dispatch, SetStateAction } from 'react'
import './style.css';

//페이지네이션 컴포넌트 properties
interface Props{
  currentPage:number;
  setCurrentPage:Dispatch<SetStateAction<number>>;
  currentSection:number;
  setCurrentSection:Dispatch<SetStateAction<number>>;
  viewPageList:number[];
  totalSection:number;
}

//페이지네이션 컴포넌트
export default function Pagination(props:Props) {

  //Properties 상태 
  const {currentPage, currentSection, viewPageList, totalSection} = props;
  const {setCurrentPage, setCurrentSection} = props;

  //페이지 번호 클릭 이벤트 처리 
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  }

  //이전 클릭 이벤트 처리 
  const onPreviousClickHandler = () => {
    if(currentSection === 1) return;
    setCurrentPage((currentSection-1) * 10);
    setCurrentSection(currentSection-1); 
  }

  //다음 클릭 이벤트 처리 
  const onNextClickHandler = () => {
    if(currentSection === totalSection) return;
    setCurrentPage(currentSection* 10 + 1);
    setCurrentSection(currentSection+1); 
  }

  return (
    <div id='pagination-wrapper'>
      <div className='pagination-change-link-box'>
        <div className='icon-box-small'>
          <div className='icon expand-left-icon'></div>
        </div>
        <div className='pagination-change-link-text' onClick={onPreviousClickHandler}>{'이전'}</div>
      </div>
      <div className='pagination-divider'>{'\|'}</div>
      {viewPageList.map(page =>
      page === currentPage ? 
      <div className='pagination-text-active'>{page}</div> :
      <div className='pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
      )}
      <div className='pagination-divider'>{'\|'}</div>
      <div className='pagination-change-link-box'>
        <div className='pagination-change-link-text' onClick={onNextClickHandler}>{'다음'}</div>
        <div className='icon-box-small'>
          <div className='icon expand-right-icon'></div>
        </div>
      </div>
    </div>
  )
}
