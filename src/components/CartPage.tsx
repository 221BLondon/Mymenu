import React from 'react';
import { CartItem } from '../App';
import { Trash2 } from 'lucide-react';

// ... (keep the existing CartPageProps interface)

const CartPage: React.FC<CartPageProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-base sm:text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 px-2 py-1 rounded-l text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-3 sm:px-4 py-1 text-sm sm:text-base">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded-r text-sm sm:text-base"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;