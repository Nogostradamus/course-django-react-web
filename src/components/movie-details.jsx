import React, {useState, useEffect} from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";
import API from '../services/api-service';
import { useCookies } from "react-cookie";

export default function MovieDetails({movie, updateMovie}) {

    const [ highlighted, setHighlighted ] = useState(-1);
    const [error, setError] = useState(null);
    const [token] = useCookies("mr-token");

    const rateMovie = async (rate) => {
        const rateMovie = async () => {
            const resp = await API.rateMovie(movie.id, {stars: rate}, token["mr-token"]);
            if(resp) getNewMovie();
        }
        rateMovie()
    }

    const getNewMovie = async () => {
        const fetchMovie = async () => {
            const resp = await API.getMovie(movie.id, token["mr-token"]);
            if(resp) updateMovie(resp);
        }
        fetchMovie()
    }


  return (
    <React.Fragment>
        {movie &&
            <div>
                <h1 className='text-2xl pb-3'>{movie.title}</h1>
                <p className='text-xl pb-3'>{movie.description}</p>
                <div className='flex pt-2'>
                    <FaStar className={movie.avg_rating > 0 && 'text-orange-400'}/>
                    <FaStar className={movie.avg_rating > 1 && 'text-orange-400'}/>
                    <FaStar className={movie.avg_rating > 2 && 'text-orange-400'}/>
                    <FaStar className={movie.avg_rating > 3 && 'text-orange-400'}/>
                    <FaStar className={movie.avg_rating > 4 && 'text-orange-400'}/>
                    <p>({movie.no_of_ratings})</p>
                </div>
                <h1 className='border-t-2 border-purple-600 mt-5'>Rate the movie!</h1>
                <div className='flex text-3xl'>
                    { [...Array(5)].map( (el, indx) => {
                        return  <FaStar key={indx} className={highlighted > indx && 'text-purple-600'}
                                onMouseEnter={() => setHighlighted(indx + 1)}
                                onMouseLeave={() => setHighlighted(-1)}
                                onClick={() => rateMovie(indx + 1)}/>
                    }) }
                </div>
                {error && <p>{error}</p>}
            </div>
        }
    </React.Fragment>
  );
}
