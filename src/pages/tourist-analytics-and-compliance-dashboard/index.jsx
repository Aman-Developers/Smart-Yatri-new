import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import FilterPanel from './components/FilterPanel';
import TouristFlowChart from './components/TouristFlowChart';
import DestinationRanking from './components/DestinationRanking';
import HeatMapVisualization from './components/HeatMapVisualization';

import Button from '../../components/ui/Button';

const TouristAnalyticsAndComplianceDashboard = () => {
  const [filters, setFilters] = useState({
    period: 'last7days',
    type: 'all',
    districts: ['all'],
    comparison: false
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update timestamp every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleChartDataClick = (data) => {
    console.log('Chart data clicked:', data);
    // Implement drill-down functionality
  };

  const kpiData = [
    {
      title: 'Total Registrations',
      value: '12,847',
      trend: 'up',
      trendValue: '+8.2%',
      icon: 'Users',
      color: 'accent'
    },
    {
      title: 'Permit Compliance Rate',
      value: '94.2',
      unit: '%',
      trend: 'up',
      trendValue: '+2.1%',
      icon: 'Shield',
      color: 'success'
    },
    {
      title: 'Average Stay Duration',
      value: '4.8',
      unit: 'days',
      trend: 'stable',
      trendValue: '+0.3%',
      icon: 'Calendar',
      color: 'warning'
    },
    {
      title: 'Hotspot Utilization',
      value: '78.5',
      unit: '%',
      trend: 'up',
      trendValue: '+5.7%',
      icon: 'MapPin',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Tourist Analytics & Compliance Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive tourist flow insights and permit compliance monitoring
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success pulse-notification"></div>
                <span className="text-sm text-success font-medium">Live Data</span>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel onFiltersChange={handleFiltersChange} />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Tourist Flow Chart - 3 columns */}
            <div className="lg:col-span-2">
              <TouristFlowChart 
                data={filters}
                onDataPointClick={handleChartDataClick}
              />
            </div>

            {/* Destination Ranking - 1 column */}
            <div className="lg:col-span-2">
              <DestinationRanking />
            </div>
          </div>

          {/* Heat Map Visualization - Full Width */}
          <HeatMapVisualization />

          {/* Quick Actions */}
          <div className="glass-panel rounded-xl p-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                  Quick Actions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Common analytical operations and reports
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Export Data
                </Button>
                <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                  Configure Alerts
                </Button>
                <Button variant="default" size="sm" iconName="RefreshCw" iconPosition="left">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Data Summary Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-6">
              <span>Data refreshes every 15 minutes</span>
              <span>•</span>
              <span>Historical data available for 2 years</span>
              <span>•</span>
              <span>Real-time alerts for compliance violations</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TouristAnalyticsAndComplianceDashboard;