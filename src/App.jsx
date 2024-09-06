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
      // console.log('response :', res.data); 
      setResponse(res.data.Result); 
    } catch (error) {
      console.error("Error fetching data from API", error);
      setResponse('An error occurred.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ask the AI</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question..."
            style={{ width: '300px', padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
        </div>
      </form>
      {loading && (
        <div style={{ marginTop: '20px' }}>
          <ClipLoader color="white" size={50} /> {/* Spinner */}
        </div>
      )}
      {response && !loading && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {response}
            {/* {JSON.stringify(response, null, 2)} */}
          </pre>
          {/* <div dangerouslySetInnerHTML={{ __html: response }} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
