// // src/components/Loader.js
// import React, { useState } from 'react';
// import HourglassLoader from './HourglassLoader';

// const Loader = ({ children }) => {
//   const [loading, setLoading] = useState(true);

//   // Simulate loading state for 1.5 seconds (1500 milliseconds)
//   setTimeout(() => {
//     setLoading(false);
//   }, 1500);

//   return loading ? <HourglassLoader /> : children;
// };

// export default Loader;

// src/components/Loader.js
import React, { useContext } from 'react';
import HourglassLoader from './HourglassLoader';
import { LoadingContext } from '../LoadingContext';

const Loader = ({ children }) => {
  const { loading } = useContext(LoadingContext);

  return loading ? <HourglassLoader /> : children;
};

export default Loader;
