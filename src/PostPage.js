import React from 'react'
import { Link } from 'react-router-dom'

const PostPage = () => {
  return (
    <main><h1>PostPage</h1>
    <br></br>
    <Link to="/postpage/1">Post 1</Link>
    <br />
    <Link to="/postpage/2">Post 2</Link>
    <br />
    <Link to="/postpage/3">Post 3</Link>
    </main>
  )
}

export default PostPage