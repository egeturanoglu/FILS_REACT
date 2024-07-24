import React, { useEffect, useState } from "react";
import HomeLayout from "../HomeLayout";
import "./presentation.css"; // Import the CSS file

const Presentation = () => {
    const [presentations, setPresentations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/presentations")
            .then(response => response.json())
            .then(data => setPresentations(data))
            .catch(error => console.error("Error fetching presentations:", error));
    }, []);

    return (
        <HomeLayout>
            <div className="presentation-page">
                <div className="presentation-container">
                    <h1>Presentations</h1>
                    <ul className="presentation-list">
                        {presentations.map(presentation => (
                            <li key={presentation.id}>
                                <a href={`http://localhost:8080/${presentation.filePath}`} download>
                                    {presentation.fileName}
                                </a>
                                <button className="download-button">Download</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Presentation;
