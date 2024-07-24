import React, { useEffect, useState } from "react";
import HomeLayout from "../HomeLayout";
import "./announcements.css";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/announcements")
            .then(response => response.json())
            .then(data => setAnnouncements(data))
            .catch(error => console.error("Error fetching announcements:", error));
    }, []);

    const toggleExpand = (id) => {
        setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
    };

    return (
        <HomeLayout>
            <div className="announcement-page">
                <div className="announcement-container">
                    <h1>Announcements</h1>
                </div>
                <ul className="announcement-list">
                    {announcements.map(announcement => (
                        <li key={announcement.id} className="announcement-item">
                            <div className="announcement-title" onClick={() => toggleExpand(announcement.id)}>
                                {announcement.title}
                                {expandedAnnouncement === announcement.id ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {expandedAnnouncement === announcement.id && (
                                <div className="announcement-description">
                                    {announcement.description}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </HomeLayout>
    );
}

export default Announcement;
