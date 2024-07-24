import React from "react";
import HomeLayout from "../HomeLayout";
import './FAQs.css';

const FAQs = () => {
    return (
        <HomeLayout>
            <div className="faq-main-container">
                <div className="faq-header-container">
                    <h1>Frequently Asked Questions (FAQs)</h1>
                </div>
                <div className="faq-content-container">
                    <ul className="faq-list">
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>What types of internships does Faurecia FORVIA offer?</strong>
                                <p>We offer internships in various fields such as engineering, IT, finance, marketing, human resources, and more.</p>
                            </div>
                        </li>
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>Is the internship paid?</strong>
                                <p>For short-term interns no. Otherwise, yes.</p>
                            </div>
                        </li>
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>What kind of projects will I be working on during my internship?</strong>
                                <p>Interns are assigned to real projects that contribute to our business. The projects vary depending on the department and current business needs.</p>
                            </div>
                        </li>
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>Is there a possibility of getting a full-time job offer after the internship?</strong>
                                <p>Yes, high-performing interns may be considered for full-time positions based on business needs and their performance during the internship.</p>
                            </div>
                        </li>
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>What is the dress code for interns?</strong>
                                <p>Our dress code is business casual, but it may vary depending on the department and location.</p>
                            </div>
                        </li>
                        <li className="faq-item">
                            <div className="faq-question-container">
                                <strong>What should I do if I have more questions about the internship program?</strong>
                                <p>You can contact our HR department or the recruitment team via the contact details provided on our careers website.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
};

export default FAQs;
