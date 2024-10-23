import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from '../App';
import { ChevronDown } from 'lucide-react';
import MenuCard from './MenuCard';
import MenuModal from './MenuModal';

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Chicken Curry',
    description: 'Tender chicken pieces cooked in a rich, aromatic curry sauce with traditional Indian spices.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Garam Masala'],
    allergens: ['Dairy', 'Mustard']
  }
];

interface MenuPageProps {
  addToCart: (item: MenuItem) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ addToCart }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list' | 'compact' | 'magazine'>('grid');
  const [cardStyle, setCardStyle] = useState<'default' | 'minimal' | 'elegant' | 'modern' | 'playful'>('default');
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  
  const layoutRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layoutRef.current && !layoutRef.current.contains(event.target as Node)) {
        setShowLayoutMenu(false);
      }
      if (styleRef.current && !styleRef.current.contains(event.target as Node)) {
        setShowStyleMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Our Menu</h2>
        <div className="flex space-x-4">
          <div className="relative" ref={layoutRef}>
            <button 
              className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => {
                setShowLayoutMenu(!showLayoutMenu);
                setShowStyleMenu(false);
              }}
            >
              <span className="mr-2">Layout</span>
              <ChevronDown size={20} className={`transform transition-transform ${showLayoutMenu ? 'rotate-180' : ''}`} />
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
          <div className="relative" ref={styleRef}>
            <button 
              className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => {
                setShowStyleMenu(!showStyleMenu);
                setShowLayoutMenu(false);
              }}
            >
              <span className="mr-2">Style</span>
              <ChevronDown size={20} className={`transform transition-transform ${showStyleMenu ? 'rotate-180' : ''}`} />
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

      <div className={getGridClass()}>
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            cardStyle={cardStyle}
            onItemClick={(item) => setSelectedItem(item)}
            onAddToCart={addToCart}
          />
        ))}
      </div>

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