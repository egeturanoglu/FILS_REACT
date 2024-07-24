import React, { useState } from "react";

const UploadPresentationForm = ({ onToggle, onUploadPresentation }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      onUploadPresentation(formData);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="upload-presentation-form">
      <h3>Upload Presentation</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Choose File:</label>
          <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} required />
        </div>
        <div className="form-actions">
          <button type="submit">Upload</button>
          <button type="button" onClick={onToggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UploadPresentationForm;
