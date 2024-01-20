import {Link, Route, Routes } from "react-router-dom";
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


function App() {
  return (
    <div className="App">
      
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
         
          <li><Link to="/postpage">PostPage</Link></li>
        </ul>
      </nav>
      
        {/*meka mehema danawata wada apita nested use karanna pulwan
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="postpage/newpost" element={<NewPost/>}/>
          <Route path="/postpage" element={<PostPage/>}/>
          <Route path="/postpage/:id" element={<Post/>}/>
          <Route path="*" element={<Missing/>}/>
        </Routes> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/postpage" element={<PostLayout/>}>
            <Route path="newpost" element={<NewPost/>}/>
            <Route index element={<PostPage/>}/>
            <Route path=":id" element={<Post/>}/>
          </Route>
          <Route path="*" element={<Missing/>}/>
        </Routes>
      {
      /* <Header/>
      <Nav/>
      <Home/>
      <NewPost/>
      <PostPage/>
      <About/>
      <Missing/>
      <Footer/> */}
      
    </div>
  );
}

export default App;
