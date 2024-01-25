
import { useContext } from 'react'
import Feed from './Feed'
import DataContext from './Context/DataContext'

const Home = () => {
  const {searchResults}=useContext(DataContext)
  return (
    <main className='Home'>
        {searchResults.length  ? (
          <Feed posts={searchResults}/>
        ) :(
          <p style={{marginTop:"2rem"}}>
            No posts to display.
          </p>
        )}
      
    </main>
  )
}

export default Home