import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'
import { reload } from '../reload'

function PostCard({$id, title, featuredImage, status = "active"}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        {status === "inactive" ? <h2 className='text-xl text-red-600 font-bold mb-4'>{status}</h2> : null}
        <div className='flex-col w-full justify-center mb-4'>
          <div className='mb-4'>
            {featuredImage? <img src={service.getFilepreview(featuredImage)} alt={title} className='rounded-xl' /> : reload()}
          </div>
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard;