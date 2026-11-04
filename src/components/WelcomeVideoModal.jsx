import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Play, RotateCcw, 
  CalendarCheck, ArrowRight, Landmark, ShieldCheck, 
  Sparkles, AlertCircle 
} from 'lucide-react';

export default function WelcomeVideoModal({ 
  isOpen, 
  onClose, 
  onOpenBooking,
  videoSrc = '/assets/videos/1104.mp4' 
}) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const backdropRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 1. Lifecycle: Handle open / close, body scroll lock, escape key
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard handlers
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        // Toggle play/pause if not typing into an input
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          togglePlay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Attempt video playback with sound enabled by default
    const playTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.defaultMuted = false;
        videoRef.current.muted = false;
        setIsMuted(false);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsBuffering(false);
              setAutoplayBlocked(false);
            })
            .catch((err) => {
              // Autoplay with sound requires user gesture in strict browser environments
              console.warn('[WelcomeVideoModal] Autoplay with sound restricted by browser policy:', err?.message || err);
              setAutoplayBlocked(true);
              setIsBuffering(false);
              setIsPlaying(false);
            });
        }
      }
    }, 150);

    return () => {
      clearTimeout(playTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      
      // Stop and reset playback when closing / unmounting
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  // 2. Controlled Close handler
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  // 3. Sound toggle handler (accessible via 'M' key)
  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // 4. Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 5. Retry handler for errors
  const handleRetry = () => {
    setHasError(false);
    setIsBuffering(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => setAutoplayBlocked(true));
    }
  };

  // 6. Navigation Actions
  const handleBookNow = () => {
    handleClose();
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const handleExploreRooms = () => {
    handleClose();
    navigate('/rooms');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="video-modal-backdrop" 
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-video-heading"
    >
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="video-modal-header">
          <div className="video-modal-header-info">
            <span className="video-modal-eyebrow">
              <Sparkles size={13} />
              MKT Shanthi Nivas • Hotel Video Tour
            </span>
            <h2 id="welcome-video-heading" className="video-modal-title">
              Experience Divine Hospitality in Rameswaram
            </h2>
          </div>

          <button 
            type="button" 
            className="video-modal-close-btn"
            onClick={handleClose}
            aria-label="Close welcome video"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Box (16:9 Aspect Ratio) */}
        <div className="video-player-container">
          <video
            ref={videoRef}
            className="video-player-media"
            src={videoSrc}
            autoPlay
            playsInline
            controls
            preload="auto"
            onLoadedData={() => setIsBuffering(false)}
            onCanPlay={() => setIsBuffering(false)}
            onWaiting={() => {
              if (isPlaying) setIsBuffering(true);
            }}
            onPlaying={() => {
              setIsBuffering(false);
              setIsPlaying(true);
              setAutoplayBlocked(false);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onVolumeChange={() => {
              if (videoRef.current) {
                setIsMuted(videoRef.current.muted);
              }
            }}
            onError={() => {
              setIsBuffering(false);
              setHasError(true);
            }}
          />

          {/* Buffering Spinner */}
          {isBuffering && !hasError && !autoplayBlocked && (
            <div className="video-loading-overlay">
              <div className="video-spinner" />
              <span className="video-loading-text">Loading Hotel Tour...</span>
            </div>
          )}

          {/* Autoplay Blocked Fallback (Click to Start with Sound) */}
          {autoplayBlocked && !isPlaying && !hasError && (
            <div className="video-autoplay-blocked-overlay" onClick={togglePlay}>
              <button 
                type="button" 
                className="video-big-play-btn"
                onClick={togglePlay}
                aria-label="Play Hotel Tour Video with Sound"
              >
                <Play size={32} style={{ marginLeft: '4px' }} />
              </button>
              <span className="video-big-play-label">Click to Play Hotel Tour</span>
            </div>
          )}

          {/* Error Fallback */}
          {hasError && (
            <div className="video-error-container">
              <AlertCircle size={40} className="video-error-icon" />
              <h3 className="video-error-title">Video Preview Unavailable</h3>
              <p className="video-error-desc">
                The video stream could not be loaded directly. You can retry loading or explore our rooms and galleries.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button 
                  type="button" 
                  className="video-btn-rooms"
                  onClick={handleRetry}
                >
                  <RotateCcw size={15} /> Retry
                </button>
                <button 
                  type="button" 
                  className="video-btn-book"
                  onClick={handleExploreRooms}
                >
                  Explore Rooms <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Actions */}
        <div className="video-modal-footer">
          <div className="video-modal-perks">
            <span className="video-perk-item">
              <Landmark size={14} /> 250m to Temple
            </span>
            <span className="video-perk-item">
              <ShieldCheck size={14} /> Clean AC Rooms
            </span>
          </div>

          <div className="video-modal-buttons">
            <button 
              type="button" 
              className="video-btn-rooms"
              onClick={handleExploreRooms}
            >
              Explore Rooms
            </button>
            <button 
              type="button" 
              className="video-btn-book"
              onClick={handleBookNow}
            >
              <CalendarCheck size={15} />
              Book Your Stay
            </button>
            <button 
              type="button" 
              className="video-btn-skip"
              onClick={handleClose}
            >
              Continue to Website →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
