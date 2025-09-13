import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, icon, color = 'accent' }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'success': return 'border-success/20 bg-success/5 glow-success';
      case 'warning': return 'border-warning/20 bg-warning/5 glow-warning';
      case 'error': return 'border-error/20 bg-error/5 glow-error';
      default: return 'border-accent/20 bg-accent/5 glow-accent';
    }
  };

  return (
    <div className={`glass-panel rounded-xl p-6 transition-all duration-normal hover:scale-105 ${getColorClasses(color)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}/10`}>
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-heading font-bold text-foreground">
          {value}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;