import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const IncidentManagementTable = ({ incidents, onStatusUpdate, onReassign, onDispatch }) => {
  const [selectedIncidents, setSelectedIncidents] = useState([]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/30';
      case 'high': return 'text-warning bg-warning/10 border-warning/30';
      case 'medium': return 'text-accent bg-accent/10 border-accent/30';
      default: return 'text-success bg-success/10 border-success/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'dispatched': return 'text-accent bg-accent/10';
      case 'en-route': return 'text-warning bg-warning/10';
      case 'on-scene': return 'text-success bg-success/10';
      case 'resolved': return 'text-muted-foreground bg-muted/10';
      default: return 'text-error bg-error/10';
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'en-route', label: 'En Route' },
    { value: 'on-scene', label: 'On Scene' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const formatTime = (timestamp) => {
    const now = new Date();
    const incidentTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - incidentTime) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return incidentTime?.toLocaleDateString();
    }
  };

  const toggleIncidentSelection = (incidentId) => {
    setSelectedIncidents(prev => 
      prev?.includes(incidentId) 
        ? prev?.filter(id => id !== incidentId)
        : [...prev, incidentId]
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Incidents</h3>
          <div className="flex items-center space-x-2">
            {selectedIncidents?.length > 0 && (
              <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
                Bulk Assign ({selectedIncidents?.length})
              </Button>
            )}
            <Button variant="ghost" size="sm" iconName="MoreVertical" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedIncidents(incidents?.map(i => i?.id));
                    } else {
                      setSelectedIncidents([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Incident</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Assigned Officer</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">ETA</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents?.map((incident) => (
              <tr key={incident?.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={selectedIncidents?.includes(incident?.id)}
                    onChange={() => toggleIncidentSelection(incident?.id)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getSeverityColor(incident?.severity)}`}>
                      <Icon name={incident?.icon} size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{incident?.title}</h4>
                      <p className="text-sm text-muted-foreground">{incident?.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident?.severity)}`}>
                          {incident?.severity?.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatTime(incident?.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{incident?.location?.name}</p>
                      <p className="text-xs text-muted-foreground">{incident?.location?.coordinates}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  {incident?.assignedOfficer ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{incident?.assignedOfficer?.name}</p>
                        <p className="text-xs text-muted-foreground">{incident?.assignedOfficer?.badge}</p>
                      </div>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
                      Assign
                    </Button>
                  )}
                </td>
                <td className="p-3">
                  <Select
                    options={statusOptions}
                    value={incident?.status}
                    onChange={(value) => onStatusUpdate(incident?.id, value)}
                    className="min-w-32"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className={`text-sm font-mono ${incident?.eta <= 5 ? 'text-success' : incident?.eta <= 10 ? 'text-warning' : 'text-error'}`}>
                      {incident?.eta}min
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Send" onClick={() => onDispatch(incident?.id)} />
                    <Button variant="ghost" size="sm" iconName="UserCheck" onClick={() => onReassign(incident?.id)} />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentManagementTable;