"use client";

import { useState, useRef, useEffect } from "react";
import { Howl, Howler } from "howler";
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
  const howlRef = useRef<Howl | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null); // For requestAnimationFrame
  const isSeekingRef = useRef(false); // Flag to prevent state updates during seek

  // --- Howler Initialization and Cleanup (Depends ONLY on song) ---
  useEffect(() => {
    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (howlRef.current) {
        howlRef.current.stop(); // Stop playback
        howlRef.current.unload(); // Release resources
        howlRef.current = null;
        console.log("Previous Howl instance unloaded.");
      }
      setCurrentTime(0);
      setDuration(0);
    };

    if (song) {
      cleanup(); // Clean up previous instance first

      console.log("Creating new Howl instance for:", song.src);
      // Define handlers outside the Howl constructor to avoid potential context issues

      const handleLoad = () => {
        if (!howlRef.current) return; // Guard clause
        const dur = howlRef.current.duration();
        if (typeof dur === "number" && isFinite(dur)) {
          setDuration(dur);
          console.log("Howl loaded, duration:", dur);
        } else {
          console.error("Failed to get valid duration from Howler on load");
          setDuration(0);
        }
        setCurrentTime(0);
        if (isPlaying) {
          console.log(
            "Attempting to play after load because isPlaying is true"
          );
          howlRef.current.play();
        }
      };

      const handleEnd = () => {
        console.log("Howl onEnd triggered");
        if (howlRef.current) {
          const finalDuration = howlRef.current.duration();
          if (typeof finalDuration === "number" && isFinite(finalDuration)) {
            setCurrentTime(finalDuration);
          }
        }
        onEnded();
      };

      const handlePlay = () => {
        if (!howlRef.current) return;
        console.log("Howl onPlay triggered");
        const currentHowl = howlRef.current; // Capture ref for rAF closure
        const update = () => {
          if (howlRef.current === currentHowl && !isSeekingRef.current) {
            const seek = currentHowl.seek();
            if (typeof seek === "number" && isFinite(seek)) {
              setCurrentTime(seek);
            }
          }
          if (howlRef.current === currentHowl && currentHowl.playing()) {
            animationRef.current = requestAnimationFrame(update);
          }
        };
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(update);
      };

      const handlePause = () => {
        console.log("Howl onPause triggered");
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        if (howlRef.current && !isSeekingRef.current) {
          const seek = howlRef.current.seek();
          if (typeof seek === "number" && isFinite(seek)) {
            setCurrentTime(seek);
          }
        }
      };

      const handleStop = () => {
        if (!howlRef.current) return;
        console.log("Howl onStop triggered");
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        setCurrentTime(0); // Reset time
      };

      const handleSeek = (seekTime: number) => {
        if (!howlRef.current) return;
        console.log("Howl onSeek triggered, time:", seekTime);
        if (isSeekingRef.current) {
          if (typeof seekTime === "number" && isFinite(seekTime)) {
            setCurrentTime(seekTime);
          }
          isSeekingRef.current = false;
        }
      };

      const handleLoadError = (id: number | string, err: unknown) => {
        console.error("Howl load error:", id, err);
        setDuration(0);
        setCurrentTime(0);
      };

      const handlePlayError = (id: number | string, err: unknown) => {
        console.error("Howl play error:", id, err);
        Howler.ctx
          .resume()
          .then(() => {
            console.log("AudioContext resumed successfully after playerror.");
          })
          .catch((e) => {
            console.error("Error resuming AudioContext:", e);
          });
      };

      const newHowl = new Howl({
        src: [song.src],
        volume: volume,
        html5: true,
        format: ["mp3"],
        // Assign the externally defined handlers
        onload: handleLoad,
        onend: handleEnd,
        onplay: handlePlay,
        onpause: handlePause,
        onstop: handleStop,
        onseek: handleSeek, // Pass the time argument directly
        onloaderror: handleLoadError,
        onplayerror: handlePlayError,
      });

      howlRef.current = newHowl;
    } else {
      cleanup(); // Ensure cleanup if song becomes null
    }

    // Cleanup function on component unmount
    return cleanup;
    // This effect ONLY depends on the song object reference
  }, [song]);

  // --- Play/Pause Handling (Depends ONLY on isPlaying) ---
  useEffect(() => {
    if (!howlRef.current) return;

    if (isPlaying) {
      if (!howlRef.current.playing()) {
        console.log("Effect: Playing Howl instance");
        howlRef.current.play();
      }
    } else {
      if (howlRef.current.playing()) {
        console.log("Effect: Pausing Howl instance");
        howlRef.current.pause();
      }
    }
    // This effect ONLY depends on the isPlaying state
  }, [isPlaying]);

  // --- Volume Handling (Depends ONLY on volume) ---
  useEffect(() => {
    if (howlRef.current) {
      // Don't log volume on every change, can be spammy
      // console.log("Effect: Setting volume to:", volume);
      howlRef.current.volume(volume);
    }
    // This effect ONLY depends on the volume state
  }, [volume]);

  // --- Mute Logic (remains mostly the same) ---
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
    if (!seekBarRef.current || duration <= 0 || !howlRef.current) return;

    isSeekingRef.current = true; // Set flag before seeking
    const howl = howlRef.current;
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
    // setCurrentTime(newTime); // Let the onseek handler update currentTime

    // No need to reset isSeekingRef here, let onseek do it
  };

  if (!song) {
    return (
      <div className="music-player placeholder">Wähle einen Song aus.</div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
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
              disabled={!song}
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={onPlayPause}
              className="control-button play-pause"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!song}
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
              value={isMuted ? 0 : volume}
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
          style={{ cursor: duration > 0 ? "pointer" : "default" }}
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
