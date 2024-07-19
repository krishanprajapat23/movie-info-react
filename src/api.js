import axios from "axios";
const APIKey = "199f20ed7afdbe0b41908ed0ca3f6cff";

const API_URL = "https://api.themoviedb.org/3";

const searchMovieURL = `${API_URL}/search/multi?api_key=${APIKey}&language=en-US&page=1&query=`;

// const MovieDetails = `${API_URL}/3/movie/${movieId}?api_key=${APIKey}&language=en-US`;

// const vidUrl = `${API_URL}/3/movie/${movieId}/videos?api_key=${APIKey}&language=en-US`;




const fetchMoviesType = async (type) => {
  try {
    const fetchMovies = `${API_URL}/movie/${type}?api_key=${APIKey}`;
    const response = await axios.get(fetchMovies);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const fetchMovieDetails = `${API_URL}/movie/${movieId}?api_key=${APIKey}&language=en-US`;
    const response = await axios.get(fetchMovieDetails);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const fetchMovieVideo = async (movieId) => {
  try {
    const fetchMovieVideo = `${API_URL}/movie/${movieId}/videos?api_key=${APIKey}&language=en-US`;
    const response = await axios.get(fetchMovieVideo);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};



export {fetchMoviesType, fetchMovieDetails, fetchMovieVideo};
