import React, {useState} from 'react';
//import logo from './logo.svg';
import './App.css';

function App() {

  const [initialRedirect, setInitialRedirect] = useState('');
  const [realDestination, setRealDestination] = useState('');
  const [result, setResult] = useState('');

  const generate = async (initial, real) => {
    const url = 'http://localhost:3001/redir'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstlink: initial,
                longlink: real,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP bad status: ${response.status}`);
        }
        const data = await response.text();
        console.log(data);
        return data
    } catch (error) {
        console.error('Unable to make a redirect link: ', error);
        return 'Error generating link'
    }
  };
  const handleGenerateClick = async () => {
    const generatedResult = await generate(initialRedirect, realDestination);
    setResult(generatedResult);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>URL Redirect Generator</h1>
      
      {/* Input field for "Initial Redirect" */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="initialRedirect" style={{ display: 'block', marginBottom: '5px' }}>Initial Redirect:</label>
        <input
          id="initialRedirect"
          type="text"
          value={initialRedirect}
          onChange={(e) => setInitialRedirect(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      {/* Input field for "Real Destination" */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="realDestination" style={{ display: 'block', marginBottom: '5px' }}>Real Destination:</label>
        <input
          id="realDestination"
          type="text"
          value={realDestination}
          onChange={(e) => setRealDestination(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      {/* The "Generate" button */}
      <button 
        onClick={handleGenerateClick}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Generate
      </button>

      {/* Display the result if it exists */}
      {result && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Whoopsy Link: {result}
        </div>
      )}
    </div>
  );
}

export default App;
