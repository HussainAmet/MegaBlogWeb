import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'

function Home() {
    const [allPost, setAllPost] = useState([])
    const posts = useSelector(state => state.posts.allPosts)
    useEffect(() => {
        if (posts?.documents) setAllPost(posts.documents);
    }, [posts])

    if (allPost.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                There is no posts!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {allPost.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
    }

export default Home