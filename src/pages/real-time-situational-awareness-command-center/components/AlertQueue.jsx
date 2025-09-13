import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertQueue = ({ emergencyMode }) => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    // Mock real-time alerts
    const mockAlerts = [
      {
        id: 'ALT001',
        type: 'sos',
        priority: 'critical',
        touristId: 'T003',
        touristName: 'Raj Patel',
        location: 'Sivasagar Historical Sites',
        coordinates: { lat: 26.9124, lng: 94.5896 },
        timestamp: new Date(),
        status: 'active',
        description: 'Emergency SOS signal received from tourist device',
        responseTime: null,
        assignedOfficer: null
      },
      {
        id: 'ALT002',
        type: 'permit_violation',
        priority: 'high',
        touristId: 'T005',
        touristName: 'Chen Wei',
        location: 'Restricted Border Zone',
        coordinates: { lat: 27.0500, lng: 95.1200 },
        timestamp: new Date(Date.now() - 300000),
        status: 'investigating',
        description: 'Tourist detected in restricted area without proper permits',
        responseTime: '2 min',
        assignedOfficer: 'Officer Kumar'
      },
      {
        id: 'ALT003',
        type: 'device_offline',
        priority: 'medium',
        touristId: 'T007',
        touristName: 'Sarah Johnson',
        location: 'Kaziranga National Park',
        coordinates: { lat: 26.5775, lng: 93.1714 },
        timestamp: new Date(Date.now() - 900000),
        status: 'pending',
        description: 'Tourist tracking device offline for more than 15 minutes',
        responseTime: null,
        assignedOfficer: null
      },
      {
        id: 'ALT004',
        type: 'weather_warning',
        priority: 'medium',
        touristId: 'T002',
        touristName: 'Maria Garcia',
        location: 'Majuli Island',
        coordinates: { lat: 26.7509, lng: 94.2037 },
        timestamp: new Date(Date.now() - 1200000),
        status: 'resolved',
        description: 'Tourist in area with severe weather warning - flood risk',
        responseTime: '5 min',
        assignedOfficer: 'Officer Singh'
      }
    ];

    setAlerts(mockAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlerts(prev => prev?.map(alert => ({
        ...alert,
        timestamp: alert?.status === 'active' ? new Date() : alert?.timestamp
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error border-error/30 bg-error/10';
      case 'high': return 'text-warning border-warning/30 bg-warning/10';
      case 'medium': return 'text-accent border-accent/30 bg-accent/10';
      case 'low': return 'text-muted-foreground border-border bg-muted/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error';
      case 'investigating': return 'text-warning';
      case 'pending': return 'text-accent';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'sos': return 'AlertTriangle';
      case 'permit_violation': return 'ShieldAlert';
      case 'device_offline': return 'WifiOff';
      case 'weather_warning': return 'CloudRain';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString('en-IN');
  };

  const handleDispatch = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: 'investigating', assignedOfficer: 'Officer Dispatch', responseTime: '0 min' }
        : alert
    ));
  };

  const sortedAlerts = alerts?.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const statusOrder = { active: 4, investigating: 3, pending: 2, resolved: 1 };
    
    if (priorityOrder?.[a?.priority] !== priorityOrder?.[b?.priority]) {
      return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
    }
    return statusOrder?.[b?.status] - statusOrder?.[a?.status];
  });

  return (
    <div className="glass-panel rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Alert Queue</h3>
          <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium">
            {alerts?.filter(a => a?.status === 'active')?.length}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Filter" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Alert List */}
      <div className="flex-1 overflow-y-auto">
        {sortedAlerts?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {sortedAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`border rounded-lg p-4 transition-all duration-normal hover:border-accent/50 cursor-pointer ${getPriorityColor(alert?.priority)} ${
                  alert?.status === 'active' && alert?.priority === 'critical' ? 'pulse-notification' : ''
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={20} 
                      className={alert?.priority === 'critical' ? 'text-error' : 'text-current'} 
                    />
                    <div>
                      <h4 className="font-medium text-foreground">{alert?.touristName}</h4>
                      <p className="text-sm text-muted-foreground">{alert?.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium uppercase ${getStatusColor(alert?.status)}`}>
                      {alert?.status}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(alert?.timestamp)}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{alert?.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>ID: {alert?.touristId}</span>
                    {alert?.responseTime && <span>Response: {alert?.responseTime}</span>}
                    {alert?.assignedOfficer && <span>Officer: {alert?.assignedOfficer}</span>}
                  </div>
                  
                  {alert?.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleDispatch(alert?.id);
                      }}
                    >
                      Dispatch
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel rounded-xl p-6 max-w-lg w-full border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name={getAlertIcon(selectedAlert?.type)} size={24} className="text-error" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Alert Details</h3>
                  <p className="text-sm text-muted-foreground">ID: {selectedAlert?.id}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAlert(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tourist</p>
                  <p className="font-medium text-foreground">{selectedAlert?.touristName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className={`font-medium capitalize ${
                    selectedAlert?.priority === 'critical' ? 'text-error' :
                    selectedAlert?.priority === 'high' ? 'text-warning' : 'text-accent'
                  }`}>
                    {selectedAlert?.priority}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{selectedAlert?.location}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedAlert?.coordinates?.lat?.toFixed(4)}, {selectedAlert?.coordinates?.lng?.toFixed(4)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground">{selectedAlert?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-medium capitalize ${getStatusColor(selectedAlert?.status)}`}>
                    {selectedAlert?.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium text-foreground">
                    {selectedAlert?.timestamp?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="default" className="flex-1">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Locate on Map
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Contact Tourist
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertQueue;