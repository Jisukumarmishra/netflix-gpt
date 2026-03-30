import React, { useEffect } from 'react'
import Header from './Header';
import { API_OPTIONS } from 'Utils/constants';

const Browse = () => {
  
  const getNowPlayingMovies = async () => {
    const data = await fetch ('https://api.themoviedb.org/3/movie/now_playing',
    API_OPTIONS
    );
    const json = await data.json();
    console.log(json);
  };

  // Make an api call inside useEffect because we only want to call at once
  useEffect(()=>{
  getNowPlayingMovies();
  },[])



  return (
    <div>
      <Header showUserActions={true}/>
    </div>
  );
};

export default Browse