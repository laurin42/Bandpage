"use client";

import { useState, useRef, useEffect } from "react";
import ReactHowler from "react-howler";
import Image from "next/image"; // For album covers
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"; // Icons
import "@/styles/music-player.css"; // Add import for player styles

// Define the structure for a song
export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string; // Path to audio file
  coverSrc: string; // Path to cover image
}

// Define props for the MusicPlayer component
interface MusicPlayerProps {
  song: Song | null; // The currently selected song
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (newVolume: number) => void;
  onEnded: () => void; // Callback when song ends
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  volume,
  onPlayPause,
  onNext,
  onPrev,
  onVolumeChange,
  onEnded,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);

  useEffect(() => {
    // Store previous volume when volume changes
    if (!isMuted) {
      previousVolumeRef.current = volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      // Unmute: Restore previous volume
      onVolumeChange(
        previousVolumeRef.current > 0.05 ? previousVolumeRef.current : 0.5
      );
      setIsMuted(false);
    } else {
      // Mute: Set volume to 0
      previousVolumeRef.current = volume; // Store current volume before muting
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  // Handle edge case where external volume change unmutes
  useEffect(() => {
    if (volume > 0 && isMuted) {
      setIsMuted(false);
    }
    if (volume === 0 && !isMuted) {
      setIsMuted(true);
    }
  }, [volume, isMuted]);

  if (!song) {
    return (
      <div className="music-player placeholder">Wähle einen Song aus.</div>
    ); // Placeholder if no song is selected
  }

  return (
    <div className="music-player">
      {/* Howler instance - hidden, controls playback */}
      <ReactHowler
        src={song.src}
        playing={isPlaying}
        volume={volume}
        ref={playerRef}
        html5={true}
        onEnd={onEnded} // Call parent's onEnd handler
        // format={['mp3']} // Specify format if needed
      />

      {/* Visible Player UI */}
      <div className="player-ui">
        <div className="cover-art">
          <Image
            src={song.coverSrc}
            alt={`${song.title} Album Cover`}
            width={60} // Adjust size as needed
            height={60}
            priority // Prioritize loading cover art
          />
        </div>

        <div className="track-info">
          <div className="title">{song.title}</div>
          <div className="artist">{song.artist}</div>
        </div>

        <div className="controls">
          <button
            onClick={onPrev}
            className="control-button"
            aria-label="Previous Song"
          >
            <SkipBack size={24} />
          </button>
          <button
            onClick={onPlayPause}
            className="control-button play-pause"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button
            onClick={onNext}
            className="control-button"
            aria-label="Next Song"
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div className="volume-control">
          <button
            onClick={toggleMute}
            className="control-button mute-button"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
