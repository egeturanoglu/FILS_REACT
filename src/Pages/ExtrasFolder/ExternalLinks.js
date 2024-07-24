import React from "react";
import './ExternalLinks.css';
import HomeLayout from "../HomeLayout";

const ExternalLinks = () => {
    return (
        <HomeLayout>
            <div className="external-links-container">
                <div className="external-links-header-container">
                    <h1>External Links</h1>
                </div>
                <div className="external-links-content-container">
                    <ul className="external-links-list">
                        <li className="external-links-item">
                            <a href="https://www.faurecia.com/en" target="_blank" rel="noreferrer">
                                Faurecia
                            </a>
                            <p className="external-links-description">- Explore the official Faurecia website for company information.</p>
                        </li>
                        <li className="external-links-item">
                            <a href="https://www.faurecia.com/en/careers" target="_blank" rel="noreferrer">
                                Faurecia Careers
                            </a>
                            <p className="external-links-description">- Find job opportunities and career information at Faurecia.</p>
                        </li>
                        <li className="external-links-item">
                            <a href="" target="_blank" rel="noreferrer">
                                Internship Evaluation Survey
                            </a>
                            <p className="external-links-description">- Evaluate you experiance of being an intern in Faurecia FORVIA.</p>
                        </li>
                        <li className="external-links-item">
                            <a href="https://www.faurecia.com/en/innovation" target="_blank" rel="noreferrer">
                                Faurecia Innovation
                            </a>
                            <p className="external-links-description">- Discover the latest innovations and technologies at Faurecia.</p>
                        </li>
                        <li className="external-links-item">
                            <a href="https://www.faurecia.com/en/sustainability" target="_blank" rel="noreferrer">
                                Faurecia Sustainability
                            </a>
                            <p className="external-links-description">- Learn about Faurecia’s sustainability initiatives and commitments.</p>
                        </li>
                        <li className="external-links-item">
                            <a href="https://www.faurecia.com/en/our-expertise" target="_blank" rel="noreferrer">
                                Faurecia Expertise
                            </a>
                            <p className="external-links-description">- Explore the areas of expertise and technological prowess of Faurecia.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ExternalLinks;
