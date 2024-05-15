import React from 'react';
import './Calendar.css';

const Calendar = () => {
  return (
    <div className="calendar">
      <h3 className="calendar-title">Today</h3>
      <div className="calendar-date">April 10, 2021</div>
      <button className="add-task-button">+ Add tasks</button>
      <div className="calendar-tasks">
        <div className="calendar-task">
          <h4 className="calendar-task-time">9:00 AM</h4>
          <p className="calendar-task-title">Meeting</p>
          <p>Discuss team tasks for the day</p>
        </div>
        <div className="calendar-task">
          <h4 className="calendar-task-time">11:00 AM</h4>
          <p className="calendar-task-title">Icon set</p>
          <p>Edit icons for Navi</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
