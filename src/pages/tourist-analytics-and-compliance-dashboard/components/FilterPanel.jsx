import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ onFiltersChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('last7days');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistricts, setSelectedDistricts] = useState(['all']);
  const [comparisonMode, setComparisonMode] = useState(false);

  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const touristTypes = [
    { value: 'all', label: 'All Tourists' },
    { value: 'domestic', label: 'Domestic' },
    { value: 'foreign', label: 'Foreign' }
  ];

  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'kamrup', label: 'Kamrup Metropolitan' },
    { value: 'dibrugarh', label: 'Dibrugarh' },
    { value: 'jorhat', label: 'Jorhat' },
    { value: 'sivasagar', label: 'Sivasagar' },
    { value: 'tezpur', label: 'Tezpur' },
    { value: 'guwahati', label: 'Guwahati' }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onFiltersChange({ period, type: selectedType, districts: selectedDistricts, comparison: comparisonMode });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onFiltersChange({ period: selectedPeriod, type, districts: selectedDistricts, comparison: comparisonMode });
  };

  const handleDistrictToggle = (district) => {
    let newDistricts;
    if (district === 'all') {
      newDistricts = ['all'];
    } else {
      newDistricts = selectedDistricts?.includes('all') 
        ? [district]
        : selectedDistricts?.includes(district)
          ? selectedDistricts?.filter(d => d !== district)
          : [...selectedDistricts, district];
      
      if (newDistricts?.length === 0) {
        newDistricts = ['all'];
      }
    }
    
    setSelectedDistricts(newDistricts);
    onFiltersChange({ period: selectedPeriod, type: selectedType, districts: newDistricts, comparison: comparisonMode });
  };

  const toggleComparison = () => {
    const newComparison = !comparisonMode;
    setComparisonMode(newComparison);
    onFiltersChange({ period: selectedPeriod, type: selectedType, districts: selectedDistricts, comparison: newComparison });
  };

  return (
    <div className="glass-panel rounded-xl p-6 mb-6">
      <div className="flex flex-wrap items-center gap-6">
        {/* Date Range Picker */}
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-accent" />
          <div className="flex space-x-1">
            {periodOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedPeriod === option?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePeriodChange(option?.value)}
                className={selectedPeriod === option?.value ? 'glow-accent' : ''}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tourist Type Filter */}
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={20} className="text-accent" />
          <div className="flex space-x-1">
            {touristTypes?.map((type) => (
              <Button
                key={type?.value}
                variant={selectedType === type?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleTypeChange(type?.value)}
                className={selectedType === type?.value ? 'glow-accent' : ''}
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* District Multi-Select */}
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={20} className="text-accent" />
          <div className="flex flex-wrap gap-1">
            {districts?.map((district) => (
              <Button
                key={district?.value}
                variant={selectedDistricts?.includes(district?.value) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDistrictToggle(district?.value)}
                className={selectedDistricts?.includes(district?.value) ? 'glow-accent' : ''}
              >
                {district?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Comparison Mode Toggle */}
        <div className="flex items-center space-x-3 ml-auto">
          <Button
            variant={comparisonMode ? 'default' : 'ghost'}
            size="sm"
            onClick={toggleComparison}
            iconName="BarChart3"
            iconPosition="left"
            className={comparisonMode ? 'glow-accent' : ''}
          >
            Compare Periods
          </Button>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;