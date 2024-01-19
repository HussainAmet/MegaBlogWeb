import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'

function Home() {
    const [allPost, setAllPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [randomPost, setRandomPost] = useState(null)

    const posts = useSelector(state => state.posts.allPosts)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        if (posts?.documents){
            setAllPost(posts.documents.filter((post) => post.status === "active"));
            setRandomPost(Math.floor(Math.random() * (allPost.length - 1)))
        }

        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(delay);
        
    }, [posts, authStatus])

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container children={
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Loading...
                            </h1>
                        </div>
                    </div>
                }/>
            </div>
        )
    } else if (allPost.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container children={
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                {authStatus ?
                                    <Link className='rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500' to={"/add-post"}>
                                        Add Post
                                    </Link>
                                :
                                    <Link className='rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500' to={"/signup"}>
                                        Signup To see more post
                                    </Link>
                                }
                            </h1>
                        </div>
                    </div>
                }/>
            </div>
        )
    } else {
        return (
            <div className='w-full py-8'>
                <div className='w-full py-8'>
                    <Container children={
                        <div className='flex flex-wrap'>
                            {authStatus ?
                                allPost.map((post) => (
                                        <div key={post.$id} className='p-2 w-1/4'>
                                            <PostCard {...post} />
                                        </div>
                                ))
                            :
                                <>
                                    {randomPost !== null ?
                                        <>
                                            <div className='flex flex-wrap mb-5'>
                                                <div className='p-2 w-1/4'>
                                                    <PostCard {...allPost[randomPost]} />
                                                </div>
                                                <div className='p-2 w-1/4'>
                                                    <PostCard {...allPost[randomPost + 1]} />
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <Link className='rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500' to={"/login"}>
                                                    Login To see more post + {allPost.length - 2}
                                                </Link>
                                            </div>
                                        </>
                                    : ""}
                                </>
                            }
                        </div>
                    }/>
                </div>
            </div>
        )
    }
}

export default Home