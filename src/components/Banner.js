// src/components/Banner.js
import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>TaskIT</h1>
        <p>Simplify Your Day. Get your tasks done, the smart way.</p>
        <div className="banner-buttons">
          <button type="button" className="primary-btn" onClick={() => window.location.href = '/learnmore'}>
            Discover More
          </button>
          <button type="button" className="secondary-btn" onClick={() => window.location.href = '/signup'}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
