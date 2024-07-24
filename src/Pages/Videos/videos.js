import React, { useEffect, useState } from "react";
import HomeLayout from "../HomeLayout";
import "./videos.css"; // Import the CSS file

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/videos")
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error("Error fetching videos:", error));
    }, []);

    return (
        <HomeLayout>
            <div className="videos-page">
                <div className="videos-container">
                    <h1>Videos</h1>
                    <ul className="videos-list">
                        {videos.map(video => (
                            <li key={video.id}>
                                <video width="320" height="240" controls>
                                    <source src={`http://localhost:8080/api/videos/${video.id}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <p>{video.videoName}</p>
                                <a href={`http://localhost:8080/api/videos/${video.id}`} download>
                                    <button className="download-button">Download</button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Videos;
