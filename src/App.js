import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";

function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null);
  const [cookie, setCookie, deleteCookie] = useCookies("mr-token");
  const navigate = useNavigate();

  useEffect(()=> {
    if(!cookie['mr-token']) navigate('/');
  },[cookie])

  const movieClicked = (movie, isEdit) => {
    if (isEdit) {
      setSelectedMovie(null);
      setEditedMovie(movie);
    } else {
      setSelectedMovie(movie);
      setEditedMovie(null);
    }
  }
  const createNewMovie = () => {
    setSelectedMovie(null);
    setEditedMovie({title:'', description: ''})
  }
  const logoutUser = () => {
    deleteCookie(['mr-token']);
    navigate('/');
  }

  return (
    <div className="App">
      <header className="App-header p-10 border-b-2 border-orange-300 mb-5">
        <h1>Movie Rater</h1>
      </header>
      <h1 className='absolute top-5 right-5 text-3xl cursor-pointer' onClick={() => logoutUser()}><FaSignOutAlt/></h1>
      <div className='grid grid-cols-2'>
          <div>
          <MovieList movieClicked={movieClicked} newMovie={newMovie} updatedMovie={updatedMovie}/>
          <button onClick={() => createNewMovie()}>Create New Movie</button>
          </div>

          <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie}/>
          {editedMovie && <MovieForm movie={editedMovie} updateMovie={setUpdatedMovie} addNewMovie={setNewMovie}/>}
        </div>
    </div>
  );
}

export default App;
