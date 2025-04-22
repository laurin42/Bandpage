"use client";

import { useState, useRef } from "react";
import ReactHowler from "react-howler";
import "@/styles/music-player.css"; // Add import for player styles

// TODO: Enhance to play multiple songs (e.g., Witches.mp3, StillRock.mp3)

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8); // Start slightly lower
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  // Optional: Add functions for seeking, displaying duration/progress, etc.

  return (
    <div className="music-player">
      <ReactHowler
        src="/Witches.mp3" // Use an existing song from /public
        playing={playing}
        volume={volume}
        ref={playerRef}
        html5={true} // Recommended for broader compatibility
        // Add event handlers if needed (onLoad, onPlay, onEnd, etc.)
        // onEnd={() => setPlaying(false)}
      />

      <div className="player-controls">
        <button
          onClick={() => setPlaying(!playing)}
          className="play-pause-button"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <div className="volume-control">
          <label htmlFor="volumeSlider">Volume:</label>
          <input
            id="volumeSlider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>
      {/* TODO: Add song title display and selection */}
    </div>
  );
}
