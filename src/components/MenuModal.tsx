import React from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../App';

interface MenuModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ item, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="relative">
          <img src={item.image} alt={item.name} className="w-full h-72 object-cover rounded-t-xl" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
          
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {item.description}
          </p>
          
          {item.video && (
            <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden">
              <iframe
                src={item.video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Allergens</h3>
              <ul className="space-y-2">
                {item.allergens.map((allergen, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    {allergen}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-2xl font-bold text-red-600">${item.price.toFixed(2)}</span>
            <button
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors transform hover:scale-105 duration-200 font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;