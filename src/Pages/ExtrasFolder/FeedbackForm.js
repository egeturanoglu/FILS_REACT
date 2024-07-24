import React, { useState } from "react";
import './FeedbackForm.css';
import HomeLayout from "../HomeLayout";

const FeedbackForm = () => {
    const [name, setName] = useState("");
    const [office, setOffice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedback = { name, office, message };

        try {
            const response = await fetch('http://localhost:8080/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });

            if (response.ok) {
                alert("Feedback submitted successfully");
                setName("");
                setOffice("");
                setMessage("");
            } else {
                alert("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <HomeLayout>
            <div className="feedback-form-container">
                <div className="feedback-form-header-container">
                    <h1>Feedback Form</h1>
                </div>
                <div className="feedback-form-content-container">
                    <form className="feedback-form" onSubmit={handleSubmit}>
                        <label className="feedback-form-label">Name:</label>
                        <input 
                            className="feedback-form-input" 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                        <label className="feedback-form-label">Office:</label>
                        <input 
                            className="feedback-form-input" 
                            type="text" 
                            name="Office" 
                            value={office}
                            onChange={(e) => setOffice(e.target.value)}
                            required 
                        />
                        <label className="feedback-form-label">Message:</label>
                        <textarea 
                            className="feedback-form-textarea" 
                            name="message" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required 
                        />
                        <button className="feedback-form-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
};

export default FeedbackForm;
