import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { siginInRequest } from 'apis';
import { SignInResponseDTO } from 'apis/response/auth';
import ResponseDto from 'apis/response/response.dto';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

export default function Authentication() {

    //화면 상태, literal상태
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    //쿠키 상태
    const[cookies, setCookie] = useCookies();

    //네비게이터
    const navigator = useNavigate();
  
    // sign in card 컴포넌트
    const SignInCard = () =>{

      // 이메일 요소 참조 상태
      const emailRef = useRef<HTMLInputElement | null>(null);
      
      // 패스워드드 요소 참조 상태
      const passwordRef = useRef<HTMLInputElement | null>(null);

      // 이메일 상태
      const [email, setEmail] = useState<string>('');

      // 패스워드 상태
      const [password, setPassword] = useState<string>('');

      // 패스워드 타입 상태
      const [passwordType, setPasswordType] = useState<'text'|'password'>('password');

      // 에러 상태
      const [error, setError] = useState<boolean>(false);

      // 패스워드 버튼 아이콘 상태
      const [passwordButtonIcon, setPasswordButtonIcen] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

      // 패스워드 버튼 클릭 이벤트 핸들러
      const onPasswordButtonClickHandler = () =>{
        if (passwordType == 'text'){
          setPasswordType('password');
          setPasswordButtonIcen('eye-light-off-icon');
        }else{
          setPasswordType('text');
          setPasswordButtonIcen('eye-light-on-icon');
        }
      };

      // 이메일 입력 키다운 이벤트 핸들러
      const onEmailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
        if(event.key !== 'Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
      }

      // signInResponse 처리 함수
      const signInResponse = (responseBody: SignInResponseDTO | ResponseDto | null) => {
        if(!responseBody){
          alert('네트워크 이상입니다.');
          return;
        }

        const {code} = responseBody;
        if(code === 'DBE'){
          alert('데이터베이스 오류입니다.');
        }
        if(code === 'SF' || code === 'VF'){
          setError(true);
        }
        if(code !== 'SU'){
          return;
        }

        const {token, expirationTime} = responseBody as SignInResponseDTO;
        const now = new Date().getTime();
        const expires = new Date(now + expirationTime * 100);

        setCookie('accessToken', token, {expires, path:MAIN_PATH()});
        navigator(MAIN_PATH());

      }

      // 이메일 변경 이벤트 처리
      const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setError(false);
        const {value} = event.target;
        setEmail(value);
      }

      // 비밀번호호 변경 이벤트 처리
      const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setError(false);
        const {value} = event.target;
        setPassword(value);
      }

      // 로그인 버튼 이벤트 핸들러
      const onSignInButtonClickHandler = () =>{
        const requestBody: SignInRequestDto = {email, password};
        siginInRequest(requestBody).then(signInResponse);
      }

      // 회원가입 링크 클릭 이벤트 핸들러
      const onSignUpLinkClickHandler = () =>{
        setView('sign-up');
      }

      // 패스워드드 입력 키다운 이벤트 핸들러
      const onPasswordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
        if(event.key !== 'Enter') return;
        onSignInButtonClickHandler();
      }

      return(
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'로그인'}</div>
              </div>
              <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            </div>
            <div className='auth-card-bottom'>
              {error && 
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요'}
                </div>
              </div>
              }
              <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
              <div className='auth-description-box'>
                <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
              </div>
            </div>
          </div>
        </div>
      )
    };

    // sign up card 컴포넌트
    const SignUpCard = () =>{
      return(
        <div className='auth-card'></div>
      )
    };

    return(
      <div id='auth-wrapper'>
        <div className='auth-container'>
          <div className='auth-jumbotron-box'>
            <div className='auth-jumbotron-contents'>
              <div className='auth-logo-icon'></div>
              <div className='auth-jumbotron-text-box'>
                <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
                <div className='auth-jumbotron-text'>{'HOONS BOARD 입니다.'}</div>
              </div>
            </div>
          </div>
          {view == 'sign-in' && <SignInCard/>}
          {view == 'sign-up' && <SignUpCard/>}
        </div>
      </div>
    );
}
