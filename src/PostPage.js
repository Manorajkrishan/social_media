import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './Context/DataContext';
//import { Link } from 'react-router-dom'

const PostPage = () => {
  const {posts,handleDelete} =useContext(DataContext)
  const {id}=useParams();
  const post = posts.find(post => (post.id).toString()===id);

  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${post.id}`}><button className='editButton'>Edit post</button></Link>
          <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete post</button>
        </>
        }
        {!post && 
        <>
          <h2>Post not found </h2>
          <p>Well , that's disappointing .</p>
          <p>
            <Link to ='/'>Visit to our Home Page</Link>
          </p>
        
        </>
        }
      </article>
       
    </main>
  )
}

export default PostPage