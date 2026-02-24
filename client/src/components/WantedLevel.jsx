import { Star } from 'lucide-react';
import { useScroll } from '../context/ScrollContext';

const WantedLevel = ({ compact = false }) => {
  const { wantedLevel } = useScroll();
  const isHighLevel = wantedLevel >= 4;

  return (
    <div className={`flex items-center ${compact ? 'gap-0.5' : 'gap-1'} ${isHighLevel ? 'wanted-container high-level' : ''} rounded-lg px-1`}>
      {[1, 2, 3, 4, 5].map((level) => (
        <Star
          key={level}
          className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} transition-all duration-300 ${
            level <= wantedLevel
              ? `wanted-star active fill-current ${isHighLevel ? 'police-pulse' : ''}`
              : 'wanted-star inactive'
          }`}
          style={level <= wantedLevel ? {
            filter: `drop-shadow(0 0 ${isHighLevel ? '12px' : '6px'} #FFD93D)`
          } : {}}
        />
      ))}
    </div>
  );
};

export default WantedLevel;
