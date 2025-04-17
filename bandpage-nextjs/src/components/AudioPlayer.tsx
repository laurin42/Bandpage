"use client"; // This component needs client-side interactivity

import React, { useState, useEffect, useRef } from "react";

// Define the structure for a track
interface Track {
  name: string;
  file: string;
  duration: string;
}

const AudioPlayer = () => {
  const [listAudio, setListAudio] = useState<Track[]>([
    {
      name: "Burnheart Mockery - Still Rock",
      file: "/StillRock.mp3", // Assuming mp3s are moved to public
      duration: "03:32",
    },
    {
      name: "Burnheart Mockery - Witches",
      file: "/Witches.mp3",
      duration: "06:41",
    },
  ]);
  const [indexAudio, setIndexAudio] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Control player visibility
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false); // Control playlist visibility

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      setCurrentAudio(audioRef.current);
      // Set initial source
      audioRef.current.src = listAudio[indexAudio].file;
    }
  }, [listAudio, indexAudio]); // Re-run if listAudio or indexAudio changes

  // Effect to load metadata and set duration
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      // Preload metadata for the first track
      if (audio.readyState < 1) {
        // HAVE_NOTHING or HAVE_METADATA
        audio.load();
      }

      return () =>
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, [indexAudio]); // Depend on indexAudio to reload metadata for new tracks

  // Effect for time updates
  useEffect(() => {
    const audio = currentAudio;
    if (audio) {
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.ended) {
          handleNext(); // Go to next track when current one ends
        }
      };
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [currentAudio, isPlaying]); // Re-attach listener if audio or playing state changes

  // Effect to update play/pause state
  useEffect(() => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio
          .play()
          .catch((e) => console.error("Error playing audio:", e));
      } else {
        currentAudio.pause();
      }
    }
  }, [isPlaying, currentAudio, indexAudio]); // Also depend on indexAudio to handle track changes

  // Helper to format time (MM:SS)
  const formatTime = (time: number): string => {
    if (isNaN(time) || time === Infinity) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const newIndex = (indexAudio + 1) % listAudio.length;
    setIndexAudio(newIndex);
    setIsPlaying(true); // Start playing next track immediately
    // Ensure audio element src is updated if not handled by indexAudio effect alone
    if (audioRef.current) audioRef.current.src = listAudio[newIndex].file;
  };

  const handlePrevious = () => {
    const newIndex = (indexAudio - 1 + listAudio.length) % listAudio.length;
    setIndexAudio(newIndex);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.src = listAudio[newIndex].file;
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentAudio && progressBarRef.current) {
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percent = offsetX / progressBar.offsetWidth;
      const newTime = percent * duration;
      currentAudio.currentTime = newTime;
      setCurrentTime(newTime); // Update state immediately for smoother UI
    }
  };

  const handleForward = () => {
    if (currentAudio) {
      currentAudio.currentTime = Math.min(
        currentAudio.currentTime + 5,
        duration
      );
    }
  };

  const handleRewind = () => {
    if (currentAudio) {
      currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
    }
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTrackClick = (index: number) => {
    if (index === indexAudio) {
      togglePlayPause();
    } else {
      setIndexAudio(index);
      setIsPlaying(true);
      if (audioRef.current) audioRef.current.src = listAudio[index].file;
    }
  };

  const togglePlayerVisibility = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  const togglePlaylistVisibility = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };

  // Calculate progress for the bar
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Button to show player (visible on small screens) */}
      <button
        id="showplayerbtn"
        onClick={togglePlayerVisibility}
        className="md:hidden fixed bottom-4 right-4 z-20 flex items-center gap-2 p-3 font-['Calistoga'] bg-[rgba(171,164,164,0.8)] hover:bg-[rgba(94,90,90,0.8)] text-gray-800 rounded-full border border-gray-400 shadow-md cursor-pointer h-14"
      >
        <i className="fas fa-music-note text-xl"></i>{" "}
        {/* Replace with actual icon if needed */}
        <span className="text-sm">Listen</span>
      </button>

      {/* Audio Player Container (conditionally visible or absolutely positioned) */}
      <div
        ref={playerContainerRef}
        className={`player-ctn ${
          isPlayerVisible ? "block" : "hidden"
        } md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 p-4 rounded-lg bg-[rgba(196,192,192,0.6)] text-white shadow-lg w-[90vw] md:w-auto md:min-w-[300px] md:max-w-[500px] backdrop-blur-sm`}
        // Add conditional visibility/positioning based on isPlayerVisible and screen size
      >
        <button
          onClick={() => setIsPlayerVisible(false)}
          className="absolute top-1 right-1 md:hidden text-white hover:text-gray-300 z-20"
        >
          <i className="fas fa-times"></i> {/* Close Button */}{" "}
        </button>

        <audio ref={audioRef} preload="metadata">
          {/* Source will be set dynamically */}
          Your browser does not support the audio element.
        </audio>

        <div className="infos-ctn flex items-center justify-between mb-2">
          <div className="timer text-sm">{formatTime(currentTime)}</div>
          <div className="title text-sm font-semibold mx-2 truncate flex-grow text-center">
            {listAudio[indexAudio]?.name}
          </div>
          <div className="duration text-sm">{formatTime(duration)}</div>
        </div>

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          id="myProgress"
          onClick={handleSeek}
          className="w-full h-[5px] bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer mb-3"
        >
          <div
            id="myBar"
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-orange-400 rounded-full"
          ></div>
        </div>

        {/* Controls */}
        <div className="btn-ctn flex items-center justify-center gap-3 text-xl">
          <button onClick={handlePrevious} title="Previous">
            <i className="fas fa-step-backward"></i>
          </button>
          <button onClick={handleRewind} title="Rewind 5s">
            <i className="fas fa-backward"></i>
          </button>
          <button
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            className="text-2xl"
          >
            {isPlaying ? (
              <i className="fas fa-pause"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
          <button onClick={handleForward} title="Forward 5s">
            <i className="fas fa-forward"></i>
          </button>
          <button onClick={handleNext} title="Next">
            <i className="fas fa-step-forward"></i>
          </button>
          <button onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? (
              <i className="fas fa-volume-mute"></i>
            ) : (
              <i className="fas fa-volume-up"></i>
            )}
          </button>
          {/* Playlist Toggle Button */}
          <button
            onClick={togglePlaylistVisibility}
            title="Toggle Playlist"
            className="ml-auto"
          >
            <i className="fas fa-list"></i>
          </button>
        </div>

        {/* Playlist (conditionally visible) */}
        <div
          className={`playlist-ctn mt-4 ${
            isPlaylistVisible ? "block" : "hidden"
          } max-h-40 overflow-y-auto`}
        >
          {listAudio.map((track, index) => (
            <div
              key={index}
              onClick={() => handleTrackClick(index)}
              data-index={index}
              className={`playlist-track-ctn flex items-center p-2 mt-1 rounded cursor-pointer transition-colors ${
                indexAudio === index
                  ? "bg-gray-600 text-white font-bold"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <div className="playlist-btn-play mr-2">
                {indexAudio === index && isPlaying ? (
                  <i className="fas fa-pause text-sm"></i>
                ) : (
                  <i className="fas fa-play text-sm"></i>
                )}
              </div>
              <div className="playlist-info-track text-sm truncate flex-grow">
                {track.name}
              </div>
              <div className="playlist-duration text-xs ml-2">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
