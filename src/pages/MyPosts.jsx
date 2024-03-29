import React, { useState, useEffect } from 'react'
import { PostCard, Container } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function MyPosts() {
    const [myPosts, setMyPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const userData = useSelector((state) => state.auth.userData);
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {

        if (posts && posts.documents)
            setMyPosts(posts.documents.filter((post) => post.userId === userData.$id));

        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(delay);

    }, [posts, userData, isLoading])

    if (isLoading)
    {
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
    } else if (myPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container children={
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                <Link className='rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500' to={"/add-post"}>
                                    Add Post
                                </Link>
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
                            {myPosts.map((post) => (
                                <div key={post?.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    }/>
                </div>
            </div>
        )
    }
}

export default MyPosts