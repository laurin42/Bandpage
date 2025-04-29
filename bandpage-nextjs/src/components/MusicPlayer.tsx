"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactHowler from "react-howler";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import "@/styles/music-player.scss";
import "@/styles/seek-bar.scss";

// Define the structure for a song
export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  coverSrc: string;
}

// Define props for the MusicPlayer component
interface MusicPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (newVolume: number) => void;
  onEnded: () => void;
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
  // REVERT Ref type to any to avoid incorrect typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const seekBarRef = useRef<HTMLDivElement>(null);

  // --- Howler Event Handlers ---
  const handleOnLoad = useCallback(() => {
    if (playerRef.current?.howler) {
      const howl = playerRef.current.howler;
      const dur = howl.duration();
      if (typeof dur === "number" && isFinite(dur)) {
        setDuration(dur);
        setCurrentTime(0);
        console.log("Audio loaded, duration:", dur);
      } else {
        console.error("Failed to get valid duration from Howler on load");
        setDuration(0);
        setCurrentTime(0);
      }
    }
  }, []);

  // Interval timer for time updates
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const updateCurrentTime = () => {
      if (playerRef.current?.howler) {
        const howl = playerRef.current.howler;
        if (isPlaying) {
          const seek = howl.seek();
          if (typeof seek === "number" && isFinite(seek)) {
            setCurrentTime(seek);
          }
        }
      }
    };

    if (isPlaying) {
      updateCurrentTime();
      intervalId = setInterval(updateCurrentTime, 250);
    } else if (intervalId) {
      clearInterval(intervalId);
      const howl = playerRef.current?.howler;
      if (howl) {
        const seek = howl.seek();
        if (typeof seek === "number" && isFinite(seek)) {
          setCurrentTime(seek);
        }
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [song]);

  // --- Mute Logic (remains the same) ---
  useEffect(() => {
    if (!isMuted) {
      previousVolumeRef.current = volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(
        previousVolumeRef.current > 0.05 ? previousVolumeRef.current : 0.5
      );
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume;
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (volume > 0 && isMuted) {
      setIsMuted(false);
    }
    if (volume === 0 && !isMuted) {
      setIsMuted(true);
    }
  }, [volume, isMuted]);

  const handleSeekBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!seekBarRef.current || duration <= 0 || !playerRef.current?.howler)
      return;

    const howl = playerRef.current.howler;
    const seekBar = seekBarRef.current;
    const rect = seekBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = clickPercentage * duration;

    console.log(
      `Seek bar clicked: ${clickPercentage * 100}%, seeking to: ${newTime}`
    );
    howl.seek(newTime);
    setCurrentTime(newTime);
  };

  if (!song) {
    return (
      <div className="music-player placeholder">Wähle einen Song aus.</div>
    );
  }

  // Calculate progress percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      {/* Howler instance - hidden, controls playback */}
      <ReactHowler
        src={song.src}
        playing={isPlaying}
        volume={volume}
        ref={playerRef}
        html5={true}
        onLoad={handleOnLoad}
        onEnd={onEnded}
      />

      {/* Visible Player UI */}
      <div className="player-ui">
        {/* -- Top Row Elements -- */}
        <div className="cover-art">
          <Image
            src={song.coverSrc}
            alt={`${song.title} Album Cover`}
            width={60}
            height={60}
            priority
          />
        </div>

        <div className="track-info">
          <div className="title">{song.title}</div>
          <div className="artist">{song.artist}</div>
        </div>

        {/* -- Controls & Volume Row (Grouped) -- */}
        <div className="controls-volume-wrapper">
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
        {/* -- End Controls & Volume Row -- */}

        {/* -- Seek Bar Row (Full Width) -- */}
        <div
          className="seek-bar-container"
          ref={seekBarRef}
          onClick={handleSeekBarClick}
        >
          <div className="seek-bar-track">
            <div
              className="seek-bar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        {/* -- End Seek Bar -- */}
      </div>
    </div>
  );
};

export default MusicPlayer;
