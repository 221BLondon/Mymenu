import React from 'react';
import { MenuItem } from '../App';

interface MenuCardProps {
  item: MenuItem;
  cardStyle: string;
  onItemClick: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, cardStyle, onItemClick, onAddToCart }) => {
  const getCardClass = () => {
    switch (cardStyle) {
      case 'minimal':
        return 'bg-white shadow-sm hover:shadow-md';
      case 'elegant':
        return 'bg-gray-50 shadow-md hover:shadow-lg border border-gray-200';
      case 'modern':
        return 'bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-xl';
      case 'playful':
        return 'bg-yellow-50 shadow-md hover:shadow-lg border-2 border-yellow-200 rounded-2xl';
      default:
        return 'bg-white shadow-md hover:shadow-lg';
    }
  };

  return (
    <div
      className={`${getCardClass()} rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer`}
      onClick={() => onItemClick(item)}
    >
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;