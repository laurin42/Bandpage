"use client";

import { useState, useRef, useEffect } from "react";
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

export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  coverSrc: string;
}

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isReady, setIsReady] = useState(false); // Track if audio element can play
  const seekBarRef = useRef<HTMLDivElement>(null);

  // --- Audio Element Event Handlers ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsReady(true); // Mark as ready to play
        console.log("Audio loaded metadata, duration:", audio.duration);
      } else {
        console.error(
          "Audio loaded, but duration is not finite:",
          audio.duration
        );
        setDuration(0); // Reset duration if invalid
        setIsReady(false);
      }
    };

    const handleTimeUpdate = () => {
      if (isFinite(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      console.log("Audio ended");
      setCurrentTime(duration); // Ensure time reaches the end visually
      onEnded();
    };

    const handleError = (e: Event) => {
      console.error("Audio Error:", e);
      // You could inspect e.target.error for more details
      setIsReady(false);
      setDuration(0);
      setCurrentTime(0);
    };

    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsReady(true);
      // If isPlaying was intended, try playing now
      if (isPlaying && !audio.paused) {
        // Already playing due to load() potentially triggering play
      } else if (isPlaying && audio.paused) {
        audio.play().catch(handleError); // Catch potential play errors
      }
    };

    const handleWaiting = () => {
      console.log("Audio waiting (buffering)...");
      // Optionally show a loading indicator
    };

    const handlePlaying = () => {
      console.log("Audio playing");
      // Optionally hide loading indicator
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    // Cleanup listeners on unmount or song change
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, [song, duration, isPlaying, onEnded]); // Rerun if song changes or duration needs re-evaluation

  // --- Effect for Song Change ---
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song) {
      console.log("Setting new audio source:", song.src);
      audio.pause(); // Stop previous playback
      setCurrentTime(0);
      setDuration(0);
      setIsReady(false);
      audio.src = song.src;
      audio.load(); // Important: Load the new source
      // Play will be attempted in handleCanPlay or the play/pause effect
    } else if (audio && !song) {
      // Handle case where song becomes null (e.g., playlist ends or cleared)
      audio.pause();
      audio.removeAttribute("src"); // Remove source
      audio.load(); // Reset element state
      setCurrentTime(0);
      setDuration(0);
      setIsReady(false);
    }
  }, [song]); // Only depends on song

  // --- Effect for Play/Pause Control ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return; // Don't control playback if not ready

    if (isPlaying) {
      if (audio.paused) {
        console.log("Effect: Playing audio");
        audio.play().catch((e) => console.error("Play error:", e)); // Catch potential errors
      }
    } else {
      if (!audio.paused) {
        console.log("Effect: Pausing audio");
        audio.pause();
      }
    }
  }, [isPlaying, isReady]); // Depend on playing state and readiness

  // --- Effect for Volume Control ---
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // --- Mute Logic ---
  useEffect(() => {
    if (!isMuted) {
      previousVolumeRef.current = volume; // Store last non-muted volume
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmute: Restore previous volume or a default if previous was 0
      const restoreVolume =
        previousVolumeRef.current > 0.05 ? previousVolumeRef.current : 0.5;
      onVolumeChange(restoreVolume);
      audio.muted = false;
      setIsMuted(false);
    } else {
      // Mute: Store current volume before muting
      previousVolumeRef.current = volume;
      // Set volume state to 0 for slider sync, but use audio.muted for actual muting
      onVolumeChange(0);
      audio.muted = true;
      setIsMuted(true);
    }
  };

  // Sync mute state if volume is set to 0 externally
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (volume === 0 && !isMuted) {
      audio.muted = true;
      setIsMuted(true);
    } else if (volume > 0 && isMuted) {
      // If volume slider is moved while muted, unmute
      audio.muted = false;
      setIsMuted(false);
    }
  }, [volume, isMuted]);

  // --- Seek Bar Handling ---
  const handleSeekBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!seekBarRef.current || duration <= 0 || !audio || !isFinite(duration))
      return;

    const seekBar = seekBarRef.current;
    const rect = seekBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = clickPercentage * duration;

    if (isFinite(newTime)) {
      console.log(
        `Seek bar clicked: ${clickPercentage * 100}%, seeking to: ${newTime}`
      );
      audio.currentTime = newTime;
      setCurrentTime(newTime); // Update state immediately for responsiveness
    } else {
      console.error("Calculated invalid seek time:", newTime);
    }
  };

  // --- Render Logic ---
  if (!song && !audioRef.current?.src) {
    // Show placeholder if no song AND no src set initially
    return (
      <div className="music-player placeholder">Wähle einen Song aus.</div>
    );
  }

  const progressPercent =
    duration > 0 && isFinite(duration) && isFinite(currentTime)
      ? (currentTime / duration) * 100
      : 0;

  return (
    <div className="music-player">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Visible Player UI */}
      <div className="player-ui">
        {/* -- Top Row Elements -- */}
        <div className="cover-art">
          {song ? (
            <Image
              src={song.coverSrc}
              alt={`${song.title} Album Cover`}
              width={60}
              height={60}
              priority
            />
          ) : (
            <div
              className="cover-placeholder"
              style={{ width: 60, height: 60, background: "#333" }}
            ></div>
          )}
        </div>

        <div className="track-info">
          <div className="title">{song?.title || "Kein Song ausgewählt"}</div>
          <div className="artist">{song?.artist || "-"}</div>
        </div>

        {/* -- Controls & Volume Row (Grouped) -- */}
        <div className="controls-volume-wrapper">
          <div className="controls">
            <button
              onClick={onPrev}
              className="control-button"
              aria-label="Previous Song"
              disabled={!song}
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={onPlayPause}
              className="control-button play-pause"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!song || !isReady} // Disable if no song or not ready
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button
              onClick={onNext}
              className="control-button"
              aria-label="Next Song"
              disabled={!song}
            >
              <SkipForward size={24} />
            </button>
          </div>
          <div className="volume-control">
            <button
              onClick={toggleMute}
              className="control-button mute-button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              disabled={!song}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              // Reflect volume state, not mute state directly on slider
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label="Volume"
              disabled={!song}
            />
          </div>
        </div>
        {/* -- End Controls & Volume Row -- */}

        {/* -- Seek Bar Row (Full Width) -- */}
        <div
          className="seek-bar-container"
          ref={seekBarRef}
          onClick={handleSeekBarClick}
          style={{
            cursor: duration > 0 && isFinite(duration) ? "pointer" : "default",
          }}
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
