import React, { useState, useEffect } from "react";
import CoorLayout from "../CoorLayout";
import AnnouncementForm from "../AnnouncementForm/AnnouncementForm";
import UploadVideoForm from "../UploadVideoForm/UploadVideoForm";
import UploadPresentationForm from "../UploadPresentationForm/UploadPresentationForm";
import './CoorHome.css';
import { useNavigate } from "react-router-dom";

const CoorHome = () => {
  const [showAddInternForm, setShowAddInternForm] = useState(false);
  const [showAddAnnouncementForm, setShowAddAnnouncementForm] = useState(false);
  const [showUploadVideoForm, setShowUploadVideoForm] = useState(false);
  const [showUploadPresentationForm, setShowUploadPresentationForm] = useState(false);
  const [showInternList, setShowInternList] = useState(false);
  const [interns, setInterns] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/interns')
      .then(response => response.json())
      .then(data => setInterns(data))
      .catch(error => console.error('Error fetching interns:', error));
  }, []);

  const toggleAddInternForm = () => {
    setShowAddInternForm(!showAddInternForm);
  };

  const toggleAddAnnouncementForm = () => {
    setShowAddAnnouncementForm(!showAddAnnouncementForm);
  };

  const toggleUploadVideoForm = () => {
    setShowUploadVideoForm(!showUploadVideoForm);
  };

  const toggleUploadPresentationForm = () => {
    setShowUploadPresentationForm(!showUploadPresentationForm);
  };

  const toggleInternList = () => {
    setShowInternList(!showInternList);
  };

  const handleAddIntern = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to add this intern?")) {
      const formData = new FormData(event.target);
      const internData = {};
      formData.forEach((value, key) => {
        internData[key] = value;
      });
  
      try {
        const response = await fetch('http://localhost:8080/api/auth/add-intern', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(internData),
        });
  
        if (response.ok) {
          alert("Intern added successfully!");
          setShowAddInternForm(false);
  
          // Fetch updated list of interns
          const updatedResponse = await fetch('http://localhost:8080/api/auth/interns');
          const updatedInterns = await updatedResponse.json();
          setInterns(updatedInterns);
        } else {
          const errorText = await response.text();
          alert(`Failed to add intern: ${errorText}`);
        }
      } catch (error) {
        alert(`Failed to add intern: ${error.message}`);
      }
    }
  };
  
  const handleUploadVideo = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Video uploaded successfully!");
        setShowUploadVideoForm(false);
      } else {
        const error = await response.text();
        alert(`Failed to upload video: ${error}`);
      }
    } catch (error) {
      alert(`Failed to upload video: ${error.message}`);
    }
  };

  const handleUploadPresentation = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/presentations/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Presentation uploaded successfully!");
        setShowUploadPresentationForm(false);
      } else {
        const error = await response.text();
        alert(`Failed to upload presentation: ${error}`);
      }
    } catch (error) {
      alert(`Failed to upload presentation: ${error.message}`);
    }
  };

  const handleAddAnnouncement = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to add this announcement?")) {
      const formData = new FormData(event.target);
      const announcementData = {};
      formData.forEach((value, key) => {
        announcementData[key] = value;
      });

      try {
        const response = await fetch('http://localhost:8080/api/announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(announcementData),
        });

        if (response.ok) {
          alert("Announcement added successfully!");
          setShowAddAnnouncementForm(false);
        } else {
          const error = await response.text();
          alert(`Failed to add announcement: ${error}`);
        }
      } catch (error) {
        alert(`Failed to add announcement: ${error.message}`);
      }
    }
  };

  const handleManageProjectClick = (internId) => {
    navigate(`/manage-project/${internId}`);
  };

  return (
    <CoorLayout>
      <div className="coordinator-actions">
        <h2>Coordinator Actions</h2>
        <div className="action-container" onClick={toggleUploadPresentationForm}>
          <span>Upload Presentation</span>
        </div>
        {showUploadPresentationForm && (
          <UploadPresentationForm
            onToggle={toggleUploadPresentationForm}
            onUploadPresentation={handleUploadPresentation}
          />
        )}
        <div className="action-container" onClick={toggleInternList}>
          <span>Manage Projects</span>
        </div>
        {showInternList && (
          <div className="intern-list">
            {interns.map(intern => (
              <div key={intern.id} className="intern-item">
                <span>{intern.name}</span>
                <button onClick={() => handleManageProjectClick(intern.id)}>Manage Project</button>
              </div>
            ))}
          </div>
        )}
        <div className="action-container" onClick={toggleUploadVideoForm}>
          <span>Upload Video</span>
        </div>
        {showUploadVideoForm && (
          <UploadVideoForm
            onToggle={toggleUploadVideoForm}
            onUploadVideo={handleUploadVideo}
          />
        )}
        <div className="action-container" onClick={toggleAddInternForm}>
          <span>Add Intern</span>
        </div>
        {showAddInternForm && (
          <div className="add-intern-form">
            <h3>Add Intern</h3>
            <form onSubmit={handleAddIntern}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Project Name:</label>
                <h4 className="no-project">If the intern currently has no project please write "No Project"</h4>
                <input type="text" name="project" required />
              </div>
              <div className="form-group">
                <label>Project Description:</label>
                <h4 className="no-project">If the intern currently has no project please leave it empty</h4>
                <input type="text" name="projectDescription" ></input>
              </div>
              <div className="form-group">
                <label>Remaining Days:</label>
                <input type="number" name="remainingDays" required />
              </div>
              <div className="form-group">
                <label>Office:</label>
                <input type="text" name="office" required />
              </div>
              <div className="form-group">
                <label>School:</label>
                <input type="text" name="school" required />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input type="text" name="username" required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" required />
              </div>
              <div className="form-actions">
                <button type="submit">Add Intern</button>
                <button type="button" onClick={toggleAddInternForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        <div className="action-container" onClick={toggleAddAnnouncementForm}>
          <span>Add Announcement</span>
        </div>
        {showAddAnnouncementForm && (
          <AnnouncementForm
            onToggle={toggleAddAnnouncementForm}
            onAddAnnouncement={handleAddAnnouncement}
          />
        )}
        <div className="action-container" onClick={() => navigate('/feedback_management')}>
          <span>Manage Feedbacks</span>
        </div>
      </div>
    </CoorLayout>
  );
}

export default CoorHome;
