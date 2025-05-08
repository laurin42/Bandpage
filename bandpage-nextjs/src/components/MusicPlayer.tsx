"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
} from "lucide-react";
import "@/styles/music-player.scss";
import "@/styles/seek-bar.scss";
import useAudioPlayerControls from "@/hooks/useAudioPlayerControls";

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
  const seekBarRef = useRef<HTMLDivElement>(null);

  const {
    audioRef,
    isMuted,
    duration,
    currentTime,
    isReady,
    toggleMute,
    handleSeekBarClick,
  } = useAudioPlayerControls({
    song,
    isPlaying,
    volume,
    onEnded,
    onVolumeChangeProp: onVolumeChange,
    seekBarRef,
  });

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`music-player ${song ? "song-loaded" : "no-song"}`}>
      <audio ref={audioRef} preload="metadata" />

      <div className="player-ui">
        <div className="cover-art">
          {song?.coverSrc ? (
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
              style={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
              }}
            >
              <Music2 size={32} />
            </div>
          )}
        </div>

        <div className="track-info">
          <div className="title">{song?.title || "Kein Song ausgewählt"}</div>
          <div className="artist">{song?.artist || "-"}</div>
        </div>

        <div className="controls-volume-wrapper">
          <div className="controls">
            <button
              onClick={onPrev}
              className="control-button prev-button"
              aria-label="Previous Song"
              disabled={!song}
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={onPlayPause}
              className="control-button play-pause-button"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!song || !isReady}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button
              onClick={onNext}
              className="control-button next-button"
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
              {isMuted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label="Volume"
              disabled={!song}
            />
          </div>
        </div>

        <div
          ref={seekBarRef}
          className={`seek-bar-container seek-bar ${
            !isReady || !song ? "disabled" : ""
          }`}
          onClick={isReady && song ? handleSeekBarClick : undefined}
          style={{ cursor: isReady && song ? "pointer" : "default" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-label="Song progress"
          tabIndex={isReady && song ? 0 : -1}
        >
          <div className="seek-bar-track">
            <div
              className="seek-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div
            className="seek-bar-thumb"
            style={{ left: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
