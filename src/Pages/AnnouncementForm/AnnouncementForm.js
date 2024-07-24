import React from "react";

const AnnouncementForm = ({ onToggle, onAddAnnouncement }) => {
  return (
    <div className="add-announcement-form">
      <h3>Add Announcement</h3>
      <form onSubmit={onAddAnnouncement}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" className="description-input" required />
        </div>
        <div className="form-actions">
          <button type="submit">Add Announcement</button>
          <button type="button" onClick={onToggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;
