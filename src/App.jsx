import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Users, User, Download, ChevronRight, X, Image as ImageIcon, Camera as CameraIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { POSES } from './poses';
import './App.css';

const App = () => {
  // App states: 'home', 'layout_select', 'scanning', 'camera', 'review'
  const [appState, setAppState] = useState('home');
  const [layout, setLayout] = useState('solo'); // 'solo' or 'grid3'
  const [detectedMode, setDetectedMode] = useState('solo'); // 'solo' or 'duo'
  const [activePose, setActivePose] = useState(null);
  
  const [photos, setPhotos] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Stream management
  useEffect(() => {
    let stream = null;
    if (['scanning', 'camera'].includes(appState)) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(s => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.error("Error accessing camera:", err));
    }
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [appState]);

  // AI Scanner Mock
  useEffect(() => {
    if (appState === 'scanning') {
      const timer = setTimeout(() => {
        // Randomly assign solo or duo for demo purposes, leaning towards duo
        const detected = Math.random() > 0.5 ? 'duo' : 'solo';
        setDetectedMode(detected);
        setAppState('camera');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [appState]);
  
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Mirror the capture if the video is mirrored (standard for webcams)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos(prev => [...prev, dataUrl]);
  }, []);

  const startCaptureSequence = () => {
    setIsRecording(true);
    let photoCount = 0;
    const targetPhotos = layout === 'solo' ? 1 : 3;
    setPhotos([]); // clear previous

    const takeNext = () => {
      if (photoCount >= targetPhotos) {
        setIsRecording(false);
        setAppState('review');
        return;
      }

      setCountdown(3);
      let count = 3;
      const t = setInterval(() => {
        count--;
        if (count > 0) {
          setCountdown(count);
        } else {
          clearInterval(t);
          setCountdown(null);
          // Quick flash effect logic can be added here
          capturePhoto();
          photoCount++;
          setTimeout(takeNext, 1000); // Wait 1s before next countdown
        }
      }, 1000);
    };

    takeNext();
  };

  const handleDownload = useCallback(() => {
    // For grid3, we'd ideally composite them onto one canvas.
    // For simplicity, download the first one or trigger multiple.
    // Better yet, generate a photostrip layout on a canvas and download it.
    if (photos.length === 0) return;
    
    if (layout === 'solo') {
      const a = document.createElement('a');
      a.href = photos[0];
      a.download = 'photobooth-solo.png';
      a.click();
    } else {
      // Create photostrip
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600 * 3 + 200; // 3 photos + padding
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#F3E4C9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const imgLoadPromises = photos.map((src, i) => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => {
            // draw with padding
            ctx.drawImage(img, 50, 50 + (i * 620), 500, 580);
            resolve();
          };
          img.src = src;
        });
      });
      
      Promise.all(imgLoadPromises).then(() => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'photobooth-grid.png';
        a.click();
      });
    }
  }, [photos, layout]);

  useEffect(() => {
    if (appState === 'review' && photos.length > 0) {
      // Instant auto-save right after capture finishes
      handleDownload();
    }
  }, [appState, photos, handleDownload]);

  const renderHome = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="home-container">
      <div className="home-content glass-panel">
        <h1 className="glow-text">Cozy Snaps 📸</h1>
        <p>Premium Digital Photobooth Experience</p>
        <button className="primary-btn" onClick={() => setAppState('layout_select')}>
          Start Session
        </button>
      </div>
    </motion.div>
  );

  const renderLayoutSelect = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="layout-container">
      <h2 className="glow-text" style={{marginBottom: '2rem'}}>Choose Format</h2>
      <div className="layout-options">
        <div className={`layout-card glass-panel ${layout === 'solo' ? 'active' : ''}`} onClick={() => setLayout('solo')}>
          <ImageIcon size={48} />
          <h3>Solo Frame</h3>
          <p>1 High-Quality Capture</p>
        </div>
        <div className={`layout-card glass-panel ${layout === 'grid3' ? 'active' : ''}`} onClick={() => setLayout('grid3')}>
          <div className="icon-grid">
             <ImageIcon size={24} /> <ImageIcon size={24} /> <ImageIcon size={24} />
          </div>
          <h3>Photo Strip</h3>
          <p>3 Stacked Captures</p>
        </div>
      </div>
      <button className="primary-btn mt-4" onClick={() => setAppState('scanning')}>
        Continue <ChevronRight />
      </button>
    </motion.div>
  );

  const renderScanning = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scanning-container full-screen">
      <video ref={videoRef} autoPlay playsInline muted className="bg-video" />
      <div className="scanning-overlay">
        <div className="scanner-line"></div>
        <h2 className="glow-text">Scanning Scene...</h2>
        <p>AI is detecting the number of subjects for pose suggestions.</p>
        <div className="scanning-pulse"></div>
      </div>
    </motion.div>
  );

  const renderCamera = () => {
    const posesList = POSES[detectedMode] || [];
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="camera-container full-screen">
        <video ref={videoRef} autoPlay playsInline muted className="main-video" />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {/* Silhouette Overlay */}
        {activePose && (
          <div className="pose-overlay" dangerouslySetInnerHTML={{ __html: activePose.outline }} />
        )}
        
        {/* Top HUD */}
        <div className="camera-hud-top fade-in">
          <div className="hud-chip glass-panel">
            <span className="live-dot" /> LIVE
          </div>
          <div className="hud-chip glass-panel" onClick={() => setDetectedMode(detectedMode === 'solo' ? 'duo' : 'solo')} style={{cursor: 'pointer'}}>
            {detectedMode === 'solo' ? <User size={16} /> : <Users size={16} />} 
            {detectedMode === 'solo' ? '1 Person' : '2 People'} Detected
            <RefreshCw size={14} style={{marginLeft: 8, opacity: 0.5}} />
          </div>
        </div>

        {/* Countdown */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div 
              className="countdown-overlay glow-text"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              key={countdown} // triggers animation on every change
            >
              {countdown}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side HUD for Poses */}
        <div className="camera-hud-side glass-panel slide-right">
          <p className="slider-label">Poses</p>
          <div className="poses-scroll-vertical">
            <div 
              className={`pose-item ${!activePose ? 'active' : ''}`}
              onClick={() => setActivePose(null)}
            >
              <X size={24} />
              <span>None</span>
            </div>
            {posesList.map(pose => (
              <div 
                key={pose.id} 
                className={`pose-item ${activePose?.id === pose.id ? 'active' : ''}`}
                onClick={() => setActivePose(pose)}
              >
                <div className="pose-thumb" dangerouslySetInnerHTML={{ __html: pose.outline }} />
                <span>{pose.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="camera-hud-bottom transparent slide-up">
          <div className="capture-controls">
            <button 
              className={`shutter-btn ${isRecording ? 'recording' : ''}`} 
              onClick={startCaptureSequence}
              disabled={isRecording}
            >
              <div className="shutter-inner" />
            </button>
            <p className="layout-hint glow-text">
              {layout === 'solo' ? '1 Photo' : 'Grid of 3'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderReview = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="review-container">
      <h2 className="glow-text text-center mt-4">Your Captures</h2>
      <p style={{color: 'var(--brand-gradient)'}} className="glow-text text-center mt-2">Saved automatically to your device! ✨</p>
      <div className={`results-wrapper ${layout}`}>
        {photos.map((src, idx) => (
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: idx * 0.2 }}
            key={idx} 
            src={src} 
            alt="capture" 
            className="captured-img glass-panel" 
          />
        ))}
      </div>
      <div className="review-actions glass-panel">
        <button className="secondary-btn" onClick={() => setAppState('home')}>
          Retake
        </button>
        <button className="primary-btn" onClick={handleDownload}>
          <Download size={18} style={{marginRight: 8}} /> Download
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="app-wrapper">
      {appState === 'home' && renderHome()}
      {appState === 'layout_select' && renderLayoutSelect()}
      {appState === 'scanning' && renderScanning()}
      {appState === 'camera' && renderCamera()}
      {appState === 'review' && renderReview()}
    </div>
  );
};

export default App;
