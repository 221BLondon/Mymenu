import React, { useCallback, useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { RestaurantSettings } from '../../types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: RestaurantSettings;
  onImport: (settings: Partial<RestaurantSettings>) => void;
}

interface MultiItemToggles {
  [key: string]: {
    [itemId: string]: boolean;
  };
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
  const [multiItemToggles, setMultiItemToggles] = useState<MultiItemToggles>({});
  const [error, setError] = useState<string | null>(null);

  const handleImportCode = () => {
    try {
      // const decoded = JSON.parse(atob(importCode));
      // setImportedSettings(decoded);
      let parsedSettings;
      try {
        const decoded = atob(importCode);
        parsedSettings = JSON.parse(decoded); // Attempt to parse as Base64-encoded JSON
      } catch {
        // If decoding fails, treat it as plain JSON
        parsedSettings = JSON.parse(importCode);
      }
      setImportedSettings(parsedSettings)
      setError(null);
      
      // Initialize toggles
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

      // Initialize multi-item toggles
      const initialMultiToggles: MultiItemToggles = {};
      if (parsedSettings.offers) {
        initialMultiToggles.offers = {};
        parsedSettings.offers.forEach((offer: any) => {
          initialMultiToggles.offers[offer.id] = false;
        });
      }
      if (parsedSettings.locations) {
        initialMultiToggles.locations = {};
        parsedSettings.locations.forEach((location: any) => {
          initialMultiToggles.locations[location.id] = false;
        });
      }
      setMultiItemToggles(initialMultiToggles);
    } catch (e) {
      setError('Invalid import code. Please check and try again.');
      setImportedSettings(null);
    }
  };

  const handleToggle = useCallback((field: keyof RestaurantSettings) => {
    setToggleStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);
  
  const handleMultiItemToggle = useCallback((field: string, itemId: string) => {
    setMultiItemToggles(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [itemId]: !prev[field]?.[itemId]
      }
    }));
  }, []);
  

  const handleSaveChanges = () => {
    if (!importedSettings) return;

    const selectedChanges = Object.keys(toggleStates).reduce((acc, key) => {
      const settingKey = key as keyof RestaurantSettings;
      if (toggleStates[settingKey]) {
        if (key === 'offers' || key === 'locations') {
          // Handle multi-item fields
          const selectedItems = Object.entries(multiItemToggles[key] || {})
            .filter(([_, isSelected]) => isSelected)
            .map(([itemId]) => {
              return importedSettings[key].find((item: any) => item.id === itemId);
            })
            .filter(Boolean);

          return {
            ...acc,
            [key]: [...(currentSettings[key] || []), ...selectedItems]
          };
        } else {
          return {
            ...acc,
            [settingKey]: importedSettings[settingKey]
          };
        }
      }
      return acc;
    }, {} as Partial<RestaurantSettings>);

    onImport(selectedChanges);
    onClose();
  };

  const renderValue = (value: any) => {
    if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
      return (
        <div>
          <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-lg mb-2" />
          <span className="text-sm text-gray-600 break-all">{value}</span>
        </div>
      );
    }
    
    if (typeof value === 'object') {
      return (
        <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    
    return <span className="break-all">{value}</span>;
  };

  const renderMultiItemField = (
    field: 'offers' | 'locations',
    currentValue:any[],
    importedValue: any[],
    label: string
  ) => {
    const isToggled = toggleStates[field];
    const hasChanges = JSON.stringify(currentSettings[field]) !== JSON.stringify(importedSettings?.[field]);

    return (
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {/* {hasChanges}
          {hasChanges && ( */}
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
          {/* )} */}
        </div>
        {/* {isToggled && ( */}
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Current</div>
                {currentValue.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={multiItemToggles[field]?.[item.id] || false}
                      onChange={() => handleMultiItemToggle(field, item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title || item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                      {item.image && (
                        <img src={item.image} alt="" className="mt-2 w-20 h-20 object-cover rounded" />
                      )}
                    </div>
                  </div>
                ))}
                </div>
                <div className={`p-3 rounded-lg ${hasChanges ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                <div className="text-xs text-gray-500 mb-1">Imported</div>
                {(hasChanges ? importedValue : currentValue).map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={multiItemToggles[field]?.[item.id] || false}
                      onChange={() => handleMultiItemToggle(field, item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title || item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                      {item.image && (
                        <img src={item.image} alt="" className="mt-2 w-20 h-20 object-cover rounded" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>

            </div>
        {/* )} */}
      </div>
    );
  };

  const renderComparisonField = (
    field: keyof RestaurantSettings,
    label: string,
    currentValue: any,
    importedValue: any
  ) => {
    if (field === 'offers' || field === 'locations') {
      return renderMultiItemField(field, currentValue,importedValue, label);
    }

    const isToggled = toggleStates[field];
    const hasChange = JSON.stringify(currentValue) !== JSON.stringify(importedValue);

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
            {isToggled?renderValue(currentValue):renderValue(importedValue)}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

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