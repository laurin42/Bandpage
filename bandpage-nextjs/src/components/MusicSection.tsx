import React, { useState, useEffect, useRef, useCallback } from "react";
import MusicPlayer, { Song } from "./MusicPlayer";
import "@/styles/music-section.scss"; // Add import for section styles

// Define song data
const songs: Song[] = [
  {
    id: 1,
    title: "Lift Me Up",
    artist: "Burnheart Mockery",
    src: "/audio/liftMeUp.mp3",
    coverSrc: "/cover/liftMeUp.webp",
  },
  {
    id: 2,
    title: "Still Rock",
    artist: "Burnheart Mockery",
    src: "/audio/stillRock.mp3",
    coverSrc: "/cover/stillRock.webp",
  },
  // Add more songs here...
  {
    id: 3,
    title: "Dignity Blues",
    artist: "Burnheart Mockery",
    src: "/audio/dignityBlues.mp3",
    coverSrc: "/cover/dignityBlues.webp",
  },
  {
    id: 4,
    title: "Mary",
    artist: "Burnheart Mockery",
    src: "/audio/mary.mp3",
    coverSrc: "/cover/mary.webp",
  },
  {
    id: 5,
    title: "Fast Living World",
    artist: "Burnheart Mockery",
    src: "/audio/fastLivingWorld.mp3",
    coverSrc: "/cover/fastLivingWorld.webp",
  },
  {
    id: 6,
    title: "Midnight Roller",
    artist: "Burnheart Mockery",
    src: "/audio/midnightRoller.mp3",
    coverSrc: "/cover/midnightRoller.webp",
  },
];

const MusicSection = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true);
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const handleSongEnd = useCallback(() => {
    handleNext();
  }, [handleNext]);

  // --- Automatic Pause Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPlaying(false);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    // Cleanup observer on unmount
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []); // Run only once on mount

  // Pause playback when component unmounts (e.g., navigating away)
  useEffect(() => {
    return () => {
      // This cleanup runs when the component unmounts
      // We don't have a direct way to pause ReactHowler here without access
      // to its instance, but the state change should stop it on next render.
      // If direct control is needed, the Howl instance needs to be managed.
      // For now, relying on state should suffice for pausing on navigation.
      setIsPlaying(false);
    };
  }, []);

  return (
    <section id="music" ref={sectionRef}>
      <div className="music-content-wrapper">
        <MusicPlayer
          song={currentSong}
          isPlaying={isPlaying}
          volume={volume}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onVolumeChange={handleVolumeChange}
          onEnded={handleSongEnd}
        />

        <ul className="song-list">
          {songs.map((song, index) => (
            <li
              key={song.id}
              className={index === currentSongIndex ? "active-song" : ""}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              <span className="song-index">{index + 1}.</span>
              <span className="song-title">{song.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MusicSection;
