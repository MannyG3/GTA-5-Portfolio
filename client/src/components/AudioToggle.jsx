import { Volume2, VolumeX } from 'lucide-react';
import { useGlobalAudio } from '../context/AudioContext';

const AudioToggle = () => {
  const { isMuted, toggleMute } = useGlobalAudio();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 lg:top-4 lg:bottom-auto z-[90] bg-black/65 border border-white/30 text-white p-3 rounded-md hover:border-gta-orange hover:text-gta-orange transition-colors"
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default AudioToggle;
