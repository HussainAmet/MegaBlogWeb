import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

import { getAllPosts } from './store/postSlice'
import service from './appwrite/conf'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect (() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));

    service.getPosts().then((posts) => {
      if (posts) {
          dispatch(getAllPosts({posts}))
          console.log("123");
      }
    });
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
