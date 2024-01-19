import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getAllPosts } from './store/postSlice'
import service from './appwrite/conf'

function App() {
  const navigate = useNavigate()
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
      if (posts || posts === null) {
          dispatch(getAllPosts({posts}))
      } else navigate("/")
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
  )
  :
  (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main className="w-full py-8 mt-4 text-center">
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">
                  Loading...
              </h1>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App