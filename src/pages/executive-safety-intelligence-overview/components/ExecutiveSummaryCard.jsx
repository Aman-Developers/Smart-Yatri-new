import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryCard = ({ title, insights, alerts, recommendations, priority = 'medium' }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'border-error/30 bg-error/5';
      case 'medium': return 'border-warning/30 bg-warning/5';
      case 'low': return 'border-success/30 bg-success/5';
      default: return 'border-accent/30 bg-accent/5';
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  return (
    <div className={`glass-panel rounded-xl p-6 ${getPriorityColor()}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon name={getPriorityIcon()} size={20} className={`text-${priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'success'}`} />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {insights && insights?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Insights</h4>
          <ul className="space-y-2">
            {insights?.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="ChevronRight" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {alerts && alerts?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Risk Alerts</h4>
          <ul className="space-y-2">
            {alerts?.map((alert, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="AlertTriangle" size={14} className="text-error mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {recommendations && recommendations?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Recommended Actions</h4>
          <ul className="space-y-2">
            {recommendations?.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummaryCard;