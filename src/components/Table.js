import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../styling/Table.css'
import Pagination from './Pagination';
const Table = ({ characters, search, setSearchText, totalChars, postsPerPage, setCurrent, setPostsPerPage}) => {
  
    const CharacterCard = ({ info }) => {
        const characterName = info.name;
        if (info.thumbnail.extension === 'gif') {
            var path = `${info.thumbnail.path}.gif`
        }
        else {
            path = `${info.thumbnail.path}.jpg`
        }
        const to = `/view/${info.id}`
        return (<>
            <Link className='href' to={to}>
                <div className="character-card">
                    <img className="card=img" src={path} />
                    <span>
                        {characterName}
                    </span>

                </div>
            </Link>
        </>)
    };
    //function to update character list on search
    const updateSearchText = () => {
        const searching = document.querySelector('.search')
        setSearchText(searching.value)
        searching.value = search
     
    }
    const characterCards = characters.map((x, i) => {
        return (
            <>
                <CharacterCard info={x} />
            </>
        )
    })
    return (
        <>
            <div className='table'>
                <nav className='table-nav'>
                    <form>
                        <input className="search" type="search" placeholder="Search" aria-label="Search" />
                        <button className='search-button' onClick={updateSearchText}>Search</button>
                    </form>
                </nav>
                <div className="character-container">
                    {characterCards}
                </div>
                <Pagination totalChars={totalChars} postsPerPage={postsPerPage} setPostsPerPage={setPostsPerPage} setCurrent={setCurrent} />
            </div>
        </>
    )
}
export default Table;