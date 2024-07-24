import React from "react";
import HomeLayout from "../HomeLayout";
import './Glossary.css';

const glossaryTerms = [
    { term: "8QB", definition: "8D Report, a problem-solving methodology for product and process improvement." },
    { term: "FES", definition: "Faurecia Excellence System, a set of standards and practices for operational excellence." },
    { term: "5S", definition: "Sort, Set in order, Shine, Standardize, Sustain; a workplace organization method." },
    { term: "GAP", definition: "Global Application Platform, a framework for software development." },
    { term: "UAP", definition: "Unit Autonomous Production, an operational unit within a factory." },
    { term: "TOP5", definition: "5 miniute meeting that are held by the company" },
];

const Glossary = () => {

    return (
        <HomeLayout>
            <div className="glossary-general-container">
                <div className="glossary-content-container">
                    <h2>Glossary of Terms</h2>
                    <ul className="glossary-list">
                        {glossaryTerms.map((item, index) => (
                            <li key={index} className="glossary-item">
                                <div className="glossary-term-container">
                                    <strong>{item.term}:</strong> {item.definition}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Glossary;


