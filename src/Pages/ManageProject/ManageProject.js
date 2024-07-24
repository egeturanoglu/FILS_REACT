import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ManageProject.css';
import CoorLayout from "../CoorLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const ManageProject = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([]);
    const [editProject, setEditProject] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details
        axios.get(`http://localhost:8080/api/auth/user/id/${id}`)
            .then(response => {
                setUser(response.data);
                setTitle(response.data.project);
                setDescription(response.data.projectDescription);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });

        // Fetch all entries for the intern
        axios.get("http://localhost:8080/api/entries")
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.error("Error fetching entries:", error);
            });
    }, [id]);

    const handleSaveProjectDetails = () => {
        axios.put(`http://localhost:8080/api/auth/update-project/${id}`, { project: title, projectDescription: description })
            .then(response => {
                setUser(prevState => ({
                    ...prevState,
                    project: title,
                    projectDescription: description
                }));
                setEditProject(false);
            })
            .catch(error => {
                console.error("Error updating project details:", error);
            });
    };

    const handleDeleteClick = (entryId) => {
        if (window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
            axios.delete(`http://localhost:8080/api/entries/${entryId}`)
                .then(() => {
                    setEntries(entries.filter(entry => entry.id !== entryId));
                })
                .catch(error => {
                    console.error("Error deleting entry:", error);
                });
        }
    };

    const handleDownloadClick = (entryId) => {
        axios.get(`http://localhost:8080/api/entries/${entryId}/download`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error("Error downloading file:", error);
            });
    };

    return (
        <CoorLayout>
            <div className="manage-project-container">
                <h2>Manage Project</h2>
                {user && (
                    <div className="project-details">
                        {editProject ? (
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <button onClick={handleSaveProjectDetails}>Save</button>
                                <button onClick={() => setEditProject(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{user.project}</h3>
                                <p>{user.projectDescription}</p>
                                <button onClick={() => setEditProject(true)}>Edit Project</button>
                            </div>
                        )}
                    </div>
                )}
                <h3>Project Entries</h3>
                {entries.length === 0 ? (
                    <p>No entries have been made.</p>
                ) : (
                    <ul>
                        {entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(entry => (
                            <li key={entry.id}>
                                <div>
                                    <h4>{entry.title}</h4>
                                    <p>{entry.description}</p>
                                    {entry.filePath && (
                                        <div className="file-info">
                                            <FontAwesomeIcon icon={faFile} />
                                            <span>{entry.filePath.split('/').pop()}</span>
                                            <button onClick={() => handleDownloadClick(entry.id)}>Download File</button>
                                        </div>
                                    )}
                                    <button onClick={() => handleDeleteClick(entry.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </CoorLayout>
    );
};

export default ManageProject;
