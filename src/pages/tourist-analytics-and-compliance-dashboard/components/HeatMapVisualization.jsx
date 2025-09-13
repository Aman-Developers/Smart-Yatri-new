import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeatMapVisualization = () => {
  const [selectedHour, setSelectedHour] = useState(14);
  const [isPlaying, setIsPlaying] = useState(false);

  const districts = [
    { name: 'Kamrup Metro', density: 85, visitors: 3420, x: 20, y: 30, size: 'large' },
    { name: 'Dibrugarh', density: 72, visitors: 2180, x: 80, y: 25, size: 'medium' },
    { name: 'Jorhat', density: 68, visitors: 1950, x: 70, y: 35, size: 'medium' },
    { name: 'Sivasagar', density: 45, visitors: 1240, x: 75, y: 45, size: 'small' },
    { name: 'Tezpur', density: 38, visitors: 980, x: 35, y: 20, size: 'small' },
    { name: 'Guwahati', density: 92, visitors: 4200, x: 25, y: 40, size: 'large' },
    { name: 'Nagaon', density: 35, visitors: 850, x: 45, y: 50, size: 'small' },
    { name: 'Barpeta', density: 28, visitors: 620, x: 15, y: 55, size: 'small' },
    { name: 'Golaghat', density: 42, visitors: 1100, x: 65, y: 55, size: 'small' },
    { name: 'Lakhimpur', density: 25, visitors: 480, x: 55, y: 15, size: 'small' }
  ];

  const getDensityColor = (density) => {
    if (density >= 80) return 'rgba(255, 71, 87, 0.8)'; // High density - red
    if (density >= 60) return 'rgba(255, 165, 2, 0.8)'; // Medium-high - orange
    if (density >= 40) return 'rgba(255, 212, 0, 0.8)'; // Medium - yellow
    if (density >= 20) return 'rgba(46, 213, 115, 0.8)'; // Low-medium - green
    return 'rgba(0, 212, 255, 0.8)'; // Low - blue
  };

  const getDensitySize = (size, density) => {
    const baseSize = size === 'large' ? 40 : size === 'medium' ? 30 : 20;
    const densityMultiplier = 1 + (density / 100);
    return baseSize * densityMultiplier;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Tourist Density Heat Map
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time distribution across Assam districts
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Current Time: <span className="text-foreground font-medium">{selectedHour}:00</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayback}
            iconName={isPlaying ? 'Pause' : 'Play'}
            iconPosition="left"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
      {/* Time Slider */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <Icon name="Clock" size={16} className="text-accent" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="23"
              value={selectedHour}
              onChange={(e) => setSelectedHour(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${(selectedHour / 23) * 100}%, var(--color-muted) ${(selectedHour / 23) * 100}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>
      </div>
      {/* Heat Map */}
      <div className="relative bg-card/30 rounded-lg p-8 mb-6" style={{ height: '400px' }}>
        {/* Assam State Outline (Simplified) */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-20" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M10,20 Q15,15 25,18 L35,15 Q45,12 55,15 L70,18 Q80,20 85,25 L88,35 Q90,45 85,55 L80,65 Q75,75 65,78 L45,80 Q35,82 25,78 L15,75 Q8,65 10,55 L12,45 Q10,35 10,20 Z"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>

        {/* District Density Circles */}
        {districts?.map((district, index) => (
          <div
            key={district?.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${district?.x}%`,
              top: `${district?.y}%`,
              width: `${getDensitySize(district?.size, district?.density)}px`,
              height: `${getDensitySize(district?.size, district?.density)}px`
            }}
          >
            <div
              className="w-full h-full rounded-full transition-all duration-slow pulse-notification"
              style={{
                backgroundColor: getDensityColor(district?.density),
                boxShadow: `0 0 20px ${getDensityColor(district?.density)}`
              }}
            ></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
              <div className="glass-panel rounded-lg p-3 text-sm whitespace-nowrap">
                <div className="font-medium text-foreground">{district?.name}</div>
                <div className="text-muted-foreground">
                  {district?.visitors?.toLocaleString()} visitors
                </div>
                <div className="text-muted-foreground">
                  Density: {district?.density}%
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Rivers (Brahmaputra) */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-30" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M5,40 Q20,38 35,42 Q50,45 65,43 Q80,40 95,42"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="5,3"
          />
        </svg>
      </div>
      {/* Density Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(0, 212, 255, 0.8)' }}></div>
            <span className="text-xs text-muted-foreground">Low (0-20%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(46, 213, 115, 0.8)' }}></div>
            <span className="text-xs text-muted-foreground">Medium (20-40%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 212, 0, 0.8)' }}></div>
            <span className="text-xs text-muted-foreground">High (40-60%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 165, 2, 0.8)' }}></div>
            <span className="text-xs text-muted-foreground">Very High (60-80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(255, 71, 87, 0.8)' }}></div>
            <span className="text-xs text-muted-foreground">Critical (80%+)</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>
    </div>
  );
};

export default HeatMapVisualization;