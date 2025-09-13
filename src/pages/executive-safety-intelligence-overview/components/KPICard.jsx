import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, benchmark, icon, color = 'accent' }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'border-success/20 bg-success/5 glow-success';
      case 'warning': return 'border-warning/20 bg-warning/5 glow-warning';
      case 'error': return 'border-error/20 bg-error/5 glow-error';
      default: return 'border-accent/20 bg-accent/5 glow-accent';
    }
  };

  return (
    <div className={`glass-panel rounded-xl p-6 ${getColorClasses()} transition-all duration-normal hover:scale-105`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}/10`}>
            <Icon name={icon} size={24} className={`text-${color}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      
      {benchmark && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Benchmark</span>
          <span className="text-foreground font-medium">{benchmark}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;