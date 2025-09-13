import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import TrendChart from './components/TrendChart';
import ExecutiveSummaryCard from './components/ExecutiveSummaryCard';
import DistrictPerformanceChart from './components/DistrictPerformanceChart';
import ControlPanel from './components/ControlPanel';

const ExecutiveSafetyIntelligenceOverview = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdated(now?.toLocaleTimeString('en-IN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock KPI data
  const kpiData = [
    {
      title: 'Tourist Safety Score',
      value: '87.5',
      unit: '%',
      trend: 'up',
      trendValue: '+2.3%',
      benchmark: '85.0%',
      icon: 'Shield',
      color: 'success'
    },
    {
      title: 'Incident Response Efficiency',
      value: '94.2',
      unit: '%',
      trend: 'up',
      trendValue: '+1.8%',
      benchmark: '90.0%',
      icon: 'Zap',
      color: 'accent'
    },
    {
      title: 'Permit Compliance Rate',
      value: '91.7',
      unit: '%',
      trend: 'down',
      trendValue: '-0.5%',
      benchmark: '95.0%',
      icon: 'FileCheck',
      color: 'warning'
    },
    {
      title: 'Resource Utilization',
      value: '78.3',
      unit: '%',
      trend: 'up',
      trendValue: '+4.2%',
      benchmark: '80.0%',
      icon: 'Users',
      color: 'accent'
    }
  ];

  // Mock trend chart data
  const trendData = [
    {
      period: 'Week 1',
      touristVolume: 12500,
      incidents: 8,
      weatherRisk: 15
    },
    {
      period: 'Week 2',
      touristVolume: 15200,
      incidents: 12,
      weatherRisk: 25
    },
    {
      period: 'Week 3',
      touristVolume: 18700,
      incidents: 6,
      weatherRisk: 10
    },
    {
      period: 'Week 4',
      touristVolume: 21300,
      incidents: 9,
      weatherRisk: 20
    },
    {
      period: 'Week 5',
      touristVolume: 19800,
      incidents: 4,
      weatherRisk: 8
    },
    {
      period: 'Week 6',
      touristVolume: 23100,
      incidents: 7,
      weatherRisk: 12
    }
  ];

  // Mock district performance data
  const districtData = [
    {
      district: 'Kamrup Metro',
      safetyRating: 92,
      capacity: 85,
      touristCount: 45200,
      responseTime: 8
    },
    {
      district: 'Guwahati',
      safetyRating: 89,
      capacity: 78,
      touristCount: 38900,
      responseTime: 12
    },
    {
      district: 'Jorhat',
      safetyRating: 85,
      capacity: 92,
      touristCount: 28700,
      responseTime: 15
    },
    {
      district: 'Dibrugarh',
      safetyRating: 88,
      capacity: 88,
      touristCount: 32100,
      responseTime: 11
    },
    {
      district: 'Tezpur',
      safetyRating: 91,
      capacity: 75,
      touristCount: 25600,
      responseTime: 9
    },
    {
      district: 'Silchar',
      safetyRating: 73,
      capacity: 95,
      touristCount: 19800,
      responseTime: 18
    }
  ];

  // Mock executive summary data
  const executiveSummaries = [
    {
      title: 'Critical Insights',
      priority: 'high',
      insights: [
        'Tourist volume increased 23% compared to last month',
        'Weather-related incidents decreased by 40%',
        'Peak activity observed in Kamrup Metropolitan area'
      ],
      alerts: [
        'Silchar district showing below-benchmark safety ratings',
        'Resource allocation needed for weekend peak periods'
      ],
      recommendations: [
        'Deploy additional personnel to Silchar district',
        'Implement predictive weather monitoring system',
        'Review permit processing efficiency in high-volume areas'
      ]
    },
    ];

  const executiveSummaries1 = [
    {
      title: 'Performance Highlights',
      priority: 'medium',
      insights: [
        'Response time improved by 15% across all districts',
        'Tourist satisfaction ratings at all-time high',
        'IoT device connectivity maintained at 99.2%'
      ],
      recommendations: [
        'Continue current operational protocols',
        'Expand successful practices to underperforming areas',
        'Schedule quarterly performance review meetings'
      ]
    }
  ];

  

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Mock export functionality
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    setLastUpdated(new Date()?.toLocaleTimeString('en-IN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Executive Safety Intelligence Overview
            </h1>
            <p className="text-muted-foreground">
              Strategic insights and performance monitoring for senior officials
            </p>
          </div>

          {/* Control Panel */}
          <ControlPanel
            selectedDistrict={selectedDistrict}
            onDistrictChange={handleDistrictChange}
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            onExport={handleExport}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                benchmark={kpi?.benchmark}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
            {/* Trend Chart - 8 columns */}
            <div className="xl:col-span-8">
              <TrendChart
                data={trendData}
                title="Tourist Volume & Risk Correlation Analysis"
              />
            </div>

            {/* Executive Summary - 4 columns */}
            <div className="xl:col-span-4 space-y-6">
              {executiveSummaries?.map((summary, index) => (
                <ExecutiveSummaryCard
                  key={index}
                  title={summary?.title}
                  priority={summary?.priority}
                  insights={summary?.insights}
                  alerts={summary?.alerts}
                  recommendations={summary?.recommendations}
                />
              ))}
            </div>

            <div className="xl:col-span-12 space-y-6">
              {executiveSummaries1?.map((summary, index) => (
                <ExecutiveSummaryCard
                  key={index}
                  title={summary?.title}
                  priority={summary?.priority}
                  insights={summary?.insights}
                  alerts={summary?.alerts}
                  recommendations={summary?.recommendations}
                />
              ))}
            </div>
          </div>

          {/* District Performance Chart */}
          <div className="mb-8">
            <DistrictPerformanceChart
              data={districtData}
              title="District-wise Safety Performance Metrics"
            />
          </div>

          {/* Footer Stats */}
          <div className="glass-panel rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">1,89,700</div>
                <div className="text-sm text-muted-foreground">Total Tourists Monitored</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">46</div>
                <div className="text-sm text-muted-foreground">Incidents Resolved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning mb-1">12 min</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">99.2%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveSafetyIntelligenceOverview;