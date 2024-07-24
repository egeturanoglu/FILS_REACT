import React from "react";
import './Extras.css';
import HomeLayout from "../HomeLayout";
import { Link } from 'react-router-dom';
import link_icon from '../../Assets/link_icon.png';
import feedback_icon from '../../Assets/feedback_icon.png';
import glossary_icon from '../../Assets/glossary_icon.png';
import faq_icon from '../../Assets/faq_icon.png';

const Extras = () => {
    return (
        <HomeLayout>
            <div className="extras-container">
                <Link to="/glossary" className="extras-card">
                    <div className="card-content">
                        <img src={glossary_icon} alt="Glossary" className="card-icon" />
                        <div className="card-title">Glossary</div>
                        <div className="card-link">Go to Glossary &gt;</div>
                    </div>
                </Link>
                <Link to="/feedback" className="extras-card">
                    <div className="card-content">
                        <img src={feedback_icon} alt="Feedback Form" className="card-icon" />
                        <div className="card-title">Feedback Form</div>
                        <div className="card-link">Go to Feedback &gt;</div>
                    </div>
                </Link>
                <Link to="/external_links" className="extras-card">
                    <div className="card-content">
                        <img src={link_icon} alt="External Links" className="card-icon" />
                        <div className="card-title">External Links</div>
                        <div className="card-link">Go to Links &gt;</div>
                    </div>
                </Link>
                <Link to="/faqs" className="extras-card">
                    <div className="card-content">
                        <img src={faq_icon} alt="FAQs" className="card-icon" />
                        <div className="card-title">FAQs</div>
                        <div className="card-link">Go to FAQs &gt;</div>
                    </div>
                </Link>
            </div>
        </HomeLayout>
    );
};

export default Extras;
