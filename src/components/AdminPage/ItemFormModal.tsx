import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { MenuItem } from '../../types';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
  onSave: (item: MenuItem) => void;
}

interface FormData {
  name: string;
  description: string;
  price: string | number;
  ingredients: string;
  allergens: string;
  images: string[];
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedItem, 
  onSave 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: selectedItem?.name || '',
    description: selectedItem?.description || '',
    price: selectedItem?.price || '',
    ingredients: selectedItem?.ingredients?.join(', ') || '',
    allergens: selectedItem?.allergens?.join(', ') || '',
    images: selectedItem?.images || []
  });
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name || '',
        description: selectedItem.description || '',
        price: selectedItem.price || '',
        ingredients: selectedItem.ingredients?.join(', ') || '',
        allergens: selectedItem.allergens?.join(', ') || '',
        images: selectedItem.images || []
      });
    }
  }, [selectedItem]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: MenuItem = {
        id: selectedItem?.id || Date.now(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        allergens: formData.allergens.split(',').map(a => a.trim()).filter(Boolean),
        images: formData.images,
        image: '',
        category: ''
    };
    
    onSave(newItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedItem ? 'Edit Item' : 'Add New Item'}{selectedItem?.id}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop images here, or click to select files
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergens (comma-separated)
                </label>
                <input
                  type="text"
                  name="allergens"
                  value={formData.allergens}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {selectedItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFormModal;