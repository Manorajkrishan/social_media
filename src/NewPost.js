const NewPost=({handleSubmit,postTitle,setPostTitle,postBody,setPostBody})=>{
   
  return(
    <main className="newPostForm">
      <h2>New Post</h2>
      <form className="newform" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title :</label>
        <input type="text" 
               id="postTitle" 
               required
               value={(e)=>setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post :</label>
        <textarea 
          id="postBody"
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>

    </main>
  )
}

export default NewPost