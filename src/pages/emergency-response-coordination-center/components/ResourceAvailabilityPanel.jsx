import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceAvailabilityPanel = ({ officers, vehicles, equipment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'busy': return 'text-warning bg-warning/10';
      case 'offline': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Officer Locations Mini Map */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Officer Locations</h3>
          <Button variant="ghost" size="sm" iconName="Maximize2" />
        </div>
        <div className="relative bg-muted/20 rounded-lg h-48 overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Officer Locations Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=26.2006,92.9376&z=12&output=embed"
            className="rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Available: {officers?.filter(o => o?.status === 'available')?.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Busy: {officers?.filter(o => o?.status === 'busy')?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Officer Status List */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Response Officers</h3>
          <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
            Add Officer
          </Button>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {officers?.map((officer) => (
            <div key={officer?.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{officer?.name}</h4>
                  <p className="text-sm text-muted-foreground">{officer?.badge} • {officer?.unit}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(officer?.status)}`}>
                  <Icon name={getStatusIcon(officer?.status)} size={12} className="inline mr-1" />
                  {officer?.status}
                </span>
                <Button variant="ghost" size="sm" iconName="MessageSquare" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Vehicle Status */}
      {/* <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Vehicle Fleet</h3>
          <Button variant="ghost" size="sm" iconName="MoreVertical" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {vehicles?.map((vehicle) => (
            <div key={vehicle?.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Icon name={vehicle?.type === 'patrol' ? 'Car' : vehicle?.type === 'ambulance' ? 'Truck' : 'Bike'} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{vehicle?.callSign}</h4>
                  <p className="text-sm text-muted-foreground">{vehicle?.type} • {vehicle?.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${vehicle?.status === 'available' ? 'bg-success' : vehicle?.status === 'busy' ? 'bg-warning' : 'bg-error'}`}></div>
                <span className="text-sm text-muted-foreground">{vehicle?.fuel}%</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Equipment Inventory */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Equipment Status</h3>
          <Button variant="ghost" size="sm" iconName="Package" />
        </div>
        <div className="space-y-3">
          {equipment?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs ${item?.available > 5 ? 'bg-success/20 text-success' : item?.available > 2 ? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'}`}>
                  {item?.available}/{item?.total}
                </div>
                <Button variant="ghost" size="sm" iconName="Info" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceAvailabilityPanel;