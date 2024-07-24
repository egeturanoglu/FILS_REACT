import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../HomeLayout";
import './profile.css'; 
import personIcon from '../../Assets/person_icon.png';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const username = localStorage.getItem("username"); // Retrieve the username from local storage

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:8080/api/auth/user/${username}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                });
        }
    }, [username]);

    const handleExit = () => {
        window.close();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("username"); // Clear the username from local storage
        navigate("/login");
    };

    return (
        <HomeLayout>
            <div className="profile-container">
                {user ? (
                    <div className="profile-info">
                        <img src={personIcon} alt="Person Icon" className="person-icon" />
                        <h1>Profile</h1>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Assigned Project:</strong> {user.project}</p>
                        <p><strong>Project Description:</strong> {user.projectDescription}</p>
                        <p><strong>Remaining Days:</strong> {user.remainingDays} days</p>
                        <p><strong>Assigned Office:</strong> {user.office}</p>
                        <p><strong>School:</strong> {user.school}</p>
                    </div>
                ) : (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <div>Loading...</div>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default Profile;
