import React from 'react';
import Icon from '../../../components/AppIcon';

const DestinationRanking = () => {
  const destinations = [
    {
      id: 1,
      name: "Kaziranga National Park",
      visitors: 2840,
      capacity: 3500,
      occupancy: 81,
      trend: 'up',
      trendValue: '+12%',
      category: 'Wildlife'
    },
    {
      id: 2,
      name: "Majuli Island",
      visitors: 1650,
      capacity: 2000,
      occupancy: 83,
      trend: 'up',
      trendValue: '+8%',
      category: 'Cultural'
    },
    {
      id: 3,
      name: "Kamakhya Temple",
      visitors: 3200,
      capacity: 4000,
      occupancy: 80,
      trend: 'stable',
      trendValue: '+2%',
      category: 'Religious'
    },
    // {
    //   id: 4,
    //   name: "Sivasagar Monuments",
    //   visitors: 980,
    //   capacity: 1500,
    //   occupancy: 65,
    //   trend: 'down',
    //   trendValue: '-5%',
    //   category: 'Historical'
    // },
    // {
    //   id: 5,
    //   name: "Haflong Hill Station",
    //   visitors: 720,
    //   capacity: 1200,
    //   occupancy: 60,
    //   trend: 'up',
    //   trendValue: '+15%',
    //   category: 'Adventure'
    // },
    // {
    //   id: 6,
    //   name: "Pobitora Wildlife Sanctuary",
    //   visitors: 540,
    //   capacity: 800,
    //   occupancy: 68,
    //   trend: 'up',
    //   trendValue: '+18%',
    //   category: 'Wildlife'
    // }
  ];

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 80) return 'text-error';
    if (occupancy >= 60) return 'text-warning';
    return 'text-success';
  };

  const getOccupancyBg = (occupancy) => {
    if (occupancy >= 80) return 'bg-error/20';
    if (occupancy >= 60) return 'bg-warning/20';
    return 'bg-success/20';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Wildlife': return 'Trees';
      case 'Cultural': return 'Users';
      case 'Religious': return 'Church';
      case 'Historical': return 'Castle';
      case 'Adventure': return 'Mountain';
      default: return 'MapPin';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Top Destinations
          </h3>
          <p className="text-sm text-muted-foreground">
            Ranked by visitor count and occupancy
          </p>
        </div>
        <Icon name="Trophy" size={20} className="text-accent" />
      </div>

      {/* Destination List */}
      <div className="space-y-4">
        {destinations?.map((destination, index) => (
          <div 
            key={destination?.id}
            className="grid grid-cols-7 items-center gap-4 p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-all duration-fast cursor-pointer"
          >
            {/* Rank */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent">#{index + 1}</span>
              </div>
            </div>

            {/* Category Icon */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                <Icon name={getCategoryIcon(destination?.category)} size={18} className="text-accent" />
              </div>
            </div>

            {/* Destination Info */}
            <div className="col-span-2 min-w-0">
              <h4 className="font-medium text-foreground truncate">{destination?.name}</h4>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-muted-foreground">
                  {destination?.visitors?.toLocaleString()} visitors
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
                  {destination?.category}
                </span>
              </div>
            </div>

            {/* Occupancy */}
            <div className="text-right">
              <div className={`text-lg font-bold ${getOccupancyColor(destination?.occupancy)}`}>
                {destination?.occupancy}%
              </div>
              <div className="text-xs text-muted-foreground">
                {destination?.visitors}/{destination?.capacity}
              </div>
            </div>

            {/* Occupancy Bar */}
            <div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-slow ${getOccupancyBg(destination?.occupancy)}`}
                  style={{ width: `${destination?.occupancy}%` }}
                ></div>
              </div>
            </div>

            {/* Trend */}
            <div className={`flex items-center justify-end space-x-1 ${getTrendColor(destination?.trend)}`}>
              <Icon name={getTrendIcon(destination?.trend)} size={16} />
              <span className="text-sm font-medium">{destination?.trendValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Capacity Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-success/20"></div>
          <span className="text-xs text-muted-foreground">&lt; 60% Capacity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning/20"></div>
          <span className="text-xs text-muted-foreground">60–80% Capacity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-error/20"></div>
          <span className="text-xs text-muted-foreground">&gt; 80% Capacity</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationRanking;
