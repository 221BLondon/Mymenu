import React, { useState } from 'react';
import { MenuItem, RestaurantSettings } from '../../types';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  Grid, 
  List, 
  Search,
  Coffee,
  DollarSign,
  AlertTriangle,
  Tag,
  Utensils,
  AlertOctagon,
  Settings,
  Plus,
  X
} from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import SocialLinks from './SocialLinks';

interface AdminPageProps {
  menuItems: MenuItem[];
  settings: RestaurantSettings;
  onAddItem?: (item: MenuItem) => void;
  onUpdateItem?: (id: number, item: MenuItem) => void;
  onDeleteItem?: (id: number) => void;
  onUpdateSettings?: (settings: RestaurantSettings) => void;
}

type TabType = 'menu' | 'ingredients' | 'allergens' | 'settings';
type SettingsSectionType = 'general' | 'offers' | 'locations' | 'links';

const AdminPage: React.FC<AdminPageProps> = ({ 
  menuItems,
  settings: initialSettings,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [allergenSearch, setAllergenSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [newAllergen, setNewAllergen] = useState('');
  const [activeSettingsSection, setActiveSettingsSection] = useState<SettingsSectionType>('general');
  const [settings, setSettings] = useState<RestaurantSettings>(initialSettings);

  const allIngredients = [...new Set(menuItems.flatMap(item => item.ingredients))];
  const allAllergens = [...new Set(menuItems.flatMap(item => item.allergens))];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const filteredAllergens = allAllergens.filter(allergen =>
    allergen.toLowerCase().includes(allergenSearch.toLowerCase())
  );

  const stats = {
    totalItems: menuItems.length,
    averagePrice: menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length,
    totalAllergens: allAllergens.length,
    totalIngredients: allIngredients.length
  };

  const handleUpdateSettings = () => {
    onUpdateSettings?.(settings);
  };

  const handleUpdateField = (field: keyof RestaurantSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateSocialLinks = (links: RestaurantSettings['socialLinks']) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: links
    }));
  };

  const renderSearchBar = (
    value: string, 
    onChange: (value: string) => void, 
    placeholder: string
  ) => (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
      <button
        onClick={() => setActiveTab('menu')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'menu' ? 'bg-white shadow text-red-600' : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Coffee size={20} className="mr-2" />
        Menu Items
      </button>
      <button
        onClick={() => setActiveTab('ingredients')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'ingredients' ? 'bg-white shadow text-red-600' : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Utensils size={20} className="mr-2" />
        Ingredients
      </button>
      <button
        onClick={() => setActiveTab('allergens')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'allergens' ? 'bg-white shadow text-red-600' : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <AlertTriangle size={20} className="mr-2" />
        Allergens
      </button>
      <button
        onClick={() => setActiveTab('settings')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'settings' ? 'bg-white shadow text-red-600' : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Settings size={20} className="mr-2" />
        Settings
      </button>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Items</p>
            <p className="text-2xl font-bold">{stats.totalItems}</p>
          </div>
          <Coffee size={24} className="text-red-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Average Price</p>
            <p className="text-2xl font-bold">${stats.averagePrice.toFixed(2)}</p>
          </div>
          <DollarSign size={24} className="text-green-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Allergens</p>
            <p className="text-2xl font-bold">{stats.totalAllergens}</p>
          </div>
          <AlertOctagon size={24} className="text-yellow-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Ingredients</p>
            <p className="text-2xl font-bold">{stats.totalIngredients}</p>
          </div>
          <Tag size={24} className="text-blue-600" />
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveSettingsSection('general')}
          className={`px-4 py-2 rounded-lg ${
            activeSettingsSection === 'general' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveSettingsSection('offers')}
          className={`px-4 py-2 rounded-lg ${
            activeSettingsSection === 'offers' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Offers
        </button>
        <button
          onClick={() => setActiveSettingsSection('locations')}
          className={`px-4 py-2 rounded-lg ${
            activeSettingsSection === 'locations' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Locations
        </button>
        <button
          onClick={() => setActiveSettingsSection('links')}
          className={`px-4 py-2 rounded-lg ${
            activeSettingsSection === 'links' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Social Links
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeSettingsSection === 'general' && (
          <GeneralSettings settings={settings} onUpdateField={handleUpdateField} />
        )}
        {activeSettingsSection === 'links' && (
          <SocialLinks settings={settings} onUpdateSocialLinks={handleUpdateSocialLinks} />
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateSettings}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h2>
      {renderStats()}
      {renderTabs()}
      <div className="mb-6">
        {activeTab === 'menu' && (
          <>
            {renderSearchBar(searchTerm, setSearchTerm, 'Search menu items...')}
            <div className="mt-6">
              {/* Menu items rendering */}
            </div>
          </>
        )}
        {activeTab === 'ingredients' && (
          <div>
            {renderSearchBar(ingredientSearch, setIngredientSearch, 'Search ingredients...')}
            {/* Ingredients rendering */}
          </div>
        )}
        {activeTab === 'allergens' && (
          <div>
            {renderSearchBar(allergenSearch, setAllergenSearch, 'Search allergens...')}
            {/* Allergens rendering */}
          </div>
        )}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default AdminPage;