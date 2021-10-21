import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Record from './components/RecordVid';


function App() {
  // const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  return (
    <div className="font-monospace text-center bg-light">
      <div className="container d-flex flex-row justify-content-center display-4 mt-4 text-dark pt-2 pb-2">
        <i className="fa-brands fa-react mt-1 mx-2 logo"></i>
        <p>React Video Recorder</p>
      </div>
      <div className="container bg-info pt-2 pb-1 px-5 py-5 mt-3  border border-info border border-3" style={{ borderRadius: "15px" }}>
        <div className="container mt-3 mb-3 pb-4 pt-4 px-5 py-5 border border-info border border-3" style={{ borderRadius: "15px", backgroundColor: "rgba(0,0,0,0.8)" }}>
          <FileUpload />
        </div>
        <div className="container mt-1 mb-3 pb-4 pt-2 px-5 py-5 border border-info border border-3" style={{ borderRadius: "15px", backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Record />
        </div>
      </div>
      <div className="container">
        Testing
      </div>
    </div >
  );
}

export default App;