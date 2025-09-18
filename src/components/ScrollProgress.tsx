import { useScrollProgress } from '@/hooks/useScrollAnimation';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
};