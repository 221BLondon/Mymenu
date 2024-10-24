import React, { useState } from 'react';
import { CartItem } from '../App';
import { Trash2, MessageSquare, X, Minus, Plus } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateComment: (id: number, comment: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
  updateComment,
}) => {
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [tempComment, setTempComment] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const startEditingComment = (item: CartItem) => {
    setEditingComment(item.id);
    setTempComment(item.comment || '');
  };

  const saveComment = (id: number) => {
    updateComment(id, tempComment);
    setEditingComment(null);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center bg-gray-100 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-gray-200 rounded-l-full transition-colors"
                      >
                        <Minus size={16} className="text-gray-700" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-r-full transition-colors"
                      >
                        <Plus size={16} className="text-gray-700" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="mt-2">
                  {editingComment === item.id ? (
                    <div className="flex items-start space-x-2">
                      <textarea
                        value={tempComment}
                        onChange={(e) => setTempComment(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
                        placeholder="Add special instructions..."
                        rows={2}
                      />
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => saveComment(item.id)}
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingComment(null)}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MessageSquare size={16} />
                      <span className="flex-1">
                        {item.comment || 'No special instructions'}
                      </span>
                      <button
                        onClick={() => startEditingComment(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;