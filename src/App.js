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
  const [darkMode, setDarkMode] = useState(false);

  const handleJsonChange = (event) => {
    setJson(event.target.value);
  };

  const handleValidateJson = () => {
    try {
      jsonlint.parse(json);
      setError('JSON is valid!');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const handlePrettifyJson = () => {
    try {
      const parsedJson = jsonlint.parse(json);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setJson(formattedJson);
      setError('JSON prettified successfully!');
    } catch (err) {
      setError(`Error prettifying JSON: ${err.message}`);
    }
  };

  const handleClearJson = () => {
    setJson('');
    setError('JSON cleared.');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleCopyJson = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(json).then(
        () => setError('JSON copied to clipboard!'),
        (err) => setError('Failed to copy JSON: ' + err)
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
      <div className="info-section">
        <h2>What is JSON?</h2>
        <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.</p>
        <h2>JSON Checker Features</h2>
        <ul>
          <li>Validate JSON syntax online</li>
          <li>Prettify and format messy JSON</li>
          <li>Copy formatted JSON to clipboard</li>
        </ul>
        <h2>JSON Alternatives</h2>
        <p>Other popular formats include XML and YAML, each with its own advantages for different use cases.</p>
      </div>
      <div className="editor-container">
        <Editor value={json} onChange={handleJsonChange} />
        <Icon name="copy outline" size="large" className="copy-icon" onClick={handleCopyJson} />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="button-container">
        <button onClick={handleValidateJson}>Validate JSON</button>
        <button onClick={handlePrettifyJson}>Prettify JSON</button>
        <button onClick={handleClearJson}>Clear</button>
      </div>
      <footer className="footer">
        Created by Eddie Cruz
      </footer>
    </div>
  );
}

export default App;
