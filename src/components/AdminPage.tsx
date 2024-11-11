import React, { useState } from 'react';
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
  AlignLeft,
  AlertOctagon,
  Settings,
  MapPin,
  Bell,
  Link,
  Clock,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Plus,
  Calendar
} from 'lucide-react';
import { MenuItem, RestaurantSettings } from '../types';

interface AdminPageProps {
  menuItems: MenuItem[];
  settings: RestaurantSettings;
  onAddItem?: (item: MenuItem) => void;
  onUpdateItem?: (id: number, item: MenuItem) => void;
  onDeleteItem?: (id: number) => void;
  onUpdateSettings?: (settings: RestaurantSettings) => void;
}

type TabType = 'menu' | 'ingredients' | 'allergens' | 'settings';

const AdminPage: React.FC<AdminPageProps> = ({
  menuItems,
  settings,
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
  const [activeSettingsSection, setActiveSettingsSection] = useState<'general' | 'offers' | 'locations' | 'links'>('general');
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

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      // Add ingredient logic here
      setNewIngredient('');
    }
  };

  const handleAddAllergen = () => {
    if (newAllergen.trim()) {
      // Add allergen logic here
      setNewAllergen('');
    }
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Restaurant Admin</h1>
        {activeTab === 'menu' && (
          <button
            onClick={() => {
              setSelectedItem(null);
              setIsEditing(true);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add New Item
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Coffee className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.averagePrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Allergens</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAllergens}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Tag className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Ingredients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalIngredients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'menu'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Utensils size={20} />
            Menu Items
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ingredients'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <AlignLeft size={20} />
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('allergens')}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'allergens'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <AlertOctagon size={20} />
            Allergens
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </div>

      {/* Previous tab content remains the same */}
      {activeTab === 'menu' && (
        <>
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {renderSearchBar(searchTerm, setSearchTerm, "Search menu items...")}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Menu Items Grid/List */}
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredItems.map((item) => (
              viewMode === 'grid' ? (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditing(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => onDeleteItem?.(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-1">{item.description}</p>
                      <span className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsEditing(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteItem?.(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      )}

      {activeTab === 'ingredients' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            {renderSearchBar(ingredientSearch, setIngredientSearch, "Search ingredients...")}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Add new ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleAddIngredient}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Add Ingredient
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span>{ingredient}</span>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'allergens' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            {renderSearchBar(allergenSearch, setAllergenSearch, "Search allergens...")}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Add new allergen..."
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleAddAllergen}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Add Allergen
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAllergens.map((allergen, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg"
                >
                  <span>{allergen}</span>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Settings Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveSettingsSection('general')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeSettingsSection === 'general'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                General Info
              </button>
              <button
                onClick={() => setActiveSettingsSection('offers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeSettingsSection === 'offers'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Offers & Notices
              </button>
              <button
                onClick={() => setActiveSettingsSection('locations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeSettingsSection === 'locations'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Locations
              </button>
              <button
                onClick={() => setActiveSettingsSection('links')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeSettingsSection === 'links'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Social Links
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="p-6">
            {/* General Information */}
            {activeSettingsSection === 'general' && (
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={settings.logo}
                      alt="Restaurant logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                      <input
                        type="text"
                        defaultValue={settings.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        rows={3}
                        defaultValue={settings.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        defaultValue={settings.phone}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        defaultValue={settings.email}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <MapPin size={16} />
                    </span>
                    <input
                      type="text"
                      defaultValue={settings.address}
                      className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Opening Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="capitalize">{day}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            defaultValue={hours?.open}
                            className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          />
                          <span>-</span>
                          <input
                            type="time"
                            defaultValue={hours?.close}
                            className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Offers & Notices */}
            {activeSettingsSection === 'offers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Current Offers</h3>
                  <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Plus size={20} />
                    Add Offer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.offers.map((offer: any) => (
                    <div key={offer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {offer.image && (
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold">{offer.title}</h4>
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit2 size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">{offer.description}</p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={16} />
                            <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                          </div>
                          {offer.code && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full font-mono">
                              {offer.code}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locations */}
            {activeSettingsSection === 'locations' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Restaurant Locations</h3>
                  <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Plus size={20} />
                    Add Location
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.locations.map((location: any) => (
                    <div key={location.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold">{location.name}</h4>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin size={18} className="mt-1 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={18} />
                          <span>{location.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {activeSettingsSection === 'links' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Social Media & Links</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Globe size={16} />
                      </span>
                      <input
                        type="url"
                        defaultValue={settings.socialLinks.website}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Facebook size={16} />
                      </span>
                      <input
                        type="url"
                        defaultValue={settings.socialLinks.facebook}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Instagram</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Instagram size={16} />
                      </span>
                      <input
                        type="url"
                        defaultValue={settings.socialLinks.instagram}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Twitter size={16} />
                      </span>
                      <input
                        type="url"
                        defaultValue={settings.socialLinks.twitter}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Previous modals and other content remain the same */}
    </div>
  );
};

export default AdminPage;