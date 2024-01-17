import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        if (slug) {
            if (posts?.documents)
            {
                const findpost = posts.documents.find((post) => slug === post.$id)
                if (findpost) setPost(findpost);
                else navigate("/");
            }
        } else navigate("/");
    }, [slug, navigate, posts])
  return post ? (
    <div className='py-8'>
        <Container children={
            <PostForm post={post} />
        }/>
    </div>
  ) : null
}

export default EditPost