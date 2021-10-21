import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Record from './components/RecordVid';


function App() {
  // const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  return (
    <div className="font-monospace">
      <div className="container mt-3 mb-5 pb-4 pt-4 px-5 py-5 border border-info border border-3" style={{ borderRadius: "15px", backgroundColor: "rgba(0,0,0,0.7)" }}>
        <FileUpload />
      </div>
      <div className="container mt-3 mb-5 pb-4 pt-4 px-5 py-5 border border-info border border-3" style={{ borderRadius: "15px", backgroundColor: "rgba(0,0,0,0.7)" }}>
        <Record />
      </div>
    </div >
  );
}

export default App;