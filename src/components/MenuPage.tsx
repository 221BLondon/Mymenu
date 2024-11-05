import React, { useState, useMemo } from 'react';
import { MenuItem } from '../App';
import { ChevronDown, Search, X, Flame } from 'lucide-react';
import MenuModal from './MenuModal';
import MenuCard from './MenuCard';

interface MenuPageProps {
  addToCart: (item: MenuItem, quantity: number, comment?: string) => void;
  menuItems: MenuItem[];
}

const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free'] as const;
const spicyLevels = [1, 2, 3] as const;

const MenuPage: React.FC<MenuPageProps> = ({ addToCart, menuItems }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list' | 'compact' | 'magazine'>('grid');
  const [cardStyle, setCardStyle] = useState<'default' | 'minimal' | 'elegant' | 'modern' | 'playful'>('default');
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState<Set<typeof dietaryOptions[number]>>(new Set());
  const [selectedSpicyLevels, setSelectedSpicyLevels] = useState<Set<typeof spicyLevels[number]>>(new Set());

  const categories = useMemo(() => 
    ['All', ...new Set(menuItems.map(item => item.category))],
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Search filter
      const searchMatch = 
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;

      // Dietary filter
      const dietaryMatch = 
        selectedDietary.size === 0 ||
        (item.dietary && Array.from(selectedDietary).every(diet => item.dietary?.includes(diet)));

      // Spicy level filter
      const spicyMatch =
        selectedSpicyLevels.size === 0 ||
        (item.spicyLevel && selectedSpicyLevels.has(item.spicyLevel));

      return searchMatch && categoryMatch && dietaryMatch && spicyMatch;
    });
  }, [menuItems, searchQuery, selectedCategory, selectedDietary, selectedSpicyLevels]);

  const toggleDietary = (option: typeof dietaryOptions[number]) => {
    setSelectedDietary(prev => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
  };

  const toggleSpicyLevel = (level: typeof spicyLevels[number]) => {
    setSelectedSpicyLevels(prev => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  const getGridClass = () => {
    switch (layout) {
      case 'list':
        return 'grid grid-cols-1 gap-6';
      case 'compact':
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4';
      case 'magazine':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col space-y-6 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {/* Category Chips */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Additional Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Dietary Filters */}
          {dietaryOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleDietary(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDietary.has(option)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}

          {/* Spicy Level Filters */}
          {spicyLevels.map((level) => (
            <button
              key={level}
              onClick={() => toggleSpicyLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                selectedSpicyLevels.has(level)
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Flame size={16} className={selectedSpicyLevels.has(level) ? 'text-white' : 'text-orange-500'} />
              {level}
            </button>
          ))}
        </div>

        {/* Active Filters Summary */}
        {(selectedDietary.size > 0 || selectedSpicyLevels.size > 0 || selectedCategory !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md">
                {selectedCategory}
              </span>
            )}
            {Array.from(selectedDietary).map((diet) => (
              <span key={diet} className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
                {diet}
              </span>
            ))}
            {Array.from(selectedSpicyLevels).map((level) => (
              <span key={level} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md flex items-center gap-1">
                <Flame size={14} />
                {level}
              </span>
            ))}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDietary(new Set());
                setSelectedSpicyLevels(new Set());
              }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Layout Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Our Menu</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <button 
              className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm"
              onClick={() => setShowLayoutMenu(!showLayoutMenu)}
            >
              <span className="mr-2">Layout</span>
              <ChevronDown size={20} />
            </button>
            {showLayoutMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button onClick={() => { setLayout('grid'); setShowLayoutMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Grid</button>
                <button onClick={() => { setLayout('list'); setShowLayoutMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">List</button>
                <button onClick={() => { setLayout('compact'); setShowLayoutMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Compact</button>
                <button onClick={() => { setLayout('magazine'); setShowLayoutMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Magazine</button>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm"
              onClick={() => setShowStyleMenu(!showStyleMenu)}
            >
              <span className="mr-2">Style</span>
              <ChevronDown size={20} />
            </button>
            {showStyleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button onClick={() => { setCardStyle('default'); setShowStyleMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Default</button>
                <button onClick={() => { setCardStyle('minimal'); setShowStyleMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Minimal</button>
                <button onClick={() => { setCardStyle('elegant'); setShowStyleMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Elegant</button>
                <button onClick={() => { setCardStyle('modern'); setShowStyleMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Modern</button>
                <button onClick={() => { setCardStyle('playful'); setShowStyleMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Playful</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No items found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDietary(new Set());
              setSelectedSpicyLevels(new Set());
            }}
            className="mt-4 text-red-600 hover:text-red-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className={getGridClass()}>
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              cardStyle={cardStyle}
              onItemClick={() => setSelectedItem(item)}
              onAddToCart={(item, quantity) => addToCart(item, quantity)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <MenuModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default MenuPage;