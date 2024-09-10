'use client'
import React from 'react'
import { jwt_Reducer, loadingBarProgress_Reducer, userId_Reducer } from '@/app/redux/sharingData/sharingDataSlice'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation';
import Header from './Header';
import { Toaster } from '@/components/ui/sonner';
import LoadingBar from 'react-top-loading-bar';

const ReduxWrapper = ({ children }) => {

  const progress = useSelector((state) => state.sharingData.loadingBarProgress)

  const dispatch = useDispatch()

  const params = usePathname();
  const showHeader = params == '/sign-in' || params == '/create-account' ? false : true;

  useEffect(() => {
    dispatch(jwt_Reducer(sessionStorage.getItem('jwt')))
    dispatch(userId_Reducer(JSON.parse(sessionStorage.getItem('user'))))
    console.log('this is redux_store_manipulation')
  }, [])

  return (
    <div>
      <LoadingBar
        height='3px'
        color='#31b65d'
        progress={progress}
        onLoaderFinished={() => dispatch(loadingBarProgress_Reducer(0))}
      />
      {showHeader && <Header />}
      {children}
      <Toaster />
    </div>
  )
}

export default ReduxWrapper