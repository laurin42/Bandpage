"use client";

import { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
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
  // Ref to hold the Howl instance
  const howlRef = useRef<Howl | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null); // For requestAnimationFrame

  // --- Howler Initialization and Cleanup ---
  useEffect(() => {
    const cleanup = () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
        console.log("Previous Howl instance unloaded.");
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
    };

    if (song) {
      cleanup();

      console.log("Creating new Howl instance for:", song.src);
      const newHowl = new Howl({
        src: [song.src],
        volume: volume,
        html5: true,
        format: ["mp3"],
        onload: () => {
          const dur = newHowl.duration();
          if (typeof dur === "number" && isFinite(dur)) {
            setDuration(dur);
            console.log("Howl loaded, duration:", dur);
          } else {
            console.error("Failed to get valid duration from Howler on load");
            setDuration(0);
          }
          setCurrentTime(0);
          if (isPlaying) {
            newHowl.play();
          }
        },
        onend: () => {
          console.log("Howl onEnd triggered");
          setCurrentTime(duration);
          onEnded();
        },
        onplay: () => {
          console.log("Howl onPlay triggered");
          // Start updating seek bar
          const update = () => {
            if (howlRef.current) {
              const seek = howlRef.current.seek();
              if (typeof seek === "number" && isFinite(seek)) {
                setCurrentTime(seek);
              }
            }
            if (howlRef.current?.playing()) {
              animationRef.current = requestAnimationFrame(update);
            }
          };
          animationRef.current = requestAnimationFrame(update);
        },
        onpause: () => {
          console.log("Howl onPause triggered");
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
          if (howlRef.current) {
            const seek = howlRef.current.seek();
            if (typeof seek === "number" && isFinite(seek)) {
              setCurrentTime(seek);
            }
          }
        },
        onstop: () => {
          console.log("Howl onStop triggered");
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
          setCurrentTime(0);
        },
        onloaderror: (id, err) => {
          console.error("Howl load error:", id, err);
          setDuration(0);
          setCurrentTime(0);
        },
        onplayerror: (id, err) => {
          console.error("Howl play error:", id, err);
          Howler.ctx.resume();
        },
      });
      howlRef.current = newHowl;
    } else {
      cleanup();
    }

    return cleanup;
  }, [song, duration, isPlaying, onEnded, volume]);

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
  }, [isPlaying]);

  // --- Volume Handling ---
  useEffect(() => {
    if (howlRef.current) {
      console.log("Effect: Setting volume to:", volume);
      howlRef.current.volume(volume);
    }
  }, [volume]);

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
    if (!seekBarRef.current || duration <= 0 || !howlRef.current) return;

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
    setCurrentTime(newTime);
  };

  if (!song) {
    return (
      <div className="music-player placeholder">Wähle einen Song aus.</div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      {/* <ReactHowler ... /> */}

      {/* Visible Player UI (remains mostly the same) */}
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
              disabled={!song} // Disable if no song
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={onPlayPause}
              className="control-button play-pause"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!song} // Disable if no song
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button
              onClick={onNext}
              className="control-button"
              aria-label="Next Song"
              disabled={!song} // Disable if no song
            >
              <SkipForward size={24} />
            </button>
          </div>
          <div className="volume-control">
            <button
              onClick={toggleMute}
              className="control-button mute-button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              disabled={!song} // Disable if no song
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume} // Reflect mute state in slider value
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label="Volume"
              disabled={!song} // Disable if no song
            />
          </div>
        </div>
        {/* -- End Controls & Volume Row -- */}

        {/* -- Seek Bar Row (Full Width) -- */}
        <div
          className="seek-bar-container"
          ref={seekBarRef}
          onClick={handleSeekBarClick}
          style={{ cursor: duration > 0 ? "pointer" : "default" }} // Add cursor only if seekable
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
