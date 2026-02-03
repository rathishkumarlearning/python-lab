import { useEffect, useState } from 'react';
import Split from 'react-split';

const STORAGE_KEY = 'python-lab-split-sizes';

function SplitPane({ left, right, direction = 'horizontal', minSize = 200, defaultSizes = [50, 50] }) {
  const [sizes, setSizes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load split sizes from localStorage');
    }
    return defaultSizes;
  });

  const handleDragEnd = (newSizes) => {
    setSizes(newSizes);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSizes));
    } catch (e) {
      console.warn('Failed to save split sizes to localStorage');
    }
  };

  return (
    <Split
      className={`split h-full ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      sizes={sizes}
      minSize={minSize}
      gutterSize={8}
      direction={direction}
      onDragEnd={handleDragEnd}
      gutter={(index, direction) => {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction} flex items-center justify-center transition-colors`;
        
        // Add visual indicator
        const indicator = document.createElement('div');
        indicator.className = direction === 'horizontal' 
          ? 'w-1 h-8 bg-white/20 rounded-full'
          : 'h-1 w-8 bg-white/20 rounded-full';
        gutter.appendChild(indicator);
        
        return gutter;
      }}
    >
      <div className="overflow-hidden h-full">{left}</div>
      <div className="overflow-hidden h-full">{right}</div>
    </Split>
  );
}

export default SplitPane;
