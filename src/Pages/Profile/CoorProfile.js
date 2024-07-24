import React, { useEffect, useState } from "react";
import axios from "axios";
import CoorLayout from "../CoorLayout";
import './CoorProfile.css';

const CoorProfile = () => {
    const [coordinator, setCoordinator] = useState(null);
    const [editableCoordinator, setEditableCoordinator] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCoordinator = async () => {
            const username = localStorage.getItem("username");
            if (username) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/auth/coordinator/${username}`);
                    setCoordinator(response.data);
                    setEditableCoordinator(response.data);
                } catch (error) {
                    console.error("Error fetching coordinator data", error);
                }
            }
        };

        fetchCoordinator();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableCoordinator((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (window.confirm("Are you sure you want to save the changes?")) {
            try {
                const updatedCoordinator = { ...editableCoordinator };
                if (newPassword) {
                    updatedCoordinator.password = newPassword;
                }
                await axios.put(`http://localhost:8080/api/auth/update-coordinator`, updatedCoordinator);
                setCoordinator(updatedCoordinator);
                setIsEditing(false);
                alert("Profile updated successfully");
            } catch (error) {
                console.error("Error updating coordinator data", error);
                alert("Error updating profile");
            }
        }
    };

    return (
        <CoorLayout>
            <div className="coordinator-profile">
                {coordinator ? (
                    <>
                        <h2 className="profile-title">Coordinator Profile</h2>
                        <div className="profile-field">
                            <label className="profile-label">Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableCoordinator.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{coordinator.name}</p>
                            )}
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Surname:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="surname"
                                    value={editableCoordinator.surname}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{coordinator.surname}</p>
                            )}
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Office:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="office"
                                    value={editableCoordinator.office}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{coordinator.office}</p>
                            )}
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Username:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={editableCoordinator.username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{coordinator.username}</p>
                            )}
                        </div>
                        {isEditing && (
                            <>
                                <div className="profile-field">
                                    <label className="profile-label">New Password:</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label className="profile-label">Confirm Password:</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <div className="profile-actions">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </CoorLayout>
    );
}

export default CoorProfile;
