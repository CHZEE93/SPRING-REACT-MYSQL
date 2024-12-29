import React from 'react'
import './style.css'
import Header from 'layouts/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from 'layouts/Footer'
import { AUTH_PATH } from 'constant'

export default function Container() {

  
  // state : 현재 페이지의 path name 상태
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      {pathname != AUTH_PATH() && <Footer />}
    </>
  )
}
