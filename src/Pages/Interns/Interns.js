import React, { useEffect, useState } from "react";
import './Interns.css';
import CoorLayout from "../CoorLayout";

const Interns = () => {
    const [interns, setInterns] = useState([]);
    const [editIntern, setEditIntern] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/auth/interns')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setInterns(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this intern? This action cannot be undone.")) {
            fetch(`http://localhost:8080/api/auth/delete-intern/${id}`, { method: 'DELETE' })
                .then(() => setInterns(interns.filter(intern => intern.id !== id)))
                .catch(error => console.error('There was a problem with the delete operation:', error));
        }
    };

    const handleEdit = (intern) => {
        setEditIntern(intern);
    };

    const handleSave = () => {
        fetch('http://localhost:8080/api/auth/update-intern', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editIntern)
        })
            .then(() => {
                setInterns(interns.map(intern => intern.id === editIntern.id ? editIntern : intern));
                setEditIntern(null);
            })
            .catch(error => console.error('There was a problem with the update operation:', error));
    };

    const handleDeleteAll = () => {
        if (window.confirm("Are you sure you want to delete all interns? This action cannot be undone.")) {
            fetch('http://localhost:8080/api/auth/delete-all-interns', { method: 'DELETE' })
                .then(() => setInterns([]))
                .catch(error => console.error('There was a problem with the delete operation:', error));
        }
    };

    return (
        <CoorLayout>
            <div className="container">
                <div className="coordinator-actions">
                    <h2>Interns Management</h2>
                    <button className="delete-all-button" onClick={handleDeleteAll}>Delete All Interns</button>
                    <div className="interns-list">
                        {interns.map(intern => (
                            <div key={intern.id} className="intern-card">
                                {editIntern && editIntern.id === intern.id ? (
                                    <div className="edit-form">
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            value={editIntern.name}
                                            onChange={(e) => setEditIntern({ ...editIntern, name: e.target.value })}
                                            placeholder="Name"
                                        />
                                        <label>Project:</label>
                                        <input
                                            type="text"
                                            value={editIntern.project}
                                            onChange={(e) => setEditIntern({ ...editIntern, project: e.target.value })}
                                            placeholder="Project"
                                        />
                                        <label>Project Description:</label>
                                        <textarea
                                            value={editIntern.projectDescription}
                                            onChange={(e) => setEditIntern({ ...editIntern, projectDescription: e.target.value })}
                                            placeholder="Project Description"
                                        />
                                        <label>Remaining Days:</label>
                                        <input
                                            type="number"
                                            value={editIntern.remainingDays}
                                            onChange={(e) => setEditIntern({ ...editIntern, remainingDays: e.target.value })}
                                            placeholder="Remaining Days"
                                        />
                                        <label>Office:</label>
                                        <input
                                            type="text"
                                            value={editIntern.office}
                                            onChange={(e) => setEditIntern({ ...editIntern, office: e.target.value })}
                                            placeholder="Office"
                                        />
                                        <label>School:</label>
                                        <input
                                            type="text"
                                            value={editIntern.school}
                                            onChange={(e) => setEditIntern({ ...editIntern, school: e.target.value })}
                                            placeholder="School"
                                        />
                                        <label>Username:</label>
                                        <input
                                            type="text"
                                            value={editIntern.username}
                                            onChange={(e) => setEditIntern({ ...editIntern, username: e.target.value })}
                                            placeholder="Username"
                                        />
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            value={editIntern.password}
                                            onChange={(e) => setEditIntern({ ...editIntern, password: e.target.value })}
                                            placeholder="Password"
                                        />
                                        <button onClick={handleSave}>Save</button>
                                    </div>
                                ) : (
                                    <div className="intern-info">
                                        <span><strong>Name:</strong> {intern.name}</span>
                                        <span><strong>Project:</strong> {intern.project}</span>
                                        <span><strong>Project Description:</strong> {intern.projectDescription}</span>
                                        <span><strong>Remaining Days:</strong> {intern.remainingDays}</span>
                                        <span><strong>Office:</strong> {intern.office}</span>
                                        <span><strong>School:</strong> {intern.school}</span>
                                        <span><strong>Username:</strong> {intern.username}</span>
                                        <div className="button-group">
                                            <button onClick={() => handleEdit(intern)}>Edit</button>
                                            <button onClick={() => handleDelete(intern.id)}>Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CoorLayout>
    );
};

export default Interns;
