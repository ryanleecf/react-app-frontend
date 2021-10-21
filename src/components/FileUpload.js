import React, { Fragment, useState } from 'react'
import axios from 'axios';
// import ReactPlayer from 'react-player'
import Message from './message';
import Progress from './progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        //pertains to backend in server.js
        formData.append('file', file);

        if (file === '') {
            window.alert('No File was Uploaded');
            window.location.reload();
        }
        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                // const res = await axios.post('https://videorecorder-12.herokuapp.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                    // //Clear Progress
                    // setTimeout(() => {
                    //     setUploadPercentage(0)
                    // }, 5000);

                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setMessage('File Uploaded');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
            <h4 className="display-4 text-center mb-4" style={{ color: "white", WebkitTextStroke: "1px #0DCAF0" }}>
                <i className="fa-solid fa-upload"></i> Upload a Video
            </h4>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-3">
                    <input className="form-control border border-info border border-2" type="file" id="customFile" onChange={onChange} />
                </div>
                <Progress percentage={uploadPercentage} />

                <input type="submit" value="Upload" className="btn btn-outline-info btn-block mt-4" style={{ width: '100%' }} />
            </form>
            {uploadPercentage === 100 ? <div className='row mt-5'>
                <button className="btn btn-info" type="button">Continue</button>
            </div> : null}

            {/* //Conditional */}
            {/* {uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <ReactPlayer
                        url='{uploadedFile}'
                        width='100%'
                        height='360px'
                    />
                    <img src={uploadedFile.filePath} alt="" />
                </div>
            </div> : null} */}
        </Fragment >
    )
}

export default FileUpload;
