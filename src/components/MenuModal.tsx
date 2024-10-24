import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { MenuItem } from '../App';

interface MenuModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, comment?: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ item, onClose, onAddToCart }) => {
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, comment.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="relative">
          {/* Media Toggle Buttons */}
          {item.video && (
            <div className="absolute top-4 left-4 bg-white/90 rounded-lg overflow-hidden flex">
              <button 
                onClick={() => setActiveMedia('image')}
                className={`px-4 py-2 ${activeMedia === 'image' ? 'bg-red-600 text-white' : 'text-gray-700'}`}
              >
                Photo
              </button>
              <button 
                onClick={() => setActiveMedia('video')}
                className={`px-4 py-2 ${activeMedia === 'video' ? 'bg-red-600 text-white' : 'text-gray-700'}`}
              >
                Video
              </button>
            </div>
          )}

          {/* Close Button */}


          {/* Media Display */}
          <div className="h-72 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>
            {activeMedia === 'image' ? (
              <>
                <img 
                  src={item.images[currentImageIndex]} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight size={24} className="text-gray-700" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <iframe
                src={item.video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
          
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {item.description}
          </p>
          
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

          {/* Special Instructions */}
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Add any special requests or notes..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
            <span className="text-2xl font-bold text-red-600">${(item.price * quantity).toFixed(2)}</span>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-gray-100 rounded-full">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-gray-200 rounded-l-full transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={20} className={quantity <= 1 ? 'text-gray-400' : 'text-gray-700'} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-gray-200 rounded-r-full transition-colors"
                >
                  <Plus size={20} className="text-gray-700" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors transform hover:scale-105 duration-200 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;