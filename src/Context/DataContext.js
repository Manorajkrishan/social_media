import { createContext,useEffect,useState } from "react";
import Post from "../Post";
import {format} from "date-fns"
import api from "../api/pt"
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";



const DataContext = createContext({})

export const DataProvider = ({Children})=>{
    const [posts,setPosts]= useState([])
    const [search,setSearch]= useState('')
    const [searchResults,setSearchResults]=useState([])
    const [postTitle,setPostTitle]=useState('');
    const [postBody,setPostBody]=useState('');
    const [editTitle,setEditTitle]=useState('');
    const [editBody,setEditBody]=useState('');
    const navigate = useNavigate()
    const {width}= useWindowSize()
  
  
    useEffect(()=>{
      const fetchPosts = async()=>{
        try{
          const response = await api.get('/posts');
          setPosts(response.data);
        }catch(err){
  
          if(err.response){
            //Not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.Headers);
  
          }else{
            console.log(`Error : ${err.message}`);
          }
        }
      }
      fetchPosts();
    },[])
  
    useEffect (()=>{
      const filteredResults = posts.filter((post)=>((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filteredResults.reverse());
      
    },[posts,search])
  
    const handleSubmit= async(e)=>{
      e.preventDefault();
      const id =posts.length ? posts[posts.length-1].id +1 : 1;
      const datetime = format(new Date(), 'MMMM dd ,yyyy pp');
      const newPost ={id,title:postTitle,datetime,body:postBody};
      try{
      const response = await api.post('/posts',newPost)
      const everyPosts =[...posts,response.data];
      setPosts(everyPosts);
      setPostTitle('');  
      setPostBody('');
      navigate('/')
      }catch(err){
        console.log(`Error : ${err.message}`);
      }
    }
  
    const handleEdit = async (id)=>{
      const datetime = format(new Date(),'MMMM dd,yyyy pp');
      const updatePost ={id,title:editTitle,datetime,body: editBody};
      try{
        const response =await api.put(`/posts/${id}`,updatePost)
        setPosts(posts.map(Post.id===id ? {... response.data}: Post));
        setEditTitle('');
        setEditBody('');
        navigate('/')
  
      }catch(err){
        console.log(`Error :${err.message}`);
      }
    }
    
    const handleDelete =async(id)=> {
      try{
        await api.delete(`posts/${id}`)
      const postsList =posts.filter(post=>post.id !== id);
      setPosts(postsList);
      navigate('/')
      }catch(err){
        console.log(`Error :${err.message}`)
  
      }
  
    }
    return(
        <DataContext.Provider value={{
            width,search, setSearch,searchResults,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,
            posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle,
            handleDelete

        }}>
            {Children}


        </DataContext.Provider>
    )
}
export default DataContext