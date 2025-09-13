import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlertBanner from './components/AlertBanner';
import GlobalControls from './components/GlobalControls';
import IncidentManagementTable from './components/IncidentManagementTable';
import ResourceAvailabilityPanel from './components/ResourceAvailabilityPanel';
import TimelineVisualization from './components/TimelineVisualization';

const EmergencyResponseCoordinationCenter = () => {
  const [incidentTypeFilter, setIncidentTypeFilter] = useState('all');
  const [responseTeamFilter, setResponseTeamFilter] = useState('all');
  const [prioritySort, setPrioritySort] = useState('severity');

  // Mock data for active emergencies
  const mockIncidents = [
    {
      id: 'INC-001',
      title: 'Tourist Medical Emergency',
      description: 'Foreign tourist experiencing chest pain at Kamakhya Temple',
      severity: 'critical',
      status: 'dispatched',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      dispatchTime: new Date(Date.now() - 12 * 60 * 1000),
      enrouteTime: new Date(Date.now() - 8 * 60 * 1000),
      onsceneTime: null,
      resolvedTime: null,
      location: {
        name: 'Kamakhya Temple Complex',
        coordinates: '26.1665°N, 91.7047°E'
      },
      assignedOfficer: {
        name: 'Inspector Rajesh Kumar',
        badge: 'TP-2401',
        unit: 'Tourist Police'
      },
      eta: 3,
      icon: 'Heart'
    },
    {
      id: 'INC-002',
      title: 'Missing Tourist Alert',
      description: 'German tourist last seen at Kaziranga National Park entrance',
      severity: 'high',
      status: 'en-route',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      dispatchTime: new Date(Date.now() - 40 * 60 * 1000),
      enrouteTime: new Date(Date.now() - 35 * 60 * 1000),
      onsceneTime: null,
      resolvedTime: null,
      location: {
        name: 'Kaziranga National Park',
        coordinates: '26.5775°N, 93.1717°E'
      },
      assignedOfficer: {
        name: 'Sub-Inspector Priya Sharma',
        badge: 'KZ-1205',
        unit: 'Forest Police'
      },
      eta: 12,
      icon: 'Search'
    },
    {
      id: 'INC-003',
      title: 'Traffic Accident',
      description: 'Tourist vehicle collision on NH-37 near Jorhat',
      severity: 'medium',
      status: 'on-scene',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      dispatchTime: new Date(Date.now() - 85 * 60 * 1000),
      enrouteTime: new Date(Date.now() - 80 * 60 * 1000),
      onsceneTime: new Date(Date.now() - 60 * 60 * 1000),
      resolvedTime: null,
      location: {
        name: 'NH-37, Jorhat District',
        coordinates: '26.7509°N, 94.2037°E'
      },
      assignedOfficer: {
        name: 'Constable Amit Das',
        badge: 'JH-0892',
        unit: 'Traffic Police'
      },
      eta: 0,
      icon: 'Car'
    },
    {
      id: 'INC-004',
      title: 'Security Threat',
      description: 'Suspicious activity reported near Sivasagar monuments',
      severity: 'high',
      status: 'pending',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      dispatchTime: null,
      enrouteTime: null,
      onsceneTime: null,
      resolvedTime: null,
      location: {
        name: 'Sivasagar Historical Site',
        coordinates: '26.9824°N, 94.6377°E'
      },
      assignedOfficer: null,
      eta: 15,
      icon: 'Shield'
    },
    {
      id: 'INC-005',
      title: 'Weather Emergency',
      description: 'Flash flood warning affecting tourist areas in Majuli',
      severity: 'critical',
      status: 'dispatched',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      dispatchTime: new Date(Date.now() - 25 * 60 * 1000),
      enrouteTime: null,
      onsceneTime: null,
      resolvedTime: null,
      location: {
        name: 'Majuli Island',
        coordinates: '27.0230°N, 94.2154°E'
      },
      assignedOfficer: {
        name: 'Inspector Bhupen Hazarika',
        badge: 'MJ-1501',
        unit: 'Disaster Response'
      },
      eta: 8,
      icon: 'CloudRain'
    }
  ];

  // Mock data for officers
  const mockOfficers = [
    {
      id: 'OFF-001',
      name: 'Inspector Rajesh Kumar',
      badge: 'TP-2401',
      unit: 'Tourist Police',
      status: 'busy',
      location: 'Kamakhya Temple'
    },
    {
      id: 'OFF-002',
      name: 'Sub-Inspector Priya Sharma',
      badge: 'KZ-1205',
      unit: 'Forest Police',
      status: 'busy',
      location: 'Kaziranga NP'
    },
    {
      id: 'OFF-003',
      name: 'Constable Amit Das',
      badge: 'JH-0892',
      unit: 'Traffic Police',
      status: 'busy',
      location: 'NH-37 Jorhat'
    },
    {
      id: 'OFF-004',
      name: 'Inspector Bhupen Hazarika',
      badge: 'MJ-1501',
      unit: 'Disaster Response',
      status: 'busy',
      location: 'Majuli Island'
    },
    {
      id: 'OFF-005',
      name: 'Constable Ritu Borah',
      badge: 'GU-0445',
      unit: 'Tourist Police',
      status: 'available',
      location: 'Guwahati Central'
    },
    {
      id: 'OFF-006',
      name: 'Sub-Inspector Kamal Deka',
      badge: 'DI-1789',
      unit: 'Special Forces',
      status: 'available',
      location: 'Dibrugarh'
    }
  ];

  // Mock data for vehicles
  const mockVehicles = [
    {
      id: 'VEH-001',
      callSign: 'Patrol-Alpha-1',
      type: 'patrol',
      status: 'busy',
      location: 'Kamakhya Temple',
      fuel: 85
    },
    {
      id: 'VEH-002',
      callSign: 'Rescue-Beta-2',
      type: 'ambulance',
      status: 'available',
      location: 'Guwahati Medical',
      fuel: 92
    },
    {
      id: 'VEH-003',
      callSign: 'Patrol-Charlie-3',
      type: 'patrol',
      status: 'busy',
      location: 'Kaziranga NP',
      fuel: 67
    },
    {
      id: 'VEH-004',
      callSign: 'Bike-Delta-4',
      type: 'motorcycle',
      status: 'available',
      location: 'Jorhat Station',
      fuel: 78
    }
  ];

  // Mock data for equipment
  const mockEquipment = [
    {
      id: 'EQ-001',
      name: 'First Aid Kits',
      icon: 'Heart',
      available: 12,
      total: 15
    },
    {
      id: 'EQ-002',
      name: 'Communication Radios',
      icon: 'Radio',
      available: 8,
      total: 12
    },
    {
      id: 'EQ-003',
      name: 'Emergency Flares',
      icon: 'Zap',
      available: 25,
      total: 30
    },
    {
      id: 'EQ-004',
      name: 'Rescue Equipment',
      icon: 'Shield',
      available: 3,
      total: 8
    },
    {
      id: 'EQ-005',
      name: 'GPS Trackers',
      icon: 'MapPin',
      available: 15,
      total: 20
    }
  ];

  // Mock response metrics
  const mockResponseMetrics = {
    averageResponse: 6.8,
    resolutionRate: 94,
    activeUnits: 18,
    totalUnits: 24,
    efficiency: 87
  };

  // Calculate severity breakdown
  const severityBreakdown = mockIncidents?.reduce((acc, incident) => {
    acc[incident.severity] = (acc?.[incident?.severity] || 0) + 1;
    return acc;
  }, {});

  const activeEmergencies = mockIncidents?.length;
  const averageResponseTime = "6.8min";

  const handleStatusUpdate = (incidentId, newStatus) => {
    console.log(`Updating incident ${incidentId} to status: ${newStatus}`);
    // In a real app, this would update the incident status
  };

  const handleReassign = (incidentId) => {
    console.log(`Reassigning incident ${incidentId}`);
    // In a real app, this would open a reassignment dialog
  };

  const handleDispatch = (incidentId) => {
    console.log(`Dispatching resources for incident ${incidentId}`);
    // In a real app, this would dispatch available resources
  };

  const handleDispatchAll = () => {
    console.log('Dispatching all available units');
    // In a real app, this would dispatch all available resources
  };

  const handleExportReport = () => {
    console.log('Exporting emergency response report');
    // In a real app, this would generate and download a report
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emergency Response Coordination Center
            </h1>
            <p className="text-muted-foreground">
              Real-time incident management and resource coordination for tourist safety emergencies
            </p>
          </div>

          {/* Alert Banner */}
          <AlertBanner 
            activeEmergencies={activeEmergencies}
            averageResponseTime={averageResponseTime}
            severityBreakdown={severityBreakdown}
          />

          {/* Global Controls */}
          <GlobalControls
            incidentTypeFilter={incidentTypeFilter}
            setIncidentTypeFilter={setIncidentTypeFilter}
            responseTeamFilter={responseTeamFilter}
            setResponseTeamFilter={setResponseTeamFilter}
            prioritySort={prioritySort}
            setPrioritySort={setPrioritySort}
            onDispatchAll={handleDispatchAll}
            onExportReport={handleExportReport}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            {/* Incident Management Table - 8 columns */}
            <div className="xl:col-span-8">
              <IncidentManagementTable
                incidents={mockIncidents}
                onStatusUpdate={handleStatusUpdate}
                onReassign={handleReassign}
                onDispatch={handleDispatch}
              />
            </div>

            {/* Resource Availability Panel - 4 columns */}
            <div className="xl:col-span-4">
              <ResourceAvailabilityPanel
                officers={mockOfficers}
                // vehicles={mockVehicles}
                equipment={mockEquipment}
              />
            </div>
          </div>

          {/* Timeline Visualization */}
          <TimelineVisualization
            incidents={mockIncidents}
            responseMetrics={mockResponseMetrics}
          />
        </div>
      </main>
    </div>
  );
};

export default EmergencyResponseCoordinationCenter;