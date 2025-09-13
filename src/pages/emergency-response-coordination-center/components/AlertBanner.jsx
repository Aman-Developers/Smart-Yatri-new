import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertBanner = ({ activeEmergencies, averageResponseTime, severityBreakdown }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      default: return 'text-success';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/20';
      case 'high': return 'bg-warning/20';
      case 'medium': return 'bg-accent/20';
      default: return 'bg-success/20';
    }
  };

  return (
    <div className="bg-error/10 border border-error/30 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={24} className="text-error pulse-notification" />
            <div>
              <h3 className="text-lg font-semibold text-error">
                {activeEmergencies} Active Emergency Response{activeEmergencies !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-muted-foreground">
                Average Response Time: <span className="font-mono text-warning">{averageResponseTime}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {Object.entries(severityBreakdown)?.map(([severity, count]) => (
              <div key={severity} className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getSeverityBg(severity)}`}>
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity)?.replace('text-', 'bg-')}`}></div>
                <span className={`text-sm font-medium ${getSeverityColor(severity)}`}>
                  {severity?.charAt(0)?.toUpperCase() + severity?.slice(1)}: {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
          <Button variant="destructive" size="sm" iconName="Siren" iconPosition="left">
            Emergency Broadcast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;