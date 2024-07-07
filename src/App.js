import React, { useState } from 'react';
import Editor from './Editor';
import './App.css';
import jsonlint from 'jsonlint-mod';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const sampleJson = JSON.stringify({
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  }, null, 2);

  const [json, setJson] = useState(sampleJson);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleJsonChange = (event) => {
    setJson(event.target.value);
  };

  const handleValidateJson = () => {
    try {
      jsonlint.parse(json);
      setSuccessMessage('JSON is valid!');
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setSuccessMessage('');
    }
  };

  const handlePrettifyJson = () => {
    try {
      const parsedJson = jsonlint.parse(json);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setJson(formattedJson);
      setSuccessMessage('JSON prettified successfully!');
      setError('');
    } catch (err) {
      setError(`Error prettifying JSON: ${err.message}`);
      setSuccessMessage('');
    }
  };

  const handleClearJson = () => {
    setJson('');
    setSuccessMessage('JSON cleared.');
    setError('');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleCopyJson = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(json).then(
        () => {
          setSuccessMessage('JSON copied to clipboard!');
          setError('');
        },
        (err) => {
          setError('Failed to copy JSON: ' + err);
          setSuccessMessage('');
        }
      );
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>JSON Validator and Formatter</h1>
        <button className="toggle-button" onClick={toggleTheme}>
          {darkMode ? <Icon name="toggle on" size="large" /> : <Icon name="toggle off" size="large" />}
        </button>
      </div>
      <div className="main-content">
      <div className="info-section">
        <h2>What is JSON?</h2>
        <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.</p>
        <h2>Creator of JSON</h2>
        <p>JSON was created by Douglas Crockford in the early 2000s as a part of a JavaScript-based approach to managing data. Crockford's aim was to make data transfer between servers and web applications easier and more efficient.</p>
        <h2>JSON Checker Features</h2>
        <ul>
          <li>Validate JSON syntax online</li>
          <li>Prettify and format messy JSON</li>
          <li>Copy formatted JSON to clipboard</li>
        </ul>
        <h2>JSON Fun Facts</h2>
        <ul>
          <li>Despite its origins in JavaScript, JSON is language-agnostic and has been adopted across many programming environments.</li>
          <li>JSON files typically use the file extension '.json'.</li>
          <li>JSON syntax is a subset of JavaScript syntax, but JSON strings can be written in any language that supports a compatible data format.</li>
        </ul>
        <h2>JSON Alternatives</h2>
        <p>Other popular formats include XML and YAML, each with its own advantages for different use cases.</p>
      </div>
        <div className="editor-container">
          <Editor value={json} onChange={handleJsonChange} />
          <Icon name="copy outline" size="large" className="copy-icon" onClick={handleCopyJson} />
          <div className="button-container">
            <button onClick={handleValidateJson}>Validate JSON</button>
            <button onClick={handlePrettifyJson}>Prettify JSON</button>
            <button onClick={handleClearJson}>Clear</button>
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="message">{successMessage}</p>}
        </div>
      </div>
      <footer className="footer">
        Created by Eddie Cruz
      </footer>
    </div>
  );
}

export default App;
