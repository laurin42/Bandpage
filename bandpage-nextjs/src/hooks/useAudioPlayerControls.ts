import { useState, useRef, useEffect, RefObject, useCallback } from 'react';
import { Song } from '@/components/MusicPlayer'; // Assuming Song interface is exported from MusicPlayer

interface UseAudioPlayerControlsProps {
  song: Song | null;
  isPlaying: boolean;
  volume: number;
  onEnded: () => void;
  onVolumeChangeProp: (newVolume: number) => void;
  seekBarRef: RefObject<HTMLDivElement | null>; // Allow null for seekBarRef
}

interface UseAudioPlayerControlsReturn {
  audioRef: RefObject<HTMLAudioElement | null>;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  isReady: boolean;
  toggleMute: () => void;
  handleSeekBarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const useAudioPlayerControls = ({
  song,
  isPlaying,
  volume,
  onEnded,
  onVolumeChangeProp,
  seekBarRef,
}: UseAudioPlayerControlsProps): UseAudioPlayerControlsReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(volume);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);

  // Audio Element Event Handlers & Core Logic (moved from MusicPlayer.tsx)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsReady(true);
      } else {
        setDuration(0);
        setIsReady(false);
      }
    };
    const handleTimeUpdate = () => {
      if (isFinite(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };
    const handleAudioEnded = () => {
      setCurrentTime(duration); // Ensure time reaches the end visually
      onEnded();
    };
    const handleError = (e: Event) => {
      console.error("Audio Error:", e);
      setIsReady(false);
      setDuration(0);
      setCurrentTime(0);
    };
    const handleCanPlay = () => {
      setIsReady(true);
      if (isPlaying && audio.paused) {
        audio.play().catch(handleError);
      }
    };
    const handleWaiting = () => { /* console.log("Audio waiting (buffering)..."); */ };
    const handlePlaying = () => { /* console.log("Audio playing"); */ };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, [song, duration, isPlaying, onEnded]); // Dependencies from original hook

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song) {
      audio.pause();
      setCurrentTime(0);
      setDuration(0);
      setIsReady(false);
      audio.src = song.src;
      audio.load();
    } else if (audio && !song) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      setIsReady(false);
    }
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;
    if (isPlaying) {
      if (audio.paused) {
        audio.play().catch((e) => console.error("Play error:", e));
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying, isReady]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!isMuted) {
      previousVolumeRef.current = volume;
    }
  }, [volume, isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      const restoreVolume =
        previousVolumeRef.current > 0.05 ? previousVolumeRef.current : 0.5;
      onVolumeChangeProp(restoreVolume);
      audio.muted = false;
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume; // Store current volume before muting
      onVolumeChangeProp(0); // Set volume state to 0 for slider sync
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume, onVolumeChangeProp]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (volume === 0 && !isMuted) {
      audio.muted = true;
      setIsMuted(true);
    } else if (volume > 0 && isMuted) {
      audio.muted = false;
      setIsMuted(false);
    }
  }, [volume, isMuted]);

  const handleSeekBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!seekBarRef.current || duration <= 0 || !audio || !isFinite(duration)) return;
      const seekBar = seekBarRef.current;
      const rect = seekBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const clickPercentage = Math.max(0, Math.min(1, clickX / width));
      const newTime = clickPercentage * duration;
      if (isFinite(newTime)) {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      } else {
        console.error("Calculated invalid seek time:", newTime);
      }
    },
    [duration, seekBarRef] // audioRef implicitly part of this logic
  );

  return {
    audioRef,
    isMuted,
    duration,
    currentTime,
    isReady,
    toggleMute,
    handleSeekBarClick,
  };
};

export default useAudioPlayerControls; 