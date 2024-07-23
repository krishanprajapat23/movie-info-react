const Movie = ({ movieData, fetchMovieData }) => {
    const { id, title, original_title, poster_path, overview, release_date, vote_average, original_language } = movieData;

    const handleClick = () => {
        fetchMovieData(id);
    };

    // Check if adult is true, return null if true (skip rendering)
    if (movieData.adult || movieData.name) {
        return null;
    }

    return (
        <>
            <div className="card movie h-100" onClick={handleClick}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    className="card-img-top img-fluid"
                />
                <div className="card-body">
                    <span className="rating d-block small">
                        <span className="sm-title">Rating: </span>
                        {vote_average.toFixed(1)}
                    </span> 
                    <span className="release-date d-block small">
                        <span className="sm-title">Released: </span>
                        {release_date}
                    </span>
                    <h5 className="card-title">{title}<small>({original_language})</small></h5>
                    <div className="desc">
                        <p>
                            <span className="sm-title">Overview : </span>
                            {overview.length < 50 ? overview : overview.slice(0, 150) + "..."}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
