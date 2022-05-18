
import './styling/App.css';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import { Route, Routes, Link } from 'react-router-dom';
import View from './components/View';

function App() {

  const Home = () => {

    return (
      <div className="App">
        <nav className='marvel-nav'>
          <Link className="href" to='/'>
            <h1 className='marvel-header'>MARVEL</h1>
          </Link>
        </nav>
        <div className='marvel-hero'>
          <h1 className='hero-header'>Character Database</h1>
          <div className='overlay'></div>
        </div>
        <Table characters={currentChar} search={searchText} setSearchText={setSearchText} totalChars={characterArray.length} postsPerPage={postsPerPage} setPostsPerPage={setPostsPerPage} setCurrent={setCurrent}/>
      </div>
    )
  }
  const [searchText, setSearchText] = useState('')
  const [characterArray, setCharacters] = useState([])
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrent] = useState(1);
  useEffect(() => {
    if (!searchText) {
      fetch('https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=a7addbd7718e79ece372b04735c3e4b9')
        .then(response => response.json())
        .then(data => {
          setCharacters(data.data.results)
        })
    }
    else if (searchText) {
      fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchText}&limit=100&apikey=a7addbd7718e79ece372b04735c3e4b9`)
        .then(response => response.json())
        .then(data => {
          setCharacters(data.data.results)
          console.log(characterArray.length)
        })
    }
  }, [searchText])
 
  //variables to calculate characters per page and pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentChar = characterArray.slice(indexOfFirstPost, indexOfLastPost)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/view/:id' element={<View />} />
      </Routes>

    </>
  );
}

export default App;
