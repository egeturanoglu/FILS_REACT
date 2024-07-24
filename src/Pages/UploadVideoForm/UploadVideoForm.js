import React, { useState } from 'react';
import './UploadVideoForm.css';

const UploadVideoForm = ({ onToggle, onUploadVideo }) => {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      alert('Please upload a valid video file (MP4, AVI, FLV, MOV).');
      setVideoFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoFile) {
      alert('Please select a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    onUploadVideo(formData);
  };

  return (
    <div className="upload-video-form">
      <h3>Upload Video</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Video File:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} required />
        </div>
        <div className="form-actions">
          <button type="submit">Upload</button>
          <button type="button" onClick={onToggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoForm;
