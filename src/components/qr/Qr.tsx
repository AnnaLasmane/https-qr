import React, { useState, useEffect, useRef } from 'react';
import './qr.css';
import { BrowserQRCodeReader } from '@zxing/browser';

const Qr: React.FC = () => {
  const [isCameraOpen, setCameraOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    if (isCameraOpen) {
      openCamera();
    } else {
      closeCamera();
    }

    return () => {
      closeCamera();
    };
  }, [isCameraOpen]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startScanning();
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    stopScanning();
  };

  const startScanning = () => {
    const codeReader = new BrowserQRCodeReader();
    codeReaderRef.current = codeReader;

    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result, error) => {
      if (result) {
        console.log('QR code result:', result.text);
        window.open(result.text, '_blank'); // Open scanned link in a new window/tab
        closeCamera();
      } else {
        console.error('Error decoding QR code:', error);
      }
    });
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
  };

  const handleScanButtonClick = () => {
    setCameraOpen(true);
  };

  const handleCameraClose = () => {
    setCameraOpen(false);
  };

  return (
    <div className="qr-container">
      {isCameraOpen ? (
        <div className="camera-container">
          <video ref={videoRef} autoPlay className="video-stream" />
          <button className="close-button" onClick={handleCameraClose}>
            Close Camera
          </button>
        </div>
      ) : (
        <button className="scan-button" onClick={handleScanButtonClick}>
          Scan QR Code
        </button>
      )}
    </div>
  );
};

export default Qr;
