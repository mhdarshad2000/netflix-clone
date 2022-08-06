import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../Constants/Constants'
import YouTube from 'react-youtube'

function  RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results)
    })
    .catch(err=>{

    })
  },[])



  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }


  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log("Empty playList")
      }
    })
  }
  return (

    <div className='row'>
      <h4>{props.title}</h4>
      <div className="posters">
        {movies.map((obj) =>
          <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'small_poster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
        )}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )

}
export default RowPost