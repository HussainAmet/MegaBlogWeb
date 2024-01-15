import React, { useState, useEffect } from 'react'
import { PostCard, Container } from '../components'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [allPost, setAllPost] = useState([])
    const posts = useSelector(state => state.posts.allPosts)
    useEffect(() => {
        if (posts && posts.documents) setAllPost(posts.documents);
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
    )
}

export default AllPosts

// import React, { useEffect, useState } from "react";
// import service from "../appwrite/conf";
// import { useSelector } from "react-redux";

// function AllPosts() {

//     const userData = useSelector((state) => state.auth.userData);

//   return (
//     <></>
//   )
// }

// export default AllPosts