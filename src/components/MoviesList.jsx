import Movie from './MovieCard';

const Movies = ({ movies, fetchMovieData }) => {
  const movieCategories = ['now_playing', 'top_rated', 'search_results'];
  console.log(movies);
  return (
    <>
      {movieCategories.map((key) => (
        // Check if the category exists in movies and has movies
        movies[key] && movies[key].length > 0 && (
          <div key={key} className="mb-4">
            <div className="intro-sec">
              <h2 className="intro-title mb-3 p-2">
                {key.replace('_', ' ').toUpperCase()}
              </h2>
            </div>
            <div className="row gy-3">
              {movies[key].map(movieData => (
                  <div className='col-md-4 col-xxl-3 col-sm-6' key={movieData.id}>
                    <Movie movieData={movieData} fetchMovieData={fetchMovieData} />
                  </div>
                ))
              }
            </div>
          </div>
        )
      ))}
    </>
  );
}

export default Movies;
