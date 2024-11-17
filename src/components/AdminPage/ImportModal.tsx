import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { RestaurantSettings } from '../../types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: RestaurantSettings;
  onImport: (settings: Partial<RestaurantSettings>) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onImport,
}) => {
  const [importCode, setImportCode] = useState('');
  const [importedSettings, setImportedSettings] = useState<RestaurantSettings | null>(null);
  const [toggleStates, setToggleStates] = useState<Record<keyof RestaurantSettings, boolean>>({
    name: false,
    description: false,
    logo: false,
    phone: false,
    email: false,
    address: false,
    openingHours: false,
    socialLinks: false,
    offers: false,
    locations: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleImportCode = () => {
    try {
      const decoded = JSON.parse(atob(importCode));
      setImportedSettings(decoded);
      setError(null);
      
      // Initialize toggles with keys from RestaurantSettings
      const initialToggles: Record<keyof RestaurantSettings, boolean> = {
        name: false,
        description: false,
        logo: false,
        phone: false,
        email: false,
        address: false,
        openingHours: false,
        socialLinks: false,
        offers: false,
        locations: false
      };
      setToggleStates(initialToggles);
    } catch (e) {
      setError('Invalid import code. Please check and try again.');
      setImportedSettings(null);
    }
  };

  const handleToggle = (field: keyof RestaurantSettings) => {
    setToggleStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveChanges = () => {
    if (!importedSettings) return;

    // const selectedChanges: Partial<RestaurantSettings> = Object.keys(toggleStates)
    // .filter((key) => toggleStates[key as keyof typeof toggleStates]) // Ensure key is valid in toggleStates
    // .reduce((acc, key) => {
    //   // Ensure key is valid in both toggleStates and importedSettings
    //   const typedKey = key as keyof RestaurantSettings;
    //   acc[typedKey] = importedSettings[typedKey];
    //   return acc;
    // }, {} as Partial<RestaurantSettings>);
    const selectedChanges = Object.keys(toggleStates).reduce((acc, key) => {
      const settingKey = key as keyof RestaurantSettings;
      if (toggleStates[settingKey]) {
        // Only add the key-value pair if the toggle is true
        return {
          ...acc,
          [settingKey]: importedSettings[settingKey]
        };
      }
      return acc;
    }, {} as Partial<RestaurantSettings>);

    onImport(selectedChanges);
    onClose();
  };

  if (!isOpen) return null;

  const renderComparisonField = (
    field: keyof RestaurantSettings,
    label: string,
    currentValue: RestaurantSettings[keyof RestaurantSettings],
    importedValue: RestaurantSettings[keyof RestaurantSettings]
  ) => {  
    const isToggled = toggleStates[field];
    const hasChange = JSON.stringify(currentValue) !== JSON.stringify(importedValue);

    const renderValue = (value: any) => {
      if (typeof value === 'object') {
        return (
          <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        );
      }
      return <span className="break-all">{value}</span>;
    };

    return (
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {hasChange && (
            <button
              onClick={() => handleToggle(field)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isToggled ? 'bg-red-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isToggled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Current</div>
            {renderValue(currentValue)}
          </div>
          <div className={`p-3 rounded-lg ${hasChange ? 'bg-yellow-50' : 'bg-gray-50'}`}>
            <div className="text-xs text-gray-500 mb-1">Imported</div>
            {renderValue(importedValue)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Import Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!importedSettings ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Import Code
                </label>
                <textarea
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Paste your import code here..."
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <button
                onClick={handleImportCode}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Import
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-y-auto max-h-[60vh] pr-4 -mr-4">
                {renderComparisonField('name', 'Restaurant Name', currentSettings.name, importedSettings.name)}
                {renderComparisonField('description', 'Description', currentSettings.description, importedSettings.description)}
                {renderComparisonField('logo', 'Logo URL', currentSettings.logo, importedSettings.logo)}
                {renderComparisonField('phone', 'Phone', currentSettings.phone, importedSettings.phone)}
                {renderComparisonField('email', 'Email', currentSettings.email, importedSettings.email)}
                {renderComparisonField('address', 'Address', currentSettings.address, importedSettings.address)}
                {renderComparisonField('openingHours', 'Opening Hours', currentSettings.openingHours, importedSettings.openingHours)}
                {renderComparisonField('socialLinks', 'Social Links', currentSettings.socialLinks, importedSettings.socialLinks)}
                {renderComparisonField('offers', 'Offers', currentSettings.offers, importedSettings.offers)}
                {renderComparisonField('locations', 'Locations', currentSettings.locations, importedSettings.locations)}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Check size={20} />
                  Apply Selected Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;