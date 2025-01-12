import { useEffect, useRef, useState } from 'react'
import './style.css'
import { useBoardStore } from 'stores';

export default function BoardWrite() {

  // 본문 영역 요소 참조 상태
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // 파일 입력 요소 참조 상태
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // 게시물 상태
  const {title, setTitle} = useBoardStore();
  const {content, setContent} = useBoardStore();
  const {boardImageFileList, setBoardImageFileList} = useBoardStore();
  const {resetBoard} = useBoardStore();

  // 게시물 이미지 미리보기 url 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // effect : 마운트시 실행할 함수
  useEffect(() => {
    resetBoard();
  },[]);

  return (
    <div id="board-write-wrapper">
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해 주세요' value={title}/>
          </div>
          <div className='divider'></div>
          <div className='board-write-content-box'>
            <textarea className='board-write-content-textarea' placeholder='본문을 작성해 주세요' />
            <div className='icon-button'>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}}/>
          </div>
          <div className='board-write-images-box'>
            <div className='board-write-image-box'>
              <img className='board-write-image' src="https://file2.nocutnews.co.kr/newsroom/image/2025/01/12/202501121655399209_0.jpg" />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>
            {/* 임시시 */}
            <div className='board-write-image-box'>
              <img className='board-write-image' src="https://file2.nocutnews.co.kr/newsroom/image/2025/01/12/202501120944542613_0.jpg" />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>
            {/* 임시시 */}
          </div>
        </div>
      </div>
    </div>
  )
}
