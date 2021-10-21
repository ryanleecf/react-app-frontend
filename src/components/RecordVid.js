import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';
import { isIOS } from 'react-device-detect';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import '../App.css';
import Progress from './progress';
import axios from 'axios';

const RecordVid = ({ push }) => {
    return (
        <div className="container mt-4">
            {isIOS ?
                <div className="container center" style={{ width: '70%', height: '400px' }}>
                    <VideoRecorder
                        // chunkSize={250}
                        constraints={{
                            audio: true,
                            video: {
                                width: { exact: 320, ideal: 320 },
                                height: { exact: 540, ideal: 540 },
                                aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
                                resizeMode: "crop-and-scale"
                            }
                        }}
                        countdownTime={3000}
                        dataAvailableTimeout={1000}
                        isFlipped
                        mimeType='video/mp4'
                        onError={function noRefCheck() { }}
                        onOpenVideoInput={function noRefCheck() { }}
                        onRecordingComplete={function noRefCheck(videoBlob) {  // Do something with the video...
                            console.log("videoBlob", videoBlob);
                            console.log("new Blob", videoBlob);
                            window.alert("Video has been Recorded");
                            push("/videoPreview", { videoBlob });
                        }}
                        // onStartRecording={function noRefCheck() { }}
                        // onStopRecording={function noRefCheck() { }}
                        // onStopReplaying={function noRefCheck() { }}
                        // onTurnOffCamera={function noRefCheck() { }}
                        // onTurnOnCamera={function noRefCheck() { }}
                        // renderActions={function noRefCheck() { }}
                        // renderDisconnectedView={function noRefCheck() { }}
                        // renderErrorView={function noRefCheck() { }}
                        renderLoadingView={function noRefCheck() {
                            return (
                                <i className="fa-solid fa-camera loader"></i>
                            )
                        }}
                        // renderUnsupportedView={function noRefCheck() { }}
                        // renderVideoInputView={function noRefCheck() { }}
                        // t={function noRefCheck() { }}
                        timeLimit={undefined}
                    />
                </div>
                :
                <div className="container center" style={{ width: '70%', height: '400px' }}>
                    <VideoRecorder
                        // chunkSize={250}
                        constraints={{
                            audio: true,
                            video: {
                                width: { exact: 320, ideal: 320 },
                                height: { exact: 540, ideal: 540 },
                                aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
                                resizeMode: "crop-and-scale"
                            }
                        }}
                        countdownTime={3000}
                        dataAvailableTimeout={1000}
                        isFlipped
                        mimeType='video/webm'
                        onError={function noRefCheck() { }}
                        onOpenVideoInput={function noRefCheck() { }}
                        onRecordingComplete={function noRefCheck(videoBlob) {  // Do something with the video...
                            console.log("videoBlob", videoBlob);
                            console.log("new Blob", videoBlob);
                            window.alert("Video has been recorded");
                            push("/videoPreview", { videoBlob });
                        }}
                        // onStartRecording={function noRefCheck() { }}
                        // onStopRecording={function noRefCheck() { }}
                        // onStopReplaying={function noRefCheck() { }}
                        // onTurnOffCamera={function noRefCheck() { }}
                        // onTurnOnCamera={function noRefCheck() { }}
                        // renderActions={function noRefCheck() { }}
                        // renderDisconnectedView={function noRefCheck() { }}
                        // renderErrorView={function noRefCheck() { }}
                        renderLoadingView={function noRefCheck() {
                            return (
                                <i className="fa-solid fa-camera loader"></i>
                            )
                        }}
                        // renderUnsupportedView={function noRefCheck() { }}
                        // renderVideoInputView={function noRefCheck() { }}
                        // t={function noRefCheck() { }}
                        timeLimit={undefined}
                    />
                </div>}
        </div>
    );
};

const RecordVidPage = (props) => {
    return (
        <div className="App">

            <div className="container mt-5">
                <h4 className=" display-4 text-center mb-4" style={{ color: "white", WebkitTextStroke: "1px #0DCAF0" }}>
                    <i className="fa-solid fa-camera-retro"></i> Record a Video
                </h4>
                <RecordVid push={props.history.push} />
            </div>
        </div >
    )
}

const VideoPreviewPage = (props) => {
    const videoBlob = props.location.state.videoBlob
    const videoURL = window.URL.createObjectURL(videoBlob);
    // const videoType = props.location.state.videoBlob.type;
    // const videoName = props.location.state.videoBlob.text.name;
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('#upload-video').disabled = true;
        const dataForm = new FormData();
        dataForm.append('file', videoBlob);

        if (videoBlob === '') {
            window.alert('Cannot find File')
            window.location.reload();
        }
        console.log(videoBlob);

        // axios.post("http://localhost:5000/save", dataForm, {
        axios.post("https://videorecorder-12.herokuapp.com/save", dataForm, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: ProgressEvent => {
                setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                // //Clear Progress
                // setTimeout(() => {
                //     setUploadPercentage(0)
                // }, 5000);
            }
        }).then((data) => {
            console.log('Yay');
            window.alert(data.request.responseText);
            console.log(data.request.responseText);
            // window.alert('Your file has been uploaded:\n\n' + 'Name: ' + data.data.FileNameNew + '\nPath: ' + data.data.filePath);
            // window.alert('File has been uploaded');
        });
    };

    return (
        <div className="container">
            <h4 className="display-4 text-center mb-4" style={{ color: 'white', WebkitTextStroke: "1px #0DCAF0" }}>
                <i className="fa-brands fa-youtube"></i> Review your Video
            </h4>

            {props.location.state && videoBlob && (
                <div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: 0 }}>
                        <video
                            src={videoURL}
                            width={'100%'}
                            height={'400px'}
                            // autoPlay
                            // loop
                            controls
                        />
                    </div>
                    <div className="mt-4">
                        <button onClick={handleSubmit} className="btn btn-outline-info btn-block mt-4 mb-2" style={{ width: "100%" }} id="upload-video">Upload Recorded Video</button>
                        <Progress percentage={uploadPercentage} />
                        {uploadPercentage === 100 ? <div className='row mt-5'>
                            <button className="btn btn-outline-info" type="button" onClick={() => { window.location.href = "https://react-heroku-frontend.herokuapp.com/" }}>Continue</button>
                        </div> : null}
                    </div>
                </div>
            )}

        </div>
    );
};

export default function App() {
    return (
        <Router>
            <Switch>
                <Redirect to="/RecordVid" exact path="/" />
                <Route path="/RecordVid" component={RecordVidPage} />
                <Route path="/videoPreview" component={VideoPreviewPage} />
            </Switch>
        </Router>
    );
};
