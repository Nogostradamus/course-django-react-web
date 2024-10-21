import React, {useState, useEffect} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from '../services/api-service';
import { useCookies } from "react-cookie";
import useFetch from '../services/useFetch';

export default function MovieList({movieClicked, newMovie, updatedMovie}) {

    const { data, loading, error} = useFetch('/api/movies/');
    const [movies, setMovies] = useState([]);
    // const [error, setError] = useState(null);
    const [token] = useCookies("mr-token");
    
    useEffect(()=>{
        setMovies(data)
    },[data])

    useEffect(()=>{
        setMovies([...movies, newMovie])
    },[newMovie])

    useEffect(()=>{
        const newMovies = movies.map(movie => 
            movie.id === updatedMovie.id ? {...updatedMovie} : movie
        );
        setMovies(newMovies);
    },[updatedMovie])

    // useEffect(()=>{
    //     const fetchListOfMovies = async () => {
    //         const resp = await API.fetchMovies(token["mr-token"]);
    //         if(resp) setMovies(resp);
    //     }
    //     fetchListOfMovies()
    // }, [])

    const removeMovie = (movieToBeRemoved) => {
        const resp = API.removeMovie(movieToBeRemoved.id, token["mr-token"]);
        if(resp) {
            const newMovies = movies.filter(movie => movie.id !== movieToBeRemoved.id);
            setMovies(newMovies);
        }
    }

    if (loading) return <h1>Loading</h1>
    if (error) return <h1>{error}</h1>

  return (
    <div >
        {movies.map(movie=>{
            return (
                <div key={movie.id} className='grid grid-cols-[1fr_auto_auto] gap-3 p-3'>
                    <h2 className='text-xl cursor-pointer' onClick={(evt)=>{movieClicked(movie, false)}}>{movie.title}</h2>
                    <FaEdit onClick={(evt)=>{movieClicked(movie, true)}}/>
                    <MdDelete onClick={(evt)=>{removeMovie(movie)}}/>
                </div>
            )
        })}
    </div>
  );
}
