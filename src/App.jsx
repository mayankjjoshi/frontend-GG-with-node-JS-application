import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post('https://integrating-google-gemini-to-node-js.onrender.com/api/prompt', {
        prompt: prompt
      });
      setResponse(res.data.Result); 
    } catch (error) {
      console.error("Error fetching data from API", error);
      setResponse('An error occurred.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <h1>Ask the AI</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </div>
      </form>
      {loading && (
        <div style={styles.spinnerContainer}>
          <ClipLoader color="#000000" size={50} /> {/* Spinner */}
        </div>
      )}
      {response && !loading && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre style={styles.response}>
            {response}
            {/* {JSON.stringify(response, null, 2)} */}
            {/* <div dangerouslySetInnerHTML={{ __html: response }} /> */}
          </pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    width: '300px',
    padding: '10px',
    marginRight: '10px',
    maxWidth: '100%',
  },
  button: {
    padding: '10px 20px',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    height: '100px', 
  },
  response: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    textAlign: 'left', 
  },
};

export default App;
