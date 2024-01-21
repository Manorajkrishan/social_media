import {Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import {format} from "date-fns"


function App() {
  const [posts,setPosts]= useState([
    {
      id:1,
      title:"My first post",
      datetime:"july 01,2021 11:17:36",
      body:"Made a video about Tesla"
    },
    {
      id:2,
      title:"My secound post",
      datetime:"july 01,2021 11:17:36",
      body:"watching Ben 10"
    },
    {
      id:3,
      title:"My third post",
      datetime:"july 01,2021 11:17:36",
      body:"planting "
    }
  ])
  const [search,setSearch]= useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const navigate = useNavigate()

  useEffect (()=>{
    const filteredResults = posts.filter((post)=>((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
    
  },[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id =posts.length ? posts[posts.length-1].id +1 : 1;
    const datetime = format(new Date(), 'MMMM dd ,yyyy pp');
    const newPost ={id,title:postTitle,datetime,body:postBody};
    const everyPosts =[...posts,newPost];
    setPosts(everyPosts);
    setPostTitle('');  
    setPostBody('');
    navigate('/')
  }
  
  const handleDelete =(id)=> {
    const postsList =posts.filter(post=>post.id !== id);
    setPosts(postsList);
    navigate('/')

  }
  
  return (
    <div className="App">
      
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
         
          <li><Link to="/postpage">PostPage</Link></li>
        </ul>
      </nav> */}
      
        {/*meka mehema danawata wada apita nested use karanna pulwan
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="postpage/newpost" element={<NewPost/>}/>
          <Route path="/postpage" element={<PostPage/>}/>
          <Route path="/postpage/:id" element={<Post/>}/>
          <Route path="*" element={<Missing/>}/>
        </Routes> */}
        {/* <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/postpage" element={<PostLayout/>}>
            <Route path="newpost" element={<NewPost/>}/>
            <Route index element={<PostPage/>}/>
            <Route path=":id" element={<Post/>}/>
          </Route>
          <Route path="*" element={<Missing/>}/>
        </Routes> */}
      
      <Header title="Mairu social meadia"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={ <Home posts={searchResults}/>}/>
        <Route path="post" > 
        <Route index element= {
          <NewPost 
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        
        />}/>
        <Route path=":id" element={<PostPage posts={posts} 
        handleDelete={handleDelete}/>}/>
        </Route>
         <Route path="about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
        
      </Routes>
      <Footer/> 
      
    </div>
  );
}

export default App;
