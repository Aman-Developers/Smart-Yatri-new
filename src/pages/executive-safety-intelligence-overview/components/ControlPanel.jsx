import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ControlPanel = ({ 
  selectedDistrict, 
  onDistrictChange, 
  selectedPeriod, 
  onPeriodChange, 
  onExport, 
  onRefresh, 
  lastUpdated 
}) => {
  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'kamrup', label: 'Kamrup Metropolitan' },
    { value: 'guwahati', label: 'Guwahati' },
    { value: 'jorhat', label: 'Jorhat' },
    { value: 'dibrugarh', label: 'Dibrugarh' },
    { value: 'tezpur', label: 'Tezpur' },
    { value: 'silchar', label: 'Silchar' }
  ];

  const periods = [
    { value: 'weekly', label: 'Weekly', icon: 'Calendar' },
    { value: 'monthly', label: 'Monthly', icon: 'CalendarDays' },
    { value: 'quarterly', label: 'Quarterly', icon: 'CalendarRange' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export PDF', icon: 'FileText' },
    { value: 'excel', label: 'Export Excel', icon: 'FileSpreadsheet' },
    { value: 'presentation', label: 'Export PPT', icon: 'Presentation' }
  ];

  return (
    <div className="glass-panel rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - District and Period Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* District Selector */}
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-accent" />
            <select
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e?.target?.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {districts?.map((district) => (
                <option key={district?.value} value={district?.value}>
                  {district?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            {periods?.map((period) => (
              <Button
                key={period?.value}
                variant={selectedPeriod === period?.value ? 'default' : 'outline'}
                size="sm"
                iconName={period?.icon}
                iconPosition="left"
                onClick={() => onPeriodChange(period?.value)}
                className="text-xs"
              >
                {period?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Right Section - Actions and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Last Updated */}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Updated: {lastUpdated}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={onRefresh}
            >
              Refresh
            </Button>

            {/* Export Dropdown */}
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast z-50">
                {exportOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onExport(option?.value)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-fast"
                  >
                    <Icon name={option?.icon} size={16} className="text-accent" />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;