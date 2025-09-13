import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    connection: 'connected',
    lastUpdate: new Date(),
    alerts: 2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    {
      label: 'Control Center',
      path: '/real-time-situational-awareness-command-center',
      icon: 'Monitor',
      description: 'Real-time situational monitoring'
    },
    {
      label: 'Analytics',
      path: '/tourist-analytics-and-compliance-dashboard',
      icon: 'BarChart3',
      description: 'Tourist flow insights and compliance'
    },
    {
      label: 'Emergency Response',
      path: '/emergency-response-coordination-center',
      icon: 'AlertTriangle',
      description: 'Incident coordination and dispatch'
    },
    {
      label: 'Executive Dashboard',
      path: '/executive-safety-intelligence-overview',
      icon: 'Shield',
      description: 'High-level intelligence overview'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Emergency Alert Banner */}
      {systemStatus?.alerts > 0 && (
        <div className="fixed top-0 left-0 right-0 z-alert bg-error text-error-foreground px-6 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="pulse-notification" />
              <span className="font-medium">
                {systemStatus?.alerts} Active Emergency Alert{systemStatus?.alerts > 1 ? 's' : ''}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-error-foreground hover:bg-error/20">
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Main Header */}
      <header className={`fixed left-0 right-0 z-navigation bg-primary border-b border-border ${systemStatus?.alerts > 0 ? 'top-12' : 'top-0'}`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center glow-accent">
                <Icon name="Shield" size={24} color="var(--color-accent-foreground)" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  Smart Yatri
                </h1>
                <p className="text-xs text-muted-foreground font-caption">
                  Safety Command System
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-fast
                  ${isActive(item?.path) 
                    ? 'bg-accent text-accent-foreground glow-accent' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                title={item?.description}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="hidden md:flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus?.connection)} glow-success`}></div>
                <span className="text-muted-foreground font-mono">
                  {systemStatus?.connection?.toUpperCase()}
                </span>
              </div>
              <div className="text-muted-foreground font-mono">
                {currentTime?.toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>

            {/* User Context */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">Command Operator</p>
                <p className="text-xs text-muted-foreground">District Central</p>
              </div>
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="var(--color-secondary-foreground)" />
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Icon name="LogOut" size={18} />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="flex overflow-x-auto px-4 py-2 space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-fast
                  ${isActive(item?.path) 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-sm font-medium">{item?.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;