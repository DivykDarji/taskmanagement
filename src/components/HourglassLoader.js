// // src/components/HourglassLoader.js
// import React from 'react';
// import './HourglassLoader.css'; // Import the CSS file

// const HourglassLoader = () => {
//   return (
//     <div className="hourglassBackground">
//       <div className="hourglassContainer">
//         <div className="hourglassCurves"></div>
//         <div className="hourglassCapTop"></div>
//         <div className="hourglassGlassTop"></div>
//         <div className="hourglassSand"></div>
//         <div className="hourglassSandStream"></div>
//         <div className="hourglassCapBottom"></div>
//         <div className="hourglassGlass"></div>
//       </div>
//     </div>
//   );
// };

// export default HourglassLoader;


// src/components/HourglassLoader.js
import React from 'react';
import './HourglassLoader.css'; // Import the CSS file

const HourglassLoader = () => {
  return (
    <div className="hourglassOverlay">
      <div className="hourglassBackground">
        <div className="hourglassContainer">
          <div className="hourglassCurves"></div>
          <div className="hourglassCapTop"></div>
          <div className="hourglassGlassTop"></div>
          <div className="hourglassSand"></div>
          <div className="hourglassSandStream"></div>
          <div className="hourglassCapBottom"></div>
          <div className="hourglassGlass"></div>
        </div>
      </div>
    </div>
  );
};

export default HourglassLoader;
