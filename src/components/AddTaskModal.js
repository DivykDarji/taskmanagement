import React from 'react';
import AddTaskPage from './AddTaskPage';

const AddTaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <AddTaskPage />
      </div>
    </div>
  );
};

export default AddTaskModal;