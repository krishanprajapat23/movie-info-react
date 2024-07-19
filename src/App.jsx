import React, { useState, useEffect, useRef } from "react";
import { fetchMoviesType, fetchMovieDetails, fetchMovieVideo } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Movies from "./components/MoviesList";
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVDO, setMovieVDO] = useState(null);
  const [error, setError] = useState('');
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const modalRef = useRef(null) // Ref to hold modal DOM element
  
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
      const data = await fetchMoviesType(movieId);
      const movieVdo = await fetchMovieVideo(movieId);
      setMovieDetails(data);
      setShowMovieDetails(true);// Show the offcanvas when movie data is fetched
      showModal(); // Show Bootstrap Modal
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseMovieDetails = () => {
    setShowMovieDetails(false);
    // Reset movie details when offcanvas is closed
    setMovieDetails(null);
    setMovieVDO(null);
    hideModal(); // Hide Bootstrap Modal
  };

  const handleFetchError = (error) => {
    setError(error.message);
    toast.error(error.message);
    console.error(error);
    setLoading(false);
  };

   //show Bootstrap Modal
   const showModal = () => {
    const modalEle = modalRef.current;
    if (modalEle) {
      const bsModal = new window.bootstrap.Modal(modalEle, {
        backdrop: 'static',
        keyboard: false
      });
      bsModal.show();
    }
  };
  
  //hide Bootstrap Modal
  const hideModal = () => {
    const modalEle = modalRef.current;
    if (modalEle) {
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      if (bsModal) {
        bsModal.hide();
         // Clean up modal backdrop
         document.body.classList.remove('modal-open');
         const modalBackdrop = document.querySelector('.modal-backdrop');
         if (modalBackdrop) {
           document.body.removeChild(modalBackdrop);
         }
      }
    }
  };

  return (
    <>
      <ToastContainer theme="colored" />
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
          modalRef={modalRef}
          show={showMovieDetails}
          handleClose={handleCloseMovieDetails}
          movieDetails={movieDetails}
          hideModal={hideModal}
          showModal={showModal}
        />
      }
    </>
  );
};

export default App;
