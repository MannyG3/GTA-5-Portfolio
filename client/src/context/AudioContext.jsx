import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Howl, Howler } from 'howler';

const THEME_SRC = '/audio/gta-theme.webm';

let soundtrack;

const getSoundtrack = () => {
  if (typeof window === 'undefined') return null;

  if (!soundtrack) {
    soundtrack = new Howl({
      src: [THEME_SRC],
      loop: true,
      volume: 0.45,
      html5: true,
      preload: true,
    });
  }

  return soundtrack;
};

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('gta-audio-muted') === 'true';
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    Howler.mute(isMuted);
    localStorage.setItem('gta-audio-muted', String(isMuted));
  }, [isMuted]);

  const startAudio = () => {
    const player = getSoundtrack();
    if (!player) return;

    if (!player.playing()) {
      player.play();
    }

    setHasStarted(true);
  };

  useEffect(() => {
    if (hasStarted) return;

    const handleFirstInteraction = () => {
      startAudio();
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasStarted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const value = useMemo(
    () => ({ isMuted, toggleMute, startAudio, hasStarted }),
    [isMuted, hasStarted]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useGlobalAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useGlobalAudio must be used within AudioProvider');
  }
  return context;
};
