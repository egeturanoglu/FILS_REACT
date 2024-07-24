import React, { useEffect, useState } from "react";
import './Documents.css';
import CoorHomeLayout from '../CoorLayout';
import axios from 'axios';

const Documents = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [presentations, setPresentations] = useState([]);
    const [videos, setVideos] = useState([]);
    const [expandedSections, setExpandedSections] = useState({
        announcements: false,
        presentations: false,
        videos: false,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const announcementsRes = await axios.get('http://localhost:8080/api/announcements');
            const presentationsRes = await axios.get('http://localhost:8080/api/presentations');
            const videosRes = await axios.get('http://localhost:8080/api/videos');
            setAnnouncements(announcementsRes.data);
            setPresentations(presentationsRes.data);
            setVideos(videosRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/announcements/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    };

    const deletePresentation = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/presentations/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting presentation:", error);
        }
    };

    const deleteVideo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/videos/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    const deleteAllDocuments = async () => {
        if (window.confirm("Are you sure you want to delete all documents? This operation cannot be undone.")) {
            try {
                await axios.delete('http://localhost:8080/api/announcements/all');
                await axios.delete('http://localhost:8080/api/presentations/all');
                await axios.delete('http://localhost:8080/api/videos/all');
                fetchData();
            } catch (error) {
                console.error("Error deleting all documents:", error);
            }
        }
    };

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    return (
        <CoorHomeLayout>
            <div className="documents-container">
                <div className="header">
                    <h2>Documents</h2>
                    <button className="delete-all-button" onClick={deleteAllDocuments}>Delete All</button>
                </div>

                <div className="section">
                    <div className="section-header" onClick={() => toggleSection('announcements')}>
                        <h3>Announcements</h3>
                        <span className="arrow">{expandedSections.announcements ? '▲' : '▼'}</span>
                    </div>
                    {expandedSections.announcements && (
                        <div className="section-content">
                            {announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <div key={announcement.id} className="document-item">
                                        <p>{announcement.title}</p>
                                        <button onClick={() => deleteAnnouncement(announcement.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-content">No announcements available</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="section">
                    <div className="section-header" onClick={() => toggleSection('presentations')}>
                        <h3>Presentations</h3>
                        <span className="arrow">{expandedSections.presentations ? '▲' : '▼'}</span>
                    </div>
                    {expandedSections.presentations && (
                        <div className="section-content">
                            {presentations.length > 0 ? (
                                presentations.map((presentation) => (
                                    <div key={presentation.id} className="document-item">
                                        <p>{presentation.fileName}</p>
                                        <button onClick={() => deletePresentation(presentation.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-content">No presentations available</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="section">
                    <div className="section-header" onClick={() => toggleSection('videos')}>
                        <h3>Videos</h3>
                        <span className="arrow">{expandedSections.videos ? '▲' : '▼'}</span>
                    </div>
                    {expandedSections.videos && (
                        <div className="section-content">
                            {videos.length > 0 ? (
                                videos.map((video) => (
                                    <div key={video.id} className="document-item">
                                        <p>{video.videoName}</p>
                                        <button onClick={() => deleteVideo(video.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-content">No videos available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </CoorHomeLayout>
    );
}

export default Documents;
