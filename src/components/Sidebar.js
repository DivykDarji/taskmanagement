// // Sidebar.js
// import React from "react";

// const Sidebar = ({ isOpen }) => {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-header">
//         {/* No sidebar icon here */}
//         <h2 className="sidebar-title">Menu</h2>
//       </div>
//       <div className="sidebar-items">
//         <div className="sidebar-item">Dashboard</div>
//         <div className="sidebar-item">Analytics</div>
//         <div className="sidebar-item">Teams</div>
//         <div className="sidebar-item">Documents</div>
//         <div className="sidebar-item">Settings</div>
//       </div>
//       <div className="workspace">
//         <span>Workspace</span>
//         <select>
//           <option>Tino Digital Agency</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// Sidebar.js
import React from "react";
import { FaHome, FaChartBar, FaUsers, FaFileAlt, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
      </div>
      <div className="sidebar-items">
        <div className="sidebar-item"><FaHome /> Dashboard</div>
        <div className="sidebar-item"><FaChartBar /> Analytics</div>
        <div className="sidebar-item"><FaUsers /> Teams</div>
        <div className="sidebar-item"><FaFileAlt /> Documents</div>
        <div className="sidebar-item"><FaCog /> Settings</div>
      </div>
    </div>
  );
};

export default Sidebar;

