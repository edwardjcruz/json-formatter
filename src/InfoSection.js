import React from 'react';

function InfoSection() {
    return (
        <div className="info-section">
            <h2>Learn More About JSON</h2>
            <div className="info-content">
                <h3>What is JSON?</h3>
                <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.</p>
                
                <h3>JSON Checker Features</h3>
                <p>This JSON Checker allows you to validate and format JSON data. It helps identify syntax errors and beautifies your JSON so it's easier to read.</p>
                
                <h3>JSON Alternatives</h3>
                <p>While JSON is widely used, other formats like XML and YAML also serve similar purposes with different features and syntax.</p>
            </div>
        </div>
    );
}

export default InfoSection;
