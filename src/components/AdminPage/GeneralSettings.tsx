import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { RestaurantSettings } from '../../types';

interface GeneralSettingsProps {
  settings: RestaurantSettings;
  onUpdateField: (field: keyof RestaurantSettings, value: string) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onUpdateField }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
        <input
          type="text"
          value={settings.name}
          onChange={(e) => onUpdateField('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={settings.description}
          onChange={(e) => onUpdateField('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
        <input
          type="text"
          value={settings.logo}
          onChange={(e) => onUpdateField('logo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Phone size={20} className="text-gray-400" />
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => onUpdateField('phone', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} className="text-gray-400" />
            <input
              type="email"
              defaultValue={settings.email}
              onChange={(e) => onUpdateField('email', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;