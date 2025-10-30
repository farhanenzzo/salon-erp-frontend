// CustomToolbar.js
import React from "react";

const CustomToolbar = ({ onNavigate, onView, label, views, view }) => {
  return (
    <div className="rbc-toolbar">
      <button onClick={() => onNavigate("PREV")}>Back</button>
      <button onClick={() => onNavigate("TODAY")}>Today</button>
      <button onClick={() => onNavigate("NEXT")}>Next</button>
      <select value={view} onChange={(e) => onView(e.target.value)}>
        {views.map((viewType) => (
          <option key={viewType} value={viewType}>
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </option>
        ))}
      </select>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

export default CustomToolbar;
