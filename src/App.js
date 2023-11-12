import React, { useState, useRef, useEffect } from "react";
import './App.css';

const VideoPlayer = () => {
  const videoUrl = [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const [showChangeButton, setShowChangeButton] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(null);
  const videoRef = useRef(null);

  const nextVideo = () => {
    if (currentVideo < videoUrl.length - 1) {
      setCurrentVideo(currentVideo + 1);
      setShowChangeButton(false);
      startTimer();
      console.log(currentVideo);
      console.log(currentVideo < videoUrl.length - 1)
    } else {
      alert('Todos os vídeos já foram reproduzidos');
    }
  };

  const handleShowButton = () => {
    setShowChangeButton(true);
  };

  const startTimer = () => {
    setCancelTimer(
      setTimeout(() => {
        nextVideo();
      }, 5000)
    );
  };

  const cancelTimerFunction = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
    setShowChangeButton(false)
    clearTimeout(cancelTimer);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement.duration - videoElement.currentTime <= 5) {
        handleShowButton();
      }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    videoElement.addEventListener('ended', () => {
      startTimer();
    });

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', startTimer);
    };
  });

  return (
    <div className="playerContainer">
      {showChangeButton && (
        <div>
          <button onClick={cancelTimerFunction} className="cancelbtn">
            Cancelar
          </button>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl[currentVideo]}
        className="player"
        controls
        autoPlay
      />
      {showChangeButton && (
        <div>
          <button onClick={nextVideo} className="changevideobtn">
            Trocar de Vídeo
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
