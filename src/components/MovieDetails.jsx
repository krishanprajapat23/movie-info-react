const MovieDetails = ({ show, handleClose, movieDetails, movieVDO }) => {
    const { title, tagline, status, vote_average, imdb_id, runtime, genres, release_date, overview, poster_path, origin_country, spoken_languages, production_companies, budget, revenue } = movieDetails;
    // Function to close modal
    const closeModal = () => {
        handleClose(); // Close MovieDetails component
    };

    function convertIntCurrencySystem (labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " billion"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " million"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    
        : Math.abs(Number(labelValue));
    
    }

    // Compare dates
    const isReleased = new Date() >= new Date(release_date);

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-dialog">
                <div className="custom-modal-content">
                    <div className="custom-modal-header p-2 border-0 justify-content-end">
                        <button className="custom-modal-close btn btn-sm" onClick={closeModal}>
                            &times;
                        </button>
                    </div>
                    <div className="custom-modal-body">
                        <div className="row g-3">
                            <div className="col-lg-6">
                                <div className="modal-img-wrapper">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                        alt={title}
                                        className="img-fluid mb-3"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="content-main">
                                    <h3 className="custom-modal-title">{title}</h3>
                                    {
                                        tagline &&
                                        <blockquote className="blockquote tagline mb-2">
                                            <p className="para mb-2 fs-6"><em>{tagline}</em></p>
                                        </blockquote>
                                    }
                                    <p className="para mb-2 fs-6 fw-normal"><strong>Runtime</strong>: {runtime} minutes</p>
                                    <p className="para mb-2 fs-6 fw-normal">
                                        <span className="badge rounded-pill bg-warning me-1 strong">Rating:</span>
                                        {`${vote_average.toFixed(2)}/10`}
                                    </p>
                                    {
                                        imdb_id &&
                                        <p className="para mb-2 fs-6 fw-normal">
                                            <span className="badge rounded-1 bg-warning me-1 strong text-dark">IMDb</span>
                                            {
                                                <a href={`https://www.imdb.com/title/${imdb_id}`} target='_blank'>Check now</a>
                                            }
                                        </p>
                                    }
                                    <p className="para mb-2 fs-6 fw-normal"><strong>Genres</strong>: {genres.map(genre => genre.name).join(', ')}</p>
                                    <p className="para mb-2 fs-6 fw-normal"><strong>Origin Country</strong>: {origin_country.map(genre => genre).join(', ')}</p>
                                    <p className="para mb-2 fs-6 fw-normal"><strong>Language</strong>: {spoken_languages.map(lang=>lang.name).join(', ')}</p>
                                    <p className="para mb-2 fs-6 fw-normal"><strong>{isReleased ? 'Released' : 'Upcoming' }</strong>: {release_date}</p>
                                    {
                                        production_companies[0].logo_path !== null && (
                                            <div className="logo-wrapper mb-2">
                                                <p className="para mb-2 fs-6 fw-normal"><strong>Production Companies:</strong></p>
                                                {production_companies.map(prod => (
                                                    (prod.logo_path !== null) ?
                                                        <img
                                                            key={prod.id}
                                                            src={`https://image.tmdb.org/t/p/w500${prod.logo_path}`}
                                                            width="60"
                                                            className="img-fluid m-1 p-1"
                                                            alt={prod.name}
                                                            title={prod.name}
                                                        /> : ''
                                                ))}
                                            </div>
                                        )
                                    }
                                    <p className="para desc mb-2 fs-6 fw-normal"><strong>Overview</strong>: {overview}</p>
                                    {
                                        budget>0 && 
                                        <p className="para desc mb-2 fs-6 fw-normal"><strong>Budget</strong>:{convertIntCurrencySystem(budget)}
                                        </p>
                                    }
                                    {revenue>0 &&
                                        <p className="para desc mb-2 fs-6 fw-normal"><strong>Box Office</strong>: {convertIntCurrencySystem(revenue)}</p>
                                    }
                                </div>
                            </div>
                            {/* Trailers section */}
                            {movieVDO && movieVDO.length > 0 && (
                                <div className="col-12">
                                    <div className="trailers mt-4">
                                        <h5 className="mb-3 text-light">Official Trailer</h5>
                                        <div className="row g-3">
                                            {movieVDO.map((trailer, index) => (
                                            <div key={index} className={movieVDO.length >= 2 ? 'col-lg-6' : 'col-12'}>
                                                <div className="ratio ratio-16x9">
                                                    <iframe
                                                    src={trailer}
                                                    title={`Trailer ${index + 1}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
