import React, { useState, useEffect, useRef } from "react";
import MusicPlayer, { Song } from "./MusicPlayer";
import "@/styles/music-section.css"; // Add import for section styles

// Define song data
const songs: Song[] = [
  {
    id: 1,
    title: "Lift Me Up",
    artist: "Burnheart Mockery",
    src: "/Witches.mp3",
    coverSrc: "/cover/liftMeUp.png",
  },
  {
    id: 2,
    title: "Still Rock",
    artist: "Burnheart Mockery",
    src: "/StillRock.mp3",
    coverSrc: "/cover/stillRock.png",
  },
  // Add more songs here...
  // {
  //   id: 3,
  //   title: "Another Song",
  //   artist: "Burnheart Mockery",
  //   src: "/path/to/another.mp3",
  //   coverSrc: "/covers/another_cover.png",
  // },
];

const MusicSection = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0); // Start with the first song
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for intersection observer

  const currentSong = songs[currentSongIndex];

  // --- Player Control Handlers ---
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true); // Optional: Auto-play next song
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true); // Optional: Auto-play previous song
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSongEnd = () => {
    // Optional: Automatically play the next song when one ends
    handleNext();
    // Or just stop playback:
    // setIsPlaying(false);
  };

  // --- Automatic Pause Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If section is not intersecting (not visible), pause playback
        if (!entry.isIntersecting) {
          setIsPlaying(false);
          // console.log("Music section out of view, pausing.");
        }
      },
      {
        root: null, // Observe intersection relative to viewport
        threshold: 0.1, // Trigger when less than 10% is visible
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
      // console.log("MusicSection unmounting, ensuring playback is paused.");
    };
  }, []); // Run only once on mount/unmount

  return (
    <section id="music" ref={sectionRef}>
      <div className="music-content-wrapper">
        <p>
          Die Reise von Burnheart Mockery geht durch die Wirren der Zeit und die
          Dunkelheit der Nacht. Während sie sich ihren Weg durch die Galaxien
          der Musik bahnen, bleiben sie vereint im Geist der Freiheit und der
          Liebe zur Melodie...
        </p>

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
                setIsPlaying(true); // Start playing on selection
              }}
            >
              <span className="song-index">{index + 1}.</span>
              <span className="song-title">{song.title}</span>
              {/* Optional: Add artist or duration */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MusicSection;
