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
  X,
  Download,
  Upload,
} from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import SocialLinks from './SocialLinks';
import ImportModal from './ImportModal';
import ItemFormModal from './ItemFormModal';
import { menuItems } from '../../data/menuItems';

interface AdminPageProps {
  // menuItemsList: MenuItem[];
  settings: RestaurantSettings;
  // onAddItem: (item: MenuItem) => void;
  // onUpdateItem: (id: number, item: MenuItem) => void;
  // onDeleteItem: (id: number) => void;
  onUpdateSettings: (settings: RestaurantSettings) => void;
}

type TabType = 'menu' | 'ingredients' | 'allergens' | 'settings';
type SettingsSectionType = 'general' | 'offers' | 'locations' | 'links';

const AdminPage: React.FC<AdminPageProps> = ({
  // menuItemsList,
  settings: initialSettings,
  onUpdateSettings,
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
  const [activeSettingsSection, setActiveSettingsSection] =
    useState<SettingsSectionType>('general');
  const [settings, setSettings] = useState<RestaurantSettings>(initialSettings);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>([
    // Initial menu items here
    ...menuItems
  ]);
  const allIngredients = [
    ...new Set(menuItemsList.flatMap((item) => item.ingredients)),
  ];
  const allAllergens = [
    ...new Set(menuItemsList.flatMap((item) => item.allergens)),
  ];

  const filteredItems = menuItemsList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIngredients = allIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const filteredAllergens = allAllergens.filter((allergen) =>
    allergen.toLowerCase().includes(allergenSearch.toLowerCase())
  );

  const stats = {
    totalItems: menuItemsList.length,
    averagePrice:
      menuItemsList.reduce((acc, item) => acc + item.price, 0) / menuItemsList.length,
    totalAllergens: allAllergens.length,
    totalIngredients: allIngredients.length,
  };

  const handleUpdateSettings = () => {
    onUpdateSettings?.(settings);
  };

  const handleUpdateField = (field: keyof RestaurantSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateSocialLinks = (
    links: RestaurantSettings['socialLinks']
  ) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: links,
    }));
  };

  const handleExportSettings = () => {
    const exportCode = btoa(JSON.stringify(settings));
    navigator.clipboard.writeText(exportCode).then(() => {
      alert('Export code copied to clipboard!');
    });
  };

  const handleImportSettings = (
    importedSettings: Partial<RestaurantSettings>
  ) => {
    setSettings((prev) => ({
      ...prev,
      ...importedSettings,
    }));
    onUpdateSettings?.({
      ...settings,
      ...importedSettings,
    });
  };

  const renderSearchBar = (
    value: string,
    onChange: (value: string) => void,
    placeholder: string
  ) => (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
  );

  const renderTabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
      <button
        onClick={() => setActiveTab('menu')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'menu'
            ? 'bg-white shadow text-red-600'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Coffee size={20} className="mr-2" />
        Menu Items({menuItems.length})
      </button>
      <button
        onClick={() => setActiveTab('ingredients')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'ingredients'
            ? 'bg-white shadow text-red-600'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <Utensils size={20} className="mr-2" />
        Ingredients({allIngredients.length})
      </button>
      <button
        onClick={() => setActiveTab('allergens')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'allergens'
            ? 'bg-white shadow text-red-600'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        <AlertTriangle size={20} className="mr-2" />
        Allergens({allAllergens.length})
      </button>
      <button
        onClick={() => setActiveTab('settings')}
        className={`flex items-center px-4 py-2 rounded-md ${
          activeTab === 'settings'
            ? 'bg-white shadow text-red-600'
            : 'text-gray-600 hover:bg-white/50'
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
            <p className="text-2xl font-bold">
              ${stats.averagePrice.toFixed(2)}
            </p>
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4  overflow-x-auto">
          <button
            onClick={() => setActiveSettingsSection('general')}
            className={`px-4 py-2 rounded-lg ${
              activeSettingsSection === 'general'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveSettingsSection('offers')}
            className={`px-4 py-2 rounded-lg ${
              activeSettingsSection === 'offers'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => setActiveSettingsSection('locations')}
            className={`px-4 py-2 rounded-lg ${
              activeSettingsSection === 'locations'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => setActiveSettingsSection('links')}
            className={`px-4 py-2 rounded-lg ${
              activeSettingsSection === 'links'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Social Links
          </button>
          <button
            onClick={handleExportSettings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Download size={20} />
            Export
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Upload size={20} />
            Import
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeSettingsSection === 'general' && (
          <GeneralSettings
            settings={settings}
            onUpdateField={handleUpdateField}
          />
        )}
        {activeSettingsSection === 'links' && (
          <SocialLinks
            settings={settings}
            onUpdateSocialLinks={handleUpdateSocialLinks}
          />
        )}
        {activeSettingsSection === 'offers' && (
          <div className="space-y-6">
            {settings.offers.map((offer, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{offer.title}</h3>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded">
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      defaultValue={offer.description}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      defaultValue={offer.validUntil}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
              Add New Offer
            </button>
          </div>
        )}

        {activeSettingsSection === 'locations' && (
          <div className="space-y-6">
            {settings.locations.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{location.name}</h3>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded">
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      defaultValue={location.address}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      defaultValue={location.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
              Add New Location
            </button>
          </div>
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

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        currentSettings={settings}
        onImport={handleImportSettings}
      />
    </div>
  );

  const renderMenuItems = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <List size={20} />
          </button>
        </div>
        <button onClick={() => {
            setSelectedItem(null);
            setIsEditing(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add Item
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-600">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button  onClick={() => editItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={()=>deleteItem(item.id)}  className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2  size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-red-600">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button onClick={()=> {
                      editItem(item);
                    }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={()=>deleteItem(item.id)}  className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderIngredients = () => (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        {renderSearchBar(
          ingredientSearch,
          setIngredientSearch,
          'Search ingredients...'
        )}
        <div className="flex-shrink-0">
          <button onClick={()=>addIngredients()} className="hidden bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors sm:flex items-center">
            <Plus size={20} className="mr-2" />
            Add Ingredient
          </button>
          <button onClick={()=>addIngredients()} title='Add Ingredient' className="sm:hidden bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Plus size={20} className="" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        {filteredIngredients.map((ingredient, index) => (
          <div
            key={index}
            className="p-4 flex items-center justify-between hover:bg-gray-50 border-b last:border-b-0"
          >
            <span>{ingredient}</span>
            <button className="text-red-600 hover:bg-red-50 p-2 rounded">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAllergens = () => (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        {renderSearchBar(
          allergenSearch,
          setAllergenSearch,
          'Search allergens...'
        )}
        <div className="flex-shrink-0">
          <button onClick={()=>addAllergen()} className="hidden bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors sm:flex items-center">
            <Plus size={20} className="mr-2" />
            Add Allergen
          </button>
          <button onClick={()=>addAllergen()} className="sm:hidden bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Plus size={20} className="" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        {filteredAllergens.map((allergen, index) => (
          <div
            key={index}
            className="p-4 flex items-center justify-between hover:bg-gray-50 border-b last:border-b-0"
          >
            <span>{allergen}</span>
            <button className="text-red-600 hover:bg-red-50 p-2 rounded">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );


  const onAddItem = (newItem: MenuItem) => {
    setMenuItemsList((prevItems) => [
      ...prevItems,
      { ...newItem, id: Math.random() },
    ]);
  };

  const onUpdateItem = (id: number, updatedItem: MenuItem) => {
    setMenuItemsList((prevItems) =>
      prevItems.reduce<MenuItem[]>((acc, item) => {
        if (item.id === id) {
          acc.push({ ...item, ...updatedItem });
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };
  const editItem=(item:MenuItem)=>{
    console.log("hEREE")
    
    setSelectedItem(item);
    setIsEditing(true);
    console.log("hEREE",selectedItem)
  }
  const deleteItem=(id:any)=>{
    const updatedMenusItems= menuItems.filter(m=>m.id!==id);
    setMenuItemsList(updatedMenusItems);
  }
  const addAllergen=()=>{
  }
  const addIngredients=()=>{}
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h2>
      {renderStats()}
      {renderTabs()}

      <div className="mb-6">
        {activeTab === 'menu' && (
          <>
            {renderSearchBar(searchTerm, setSearchTerm, 'Search menu items...')}
            <div className="mt-6">{renderMenuItems()}</div>
          </>
        )}
        {activeTab === 'ingredients' && renderIngredients()}
        {activeTab === 'allergens' && renderAllergens()}
        {activeTab === 'settings' && renderSettings()}
      </div>
      <ItemFormModal 
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        selectedItem={selectedItem}
        ingredientsList={allIngredients}
        allergensList={allAllergens}
        onSave={(item: MenuItem) => {
          if (selectedItem) {
            onUpdateItem(selectedItem.id, item);
          } else {
            onAddItem(item);
          }
        }}
      />
    </div>
  );
};

export default AdminPage;
