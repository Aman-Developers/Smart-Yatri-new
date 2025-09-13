import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const GlobalControls = ({ 
  incidentTypeFilter, 
  setIncidentTypeFilter,
  responseTeamFilter,
  setResponseTeamFilter,
  prioritySort,
  setPrioritySort,
  onDispatchAll,
  onExportReport
}) => {
  const incidentTypeOptions = [
    { value: 'all', label: 'All Incident Types' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'accident', label: 'Traffic Accident' },
    { value: 'missing', label: 'Missing Person' },
    { value: 'assault', label: 'Assault/Violence' },
    { value: 'natural', label: 'Natural Disaster' },
    { value: 'security', label: 'Security Threat' }
  ];

  const responseTeamOptions = [
    { value: 'all', label: 'All Response Teams' },
    { value: 'police', label: 'Police Units' },
    { value: 'medical', label: 'Medical Teams' },
    { value: 'fire', label: 'Fire & Rescue' },
    { value: 'tourist', label: 'Tourist Police' },
    { value: 'special', label: 'Special Forces' }
  ];

  const prioritySortOptions = [
    { value: 'severity', label: 'Sort by Severity' },
    { value: 'time', label: 'Sort by Time' },
    { value: 'location', label: 'Sort by Location' },
    { value: 'response', label: 'Sort by Response Time' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Select
            label="Incident Type"
            options={incidentTypeOptions}
            value={incidentTypeFilter}
            onChange={setIncidentTypeFilter}
            className="min-w-48"
          />
          
          <Select
            label="Response Team"
            options={responseTeamOptions}
            value={responseTeamFilter}
            onChange={setResponseTeamFilter}
            className="min-w-48"
          />
          
          <Select
            label="Priority Sort"
            options={prioritySortOptions}
            value={prioritySort}
            onChange={setPrioritySort}
            className="min-w-48"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left" onClick={onExportReport}>
            Export Report
          </Button>
          <Button variant="secondary" size="sm" iconName="Send" iconPosition="left" onClick={onDispatchAll}>
            Dispatch Available Units
          </Button>
          <Button variant="ghost" size="sm" iconName="Filter" iconPosition="left">
            Advanced Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;