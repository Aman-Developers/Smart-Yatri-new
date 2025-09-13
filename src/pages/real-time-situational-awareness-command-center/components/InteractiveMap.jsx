import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = ({ selectedDistrict, timeRange, emergencyMode }) => {
  const [mapData, setMapData] = useState({
    tourists: [],
    alerts: [],
    restrictedZones: [],
    weatherHazards: []
  });
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 26.2006, lng: 92.9376 }); // Guwahati coordinates

  useEffect(() => {
    // Mock real-time data updates
    const interval = setInterval(() => {
      setMapData({
        tourists: [
          {
            id: 'T001',
            name: 'John Smith',
            nationality: 'USA',
            lat: 26.1445,
            lng: 91.7362,
            status: 'safe',
            lastUpdate: new Date(),
            permitStatus: 'valid',
            groupSize: 2,
            itinerary: 'Kaziranga National Park'
          },
          {
            id: 'T002',
            name: 'Maria Garcia',
            nationality: 'Spain',
            lat: 26.7509,
            lng: 94.2037,
            status: 'warning',
            lastUpdate: new Date(Date.now() - 300000),
            permitStatus: 'expiring',
            groupSize: 4,
            itinerary: 'Majuli Island'
          },
          {
            id: 'T003',
            name: 'Raj Patel',
            nationality: 'India',
            lat: 26.9124,
            lng: 94.5896,
            status: 'alert',
            lastUpdate: new Date(Date.now() - 900000),
            permitStatus: 'valid',
            groupSize: 1,
            itinerary: 'Sivasagar Historical Sites'
          }
        ],
        alerts: [
          {
            id: 'A001',
            type: 'sos',
            lat: 26.9124,
            lng: 94.5896,
            severity: 'high',
            timestamp: new Date()
          }
        ],
        restrictedZones: [
          {
            id: 'RZ001',
            name: 'Border Security Zone',
            coordinates: [
              { lat: 27.0000, lng: 95.0000 },
              { lat: 27.2000, lng: 95.2000 },
              { lat: 27.1000, lng: 95.4000 },
              { lat: 26.9000, lng: 95.1000 }
            ],
            type: 'military'
          }
        ],
        weatherHazards: [
          {
            id: 'WH001',
            type: 'flood',
            lat: 26.1445,
            lng: 91.7362,
            severity: 'moderate',
            radius: 5000
          }
        ]
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedDistrict, timeRange]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return '#2ed573';
      case 'warning': return '#ffa502';
      case 'alert': return '#ff4757';
      default: return '#a0aec0';
    }
  };

  const handleTouristClick = (tourist) => {
    setSelectedTourist(tourist);
  };

  return (
    <div className="relative w-full h-full bg-card rounded-xl overflow-hidden border border-border">
      {/* Map Container */}
      <div className="relative w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Assam Tourist Monitoring Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=8&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="glass-panel rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Live Tourists</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Safe ({mapData?.tourists?.filter(t => t?.status === 'safe')?.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-xs text-muted-foreground">Warning ({mapData?.tourists?.filter(t => t?.status === 'warning')?.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error pulse-notification"></div>
                <span className="text-xs text-muted-foreground">Alert ({mapData?.tourists?.filter(t => t?.status === 'alert')?.length})</span>
              </div>
            </div>
          </div>

          {emergencyMode && (
            <div className="glass-panel rounded-lg p-3 border-error/50 bg-error/10">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error pulse-notification" />
                <span className="text-sm font-medium text-error">Emergency Mode Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="glass-panel rounded-lg p-2">
            <div className="flex flex-col space-y-1">
              <button className="p-2 hover:bg-muted/20 rounded transition-colors">
                <Icon name="Plus" size={16} className="text-foreground" />
              </button>
              <button className="p-2 hover:bg-muted/20 rounded transition-colors">
                <Icon name="Minus" size={16} className="text-foreground" />
              </button>
              <button className="p-2 hover:bg-muted/20 rounded transition-colors">
                <Icon name="RotateCcw" size={16} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Tourist Markers Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          {mapData?.tourists?.map((tourist, index) => (
            <div
              key={tourist?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleTouristClick(tourist)}
            >
              <div 
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                  tourist?.status === 'alert' ? 'pulse-notification' : ''
                }`}
                style={{ backgroundColor: getStatusColor(tourist?.status) }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* Tourist Detail Modal */}
      {selectedTourist && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-xl p-6 max-w-md w-full border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedTourist?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTourist?.nationality} • ID: {selectedTourist?.id}</p>
              </div>
              <button
                onClick={() => setSelectedTourist(null)}
                className="p-1 hover:bg-muted/20 rounded transition-colors"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(selectedTourist?.status) }}
                ></div>
                <span className="text-sm font-medium text-foreground capitalize">{selectedTourist?.status} Status</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Group Size</p>
                  <p className="text-foreground font-medium">{selectedTourist?.groupSize} people</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Permit Status</p>
                  <p className={`font-medium ${
                    selectedTourist?.permitStatus === 'valid' ? 'text-success' : 
                    selectedTourist?.permitStatus === 'expiring' ? 'text-warning' : 'text-error'
                  }`}>
                    {selectedTourist?.permitStatus}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">Current Itinerary</p>
                <p className="text-foreground font-medium">{selectedTourist?.itinerary}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">Last Update</p>
                <p className="text-foreground font-medium">
                  {selectedTourist?.lastUpdate?.toLocaleTimeString('en-IN', { 
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="flex space-x-2 pt-2">
                <button className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors">
                  Track Location
                </button>
                <button className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;