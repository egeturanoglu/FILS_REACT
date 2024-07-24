import React, { useEffect, useState } from "react";
import './FeedbackManagement.css';
import { useNavigate } from "react-router-dom";
import CoorLayout from "../CoorLayout";
import garbage_icon from "../../Assets/garbage_icon.png";

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/feedback')
            .then(response => response.json())
            .then(data => setFeedbacks(data))
            .catch(error => console.error('Error fetching feedbacks:', error));
    }, []);

    const handleDeleteFeedback = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/feedback/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
                    alert("Feedback deleted successfully!");
                } else {
                    alert("Failed to delete feedback");
                }
            } catch (error) {
                console.error("Error deleting feedback:", error);
            }
        }
    };

    const handleDeleteAllFeedback = async () => {
        if (window.confirm("Are you sure you want to delete all feedbacks?")) {
            try {
                const response = await fetch('http://localhost:8080/api/feedback', {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setFeedbacks([]);
                    alert("All feedbacks deleted successfully!");
                } else {
                    alert("Failed to delete all feedbacks");
                }
            } catch (error) {
                console.error("Error deleting all feedbacks:", error);
            }
        }
    };

    return (
        <CoorLayout>
            <div className="feedback-management">
                <div className="feedback-management-header">
                    <h2>Feedback Management</h2>
                    <img 
                        src={garbage_icon} 
                        alt="Delete All Feedbacks" 
                        className="garbage-icon" 
                        onClick={handleDeleteAllFeedback} 
                    />
                </div>
                {feedbacks.length > 0 ? (
                    <div>
                        <ul>
                            {feedbacks.map(feedback => (
                                <li key={feedback.id} className="feedback-item">
                                    <p><strong>Name:</strong> {feedback.name}</p>
                                    <p><strong>Office:</strong> {feedback.office}</p>
                                    <p><strong>Message:</strong> {feedback.message}</p>
                                    <button onClick={() => handleDeleteFeedback(feedback.id)} className="delete-button">Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No feedbacks found</p>
                )}
            </div>
        </CoorLayout>
    );
}

export default FeedbackManagement;
