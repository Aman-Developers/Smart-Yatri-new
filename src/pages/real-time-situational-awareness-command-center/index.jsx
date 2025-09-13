import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import LiveStatisticsCard from './components/LiveStatisticsCard';
import InteractiveMap from './components/InteractiveMap';
import AlertQueue from './components/AlertQueue';
import ControlPanel from './components/ControlPanel';

const RealTimeSituationalAwarenessCommandCenter = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [liveStats, setLiveStats] = useState({
    totalTourists: 0,
    activeSOS: 0,
    restrictedViolations: 0,
    offlineDevices: 0
  });

  useEffect(() => {
    // Mock real-time statistics updates
    const updateStats = () => {
      setLiveStats({
        totalTourists: Math.floor(Math.random() * 50) + 1250,
        activeSOS: Math.floor(Math.random() * 5) + 1,
        restrictedViolations: Math.floor(Math.random() * 3) + 2,
        offlineDevices: Math.floor(Math.random() * 8) + 5
      });
    };

    updateStats();
    
    const interval = setInterval(updateStats, emergencyMode ? 10000 : 30000);
    return () => clearInterval(interval);
  }, [emergencyMode]);

  const statisticsCards = [
    {
      title: 'Total Tourists Tracked',
      value: liveStats?.totalTourists,
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'accent',
      description: 'Active tracking devices'
    },
    {
      title: 'Active SOS Alerts',
      value: liveStats?.activeSOS,
      change: emergencyMode ? '+2' : null,
      changeType: 'increase',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Requiring immediate response'
    },
    {
      title: 'Restricted Area Violations',
      value: liveStats?.restrictedViolations,
      change: '-1',
      changeType: 'decrease',
      icon: 'ShieldAlert',
      color: 'warning',
      description: 'Permit verification needed'
    },
    {
      title: 'Offline Devices',
      value: liveStats?.offlineDevices,
      change: '+3',
      changeType: 'increase',
      icon: 'WifiOff',
      color: 'muted',
      description: 'Connection lost > 15 min'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className={`pt-16 ${emergencyMode ? 'pt-28' : ''}`}>
        <div className="p-6 space-y-6">
          {/* Control Panel */}
          <ControlPanel
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            emergencyMode={emergencyMode}
            onEmergencyModeToggle={() => setEmergencyMode(!emergencyMode)}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-24 gap-6 min-h-[calc(100vh-200px)]">
            {/* Left Sidebar - Statistics */}
            <div className="xl:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statisticsCards?.map((stat, index) => (
                  <LiveStatisticsCard
                    key={index}
                    title={stat?.title}
                    value={stat?.value}
                    change={stat?.change}
                    changeType={stat?.changeType}
                    icon={stat?.icon}
                    color={stat?.color}
                    description={stat?.description}
                  />
                ))}
              </div>

              
            

            {/* Main Visualization Area - Map + Alerts Side by Side */}
            <div className="xl:col-span-18 grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Map Section (2/3 width) */}
              <div className="xl:col-span-2">
                
                <div className="h-full min-h-[600px]">
                  <InteractiveMap
                    selectedDistrict={selectedDistrict}
                    timeRange={timeRange}
                    emergencyMode={emergencyMode}
                  />
                </div>
              </div>

              {/* Alert Queue Section (1/3 width) */}
              <div className="xl:col-span-1">
                <div className="h-full min-h-[600px] overflow-y-auto">
                  <AlertQueue emergencyMode={emergencyMode} />
                </div>
              </div>
            </div>

          </div>




                {/* Quick Actions */}
              <div className="glass-panel rounded-xl border p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted/20 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-accent text-sm font-bold">SOS</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Emergency Broadcast</p>
                      <p className="text-xs text-muted-foreground">Send alert to all tourists</p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted/20 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                      <span className="text-warning text-sm font-bold">⚠</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Weather Alert</p>
                      <p className="text-xs text-muted-foreground">Issue weather warning</p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg hover:bg-muted/20 transition-colors flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                      <span className="text-success text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">All Clear</p>
                      <p className="text-xs text-muted-foreground">Send safety confirmation</p>
                    </div>
                  </button>
                </div>
              </div>




          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeSituationalAwarenessCommandCenter;
