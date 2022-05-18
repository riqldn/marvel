import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const View = () => {
    const { id } = useParams();
    const [character, setDetails] = useState([]);
    const [path, setPath] = useState('')
    const [thumb, setThumb] = useState('')
    const [stories, setStories] = useState([])
    const [series, setSeries] = useState([])
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=a7addbd7718e79ece372b04735c3e4b9`)
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    setDetails(data.data.results[0])
                    setPath(data.data.results[0].thumbnail.path)
                    setThumb(data.data.results[0].thumbnail.extension)
                    setStories(data.data.results[0].stories.items)
                    setSeries(data.data.results[0].series.items)
                    setEvents(data.data.results[0].events.items)
                }

            })
    }, [id])
    console.log(series)
    const seriesArray = series.map(serie => {
        return (<>
            <h4>{serie.name}</h4>
        </>)
    })
    const eventsArray = events.map(e => {
        return (<>
            <h4>{e.name}</h4>
        </>)
    })
    const storyArray = stories.map(e => {
        return (<>
            <h4>{e.name}</h4>
        </>)
    })
    const createView = () => {
        if (thumb == 'jpg')
            var imgPath = `${path}.jpg`
        else
            imgPath = `${path}.gif`
        return (
            <div className="view-container">
                <img className="char-img" src={imgPath} />
                <h1>{character.name}</h1>
                <h4>{character.description}</h4>
                <br></br>
                <h3>Series</h3>
                {seriesArray}
                <br />
                <h3>Events</h3>
                {eventsArray}
                <br />
                <h3>Stories</h3>
                {storyArray}
            </div>
        )

    }
    return (
        <>
            <nav className='marvel-nav'>
            <Link className="href" to='/'>
            <h1 className='marvel-header'>MARVEL</h1>
          </Link>
            </nav>
            {createView()}
        </>
    )
}

export default View;