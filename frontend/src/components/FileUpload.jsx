import React, { useRef, useState } from 'react';
import { FiUpload, FiFile, FiCheck, FiX } from 'react-icons/fi';
import './FileUpload.css';

const FileUpload = ({ onUpload, isUploading = false }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }
        setSelectedFile(file);
        onUpload(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const clearFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="file-upload">
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            <div
                className={`file-upload-zone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''
                    }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                {selectedFile ? (
                    <div className="file-selected">
                        <FiFile className="file-icon" />
                        <div className="file-info">
                            <p className="file-name">{selectedFile.name}</p>
                            <p className="file-size">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        {!isUploading && (
                            <button
                                className="file-remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFile();
                                }}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="file-upload-prompt">
                        <FiUpload className="upload-icon" />
                        <p className="upload-text">
                            {isDragging ? 'Drop PDF file here' : 'Click or drag PDF to upload'}
                        </p>
                        <p className="upload-hint">PDF files only</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
