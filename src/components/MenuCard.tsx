import React, { useState } from 'react';
import { MenuItem } from '../App';
import { Plus, Minus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  cardStyle: string;
  onItemClick: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, cardStyle, onItemClick, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

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

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <div
      className={`${getCardClass()} rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer`}
      onClick={() => onItemClick(item)}
    >
      <div className="relative">
        <img src={item.images[0]} alt={item.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-full">
              <button
                onClick={decrementQuantity}
                className="p-1 hover:bg-gray-200 rounded-l-full transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-1 hover:bg-gray-200 rounded-r-full transition-colors"
              >
                <Plus size={16} className="text-gray-700" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-all duration-200 text-sm hover:scale-105"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;