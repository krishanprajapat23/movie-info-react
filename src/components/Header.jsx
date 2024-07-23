import React, { useState, useEffect } from 'react';

const Header = ({title, searchQuery, setSearchQuery, handleKeyPress, handleSearch}) => {
  const [scrolling, setScrolling] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <header className={`sticky-top ${scrolling ? 'scrolled' : ''}`}>
        <nav className="navbar navbar-expand-lg nav-bar navbar-dark">
            <div className="container-fluid">
                <span className="navbar-brand">{title}</span>
                <button className="navbar-toggler toggle-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form id="form" className="ms-auto d-flex">
                        <input className="form-control me-2" type="search" id="search" placeholder="Search Movie Here"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                        <button className="btn btn-success" type="submit"
                          onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;
