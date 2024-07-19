import { useEffect } from 'react';


const MovieDetails = ({ show, handleClose, movieDetails,showModal, hideModal, modalRef }) => {
    const { title, tagline, status, runtime, genres, release_date, overview, poster_path } = movieDetails;
    //comma-separated list of genres
    const formatGenres = () => {
        if (!genres) return '';
        return genres.map((genre) => genre.name).join(', ');
    };

    // Effect to show/hide modal based on show prop
    useEffect(() => {
        if (show) {
        hideModal(); // Ensure modal is hidden initially
        showModal(); // Show modal when show is true
        }
    }, [show]);


    // Function to hide Bootstrap Modal
    const closeModal = () => {
        hideModal(); // Hide modal using parent component's hideModal function
        handleClose(); // Close MovieDetails component
    };

    return (
        <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true" id="movieDetailsModal">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="movieDetailsModalLabel">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                    <div className="col-lg-6">
                        <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        className="img-fluid mb-3"
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="content-main">
                        <p className="para mb-2 fs-6 fw-normal"><strong>Tagline</strong>: {tagline}</p>
                        <p className="para mb-2 fs-6 fw-normal"><strong>Status</strong>: {status}</p>
                        <p className="para mb-2 fs-6 fw-normal"><strong>Runtime</strong>: {runtime} minutes</p>
                        <p className="para mb-2 fs-6 fw-normal"><strong>Genre</strong>: {formatGenres()}</p>
                        <p className="para mb-2 fs-6 fw-normal"><strong>Released on</strong>: {release_date}</p>
                        <p className="para desc mb-2 fs-6 fw-normal"><strong>Storyline</strong>: {overview}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
