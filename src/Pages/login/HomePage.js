import React, { useEffect, useState } from "react";
import HomeLayout from "../HomeLayout";
import './HomePage.css'; 
import { Link } from 'react-router-dom';
import presentation from '../../Assets/presentation.jpg';
import training from '../../Assets/training.jpg';
import video from '../../Assets/video.jpg';
import project from '../../Assets/project.jpg';
import announcement from '../../Assets/announcements.jpg';
import userPhoto from '../../Assets/person_icon.png';

const HomePage = () => {
    const [user, setUser] = useState({
        photo: userPhoto,
        daysLeft: 0,
        totalDays: 30,
    });

    useEffect(() => {
        // Assuming you have the username stored in localStorage or from some auth context
        const username = localStorage.getItem("username");
        if (username) {
            fetch(`http://localhost:8080/api/auth/user/${username}`)
                .then(response => response.json())
                .then(data => {
                    setUser({
                        photo: userPhoto,
                        daysLeft: data.remainingDays,
                        totalDays: 30, // This should be set based on your requirement or fetched from backend if available
                    });
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, []);

    const calculateArc = (daysLeft, totalDays) => {
        const radius = 60; 
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (daysLeft / totalDays) * circumference;
        return { circumference, offset };
    };

    const getArcColor = (daysLeft, totalDays) => {
        const percentage = (daysLeft / totalDays) * 100;
        if (percentage <= 50) {
            return "#FFD700"; // Yellow
        } else {
            return "#32CD32"; // Green
        }
    };

    const { circumference, offset } = calculateArc(user.daysLeft, user.totalDays);
    const arcColor = getArcColor(user.daysLeft, user.totalDays);

    return (
        <HomeLayout>
            <div className="rectangle-container">
                <Link to="/presentations" className="rectangle" style={{ backgroundColor: '#FF6347' }}>
                    <img src={presentation} alt="Presentations" className="background-image" />
                    <span>Presentations</span>
                </Link>

                <Link to="/videos" className="rectangle" style={{ backgroundColor: '#32CD32' }}>
                    <img src={video} alt="Videos" className="background-image" />
                    <span>Videos</span>
                </Link>
                <Link to="/announcements" className="rectangle" style={{ backgroundColor: '#6A5ACD' }}>
                    <img src={announcement} alt="Announcements" className="background-image" />
                    <span>Announcements</span>
                </Link>
                <Link to="/project" className="rectangle" style={{ backgroundColor: '#FFD700' }}>
                    <img src={project} alt="Project" className="background-image" />
                    <span>Project</span>
                </Link>
                <Link to="/extras" className="rectangle" style={{ backgroundColor: '#4682B4' }}>
                    <img src={training} alt="Basic Trainings" className="background-image" />
                    <span>Extras</span>
                </Link>
                <div className="user-photo-container">
                    <svg className="progress-arc" viewBox="0 0 140 140">
                        <circle className="background-circle" cx="70" cy="70" r="60" />
                        <circle className="foreground-circle" cx="70" cy="70" r="60"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ stroke: arcColor }} />
                    </svg>
                    <img src={user.photo} alt="User" className="user-photo" />
                    <div className="remaining-days-text">Remaining Days: {user.daysLeft}</div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default HomePage;
