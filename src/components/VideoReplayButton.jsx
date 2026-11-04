import React from 'react';
import { Play } from 'lucide-react';

export default function VideoReplayButton({ onClick }) {
  return (
    <button
      type="button"
      className="video-float-replay-btn"
      onClick={onClick}
      aria-label="Watch MKT Shanthi Nivas Hotel Video Tour"
      title="Watch Hotel Video Tour"
    >
      <div className="video-float-icon-wrap">
        <Play size={14} style={{ marginLeft: '2px' }} fill="currentColor" />
      </div>
      <div className="video-float-label">
        <small>Virtual Tour</small>
        <strong>Hotel Video</strong>
      </div>
    </button>
  );
}

