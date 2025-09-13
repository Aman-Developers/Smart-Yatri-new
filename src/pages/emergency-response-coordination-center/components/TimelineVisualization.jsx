import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({ incidents, responseMetrics }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimelineMilestones = (incident) => {
    const milestones = [
      { 
        id: 'reported', 
        label: 'Reported', 
        time: incident?.timestamp, 
        icon: 'AlertTriangle',
        completed: true,
        color: 'text-error'
      },
      { 
        id: 'dispatched', 
        label: 'Dispatched', 
        time: incident?.dispatchTime, 
        icon: 'Send',
        completed: incident?.status !== 'pending',
        color: 'text-accent'
      },
      { 
        id: 'enroute', 
        label: 'En Route', 
        time: incident?.enrouteTime, 
        icon: 'Navigation',
        completed: ['en-route', 'on-scene', 'resolved']?.includes(incident?.status),
        color: 'text-warning'
      },
      { 
        id: 'onscene', 
        label: 'On Scene', 
        time: incident?.onsceneTime, 
        icon: 'MapPin',
        completed: ['on-scene', 'resolved']?.includes(incident?.status),
        color: 'text-success'
      },
      { 
        id: 'resolved', 
        label: 'Resolved', 
        time: incident?.resolvedTime, 
        icon: 'CheckCircle',
        completed: incident?.status === 'resolved',
        color: 'text-success'
      }
    ];

    return milestones;
  };

  const calculateResponseTime = (incident) => {
    if (!incident?.dispatchTime) return null;
    const reported = new Date(incident.timestamp);
    const dispatched = new Date(incident.dispatchTime);
    return Math.floor((dispatched - reported) / (1000 * 60));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Response Timeline & Performance</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Avg Response</span>
          </div>
          <p className="text-2xl font-bold text-accent">{responseMetrics?.averageResponse}min</p>
          <p className="text-xs text-muted-foreground">Target: &lt;8min</p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Resolution Rate</span>
          </div>
          <p className="text-2xl font-bold text-success">{responseMetrics?.resolutionRate}%</p>
          <p className="text-xs text-muted-foreground">Last 24h</p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Active Units</span>
          </div>
          <p className="text-2xl font-bold text-warning">{responseMetrics?.activeUnits}</p>
          <p className="text-xs text-muted-foreground">of {responseMetrics?.totalUnits} total</p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Efficiency</span>
          </div>
          <p className="text-2xl font-bold text-accent">{responseMetrics?.efficiency}%</p>
          <p className="text-xs text-muted-foreground">vs last week</p>
        </div>
      </div>
      {/* Timeline for Recent Incidents */}
      <div className="space-y-6">
        <h4 className="text-md font-semibold text-foreground">Recent Incident Timelines</h4>
        {incidents?.slice(0, 3)?.map((incident) => {
          const milestones = getTimelineMilestones(incident);
          const responseTime = calculateResponseTime(incident);
          
          return (
            <div key={incident?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="font-medium text-foreground">{incident?.title}</h5>
                  <p className="text-sm text-muted-foreground">{incident?.location?.name}</p>
                </div>
                {responseTime && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${responseTime <= 5 ? 'bg-success/20 text-success' : responseTime <= 10 ? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'}`}>
                    Response: {responseTime}min
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                <div className="space-y-4">
                  {milestones?.map((milestone, index) => (
                    <div key={milestone?.id} className="relative flex items-center space-x-4">
                      <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        milestone?.completed 
                          ? 'bg-success border-success' 
                          : index === milestones?.findIndex(m => !m?.completed)
                          ? 'bg-warning border-warning pulse-notification'
                          : 'bg-muted border-border'
                      }`}>
                        <Icon 
                          name={milestone?.icon} 
                          size={16} 
                          className={milestone?.completed ? 'text-background' : 'text-muted-foreground'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h6 className={`font-medium ${milestone?.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {milestone?.label}
                          </h6>
                          {milestone?.time && (
                            <span className="text-sm text-muted-foreground font-mono">
                              {formatTime(milestone?.time)}
                            </span>
                          )}
                        </div>
                        {milestone?.completed && milestone?.time && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Completed at {formatTime(milestone?.time)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineVisualization;