import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ControlPanel = ({ 
  selectedDistrict, 
  onDistrictChange, 
  timeRange, 
  onTimeRangeChange, 
  emergencyMode, 
  onEmergencyModeToggle,
  autoRefresh,
  onAutoRefreshToggle 
}) => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const districtOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'kamrup', label: 'Kamrup Metropolitan' },
    { value: 'guwahati', label: 'Guwahati' },
    { value: 'jorhat', label: 'Jorhat' },
    { value: 'sivasagar', label: 'Sivasagar' },
    { value: 'dibrugarh', label: 'Dibrugarh' },
    { value: 'tezpur', label: 'Tezpur' },
    { value: 'silchar', label: 'Silchar' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last 1 Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '12h', label: 'Last 12 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' }
  ];

  useEffect(() => {
    // Simulate connection status updates
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'warning', 'error'];
      const weights = [0.85, 0.10, 0.05]; // 85% connected, 10% warning, 5% error
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (let i = 0; i < statuses?.length; i++) {
        cumulativeWeight += weights?.[i];
        if (random <= cumulativeWeight) {
          setConnectionStatus(statuses?.[i]);
          break;
        }
      }
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    // Update last refresh time when auto-refresh is enabled
    if (autoRefresh) {
      const refreshInterval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);

      return () => clearInterval(refreshInterval);
    }
  }, [autoRefresh]);

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'Wifi';
      case 'warning': return 'WifiOff';
      case 'error': return 'AlertTriangle';
      default: return 'Wifi';
    }
  };

  return (
    <div className="glass-panel rounded-xl border p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Section - Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-accent" />
            <Select
              options={districtOptions}
              value={selectedDistrict}
              onChange={onDistrictChange}
              placeholder="Select District"
              className="min-w-48"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-accent" />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={onTimeRangeChange}
              placeholder="Select Time Range"
              className="min-w-40"
            />
          </div>
        </div>

        {/* Center Section - Emergency Mode */}
        <div className="flex items-center space-x-4">
          <Button
            variant={emergencyMode ? "destructive" : "outline"}
            onClick={onEmergencyModeToggle}
            className={emergencyMode ? "glow-error" : ""}
          >
            <Icon 
              name="AlertTriangle" 
              size={16} 
              className={emergencyMode ? "pulse-notification mr-2" : "mr-2"} 
            />
            {emergencyMode ? "Emergency Active" : "Emergency Mode"}
          </Button>
        </div>

        {/* Right Section - Status & Controls */}
        <div className="flex items-center space-x-4">
          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "ghost"}
              size="sm"
              onClick={onAutoRefreshToggle}
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={autoRefresh ? "animate-spin mr-2" : "mr-2"} 
              />
              Auto Refresh
            </Button>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-muted/20 rounded-lg">
            <Icon 
              name={getConnectionStatusIcon(connectionStatus)} 
              size={16} 
              className={getConnectionStatusColor(connectionStatus)} 
            />
            <span className={`text-sm font-medium ${getConnectionStatusColor(connectionStatus)}`}>
              {connectionStatus?.toUpperCase()}
            </span>
          </div>

          {/* Last Update */}
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Updated: {lastUpdate?.toLocaleTimeString('en-IN', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" title="Export Data">
              <Icon name="Download" size={16} />
            </Button>
            <Button variant="ghost" size="sm" title="Settings">
              <Icon name="Settings" size={16} />
            </Button>
            <Button variant="ghost" size="sm" title="Fullscreen">
              <Icon name="Maximize" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Emergency Mode Banner */}
      {emergencyMode && (
        <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error pulse-notification" />
            <div>
              <p className="text-sm font-medium text-error">Emergency Protocol Activated</p>
              <p className="text-xs text-error/80">
                All alerts are prioritized. Response teams have been notified. Auto-refresh interval reduced to 10 seconds.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Connection Warning */}
      {connectionStatus !== 'connected' && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="WifiOff" size={20} className="text-warning" />
            <div>
              <p className="text-sm font-medium text-warning">
                {connectionStatus === 'warning' ? 'Connection Unstable' : 'Connection Lost'}
              </p>
              <p className="text-xs text-warning/80">
                {connectionStatus === 'warning' ?'Some data may be delayed. Attempting to reconnect...' :'Unable to receive real-time updates. Check network connection.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;