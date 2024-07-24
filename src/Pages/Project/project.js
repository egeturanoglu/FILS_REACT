import React, { useState } from "react";
import axios from "axios";
import HomeLayout from "../HomeLayout";
import './project.css';

const Project = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setMessage("Title and description are required.");
            return;
        }

        // Prompt user for confirmation
        warn("Are you sure you want to submit the entry?", confirmSubmit);
    };

    const confirmSubmit = async () => {
        setShowConfirm(false);
        
        // Prepare form data
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (file) formData.append("file", file);

        try {
            // Send form data to the backend
            const response = await axios.post("http://localhost:8080/api/entries", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                // Show success message
                warn("Entry submitted successfully!", () => setMessage("Entry submitted successfully!"));
            } else {
                // Show failure message
                warn("Failed to submit the entry.", () => setMessage("Failed to submit the entry."));
            }
        } catch (error) {
            console.error("Error submitting entry:", error);
            // Show failure message
            warn("Failed to submit the entry.", () => setMessage("Failed to submit the entry. " + error));
        }
    };

    const warn = (message, callback) => {
        // Display confirmation dialog
        if (window.confirm(message)) {
            callback();
        }
    };

    return (
        <HomeLayout>
            <div className="project-container">
                <h2>Submit a New Project Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">File (optional):</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                

                {showConfirm && (
                    <div className="confirm-dialog">
                        <p>Are you sure you want to submit the entry?</p>
                        <button onClick={confirmSubmit}>Yes</button>
                        <button onClick={() => setShowConfirm(false)}>No</button>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
};

export default Project;







