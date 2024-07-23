import React, { useState, useEffect} from "react";
import { fetchMoviesType, fetchMovieDetails, fetchMovieVideo, fetchSeachedMovie } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Movies from "./components/MoviesList";
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState({});
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVDO, setMovieVDO] = useState(null);
  const [error, setError] = useState('');
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  
  useEffect(() => {
    fetchAllMovies('now_playing');
    fetchAllMovies('top_rated');
  }, []);

  const fetchAllMovies = async (type) =>{
    setLoading(true);
    try {
      const data = await fetchMoviesType(type);
      setMovies((prevMovies) => ({
        ...prevMovies,
        [type]: data.results // Use the dynamic type as the key
      })); 
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }
 
  const fetchMovieData = async (movieId) =>{
    setLoading(true);
    try {
      const data = await fetchMovieDetails(movieId);
      const movieVdo = await fetchMovieVideo(movieId);
      setMovieDetails(data);
      let storeArrKey = movieVdo.results.map((vdo) => ((vdo.type === "Trailer") ? vdo.key : null))
        .filter((vdo) => vdo !== null);
      const VidURL = storeArrKey.map(id => `https://www.youtube.com/embed/${id}`);
      setMovieVDO(VidURL);
      setShowMovieDetails(true);// Show the offcanvas when movie data is fetched
      showModal(); // Show  Modal
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }

  const fetchSearchedMovie = async (query) =>{
    setLoading(true);
    try {
      const data = await fetchSeachedMovie(query);
      setMovies({
        search_results: data.results,
      });
      // console.log(data.results);
      // console.log(response.results);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setError('');
      fetchSearchedMovie(searchQuery);
    } else {
      setError('Please enter name ...');
      return;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  const handleCloseMovieDetails = () => {
    setShowMovieDetails(false);
    // Reset movie details when offcanvas is closed
    setMovieDetails(null);
    setMovieVDO(null);
  };

  const handleFetchError = (error) => {
    setError(error.message);
    toast.error(error.message);
    console.error(error);
    setLoading(false);
  };

   //show  Modal
   const showModal = () => {
    setShowMovieDetails(true); // show MovieDetails modal
  };
   
  
  return (
    <>
      <ToastContainer theme="colored" />
      <Header
        title='Movie Info'        
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleKeyPress={handleKeyPress}
        handleSearch={handleSearch}
      />
      {loading && <Loader />}
      <main>
        <section className="movies-wrapper">
          <div className="container-lg container-fluid">
            <Movies movies={movies} fetchMovieData={fetchMovieData} movieDetails={movieDetails} movieVDO={movieVDO}/>
          </div>
        </section>
      </main>
      {
        showMovieDetails &&
        <MovieDetails
          show={showMovieDetails}
          handleClose={handleCloseMovieDetails}
          movieDetails={movieDetails}
          movieVDO={movieVDO}
          showModal={showModal}
        />
      }
    </>
  );
};

export default App;
