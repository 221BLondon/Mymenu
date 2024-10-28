import React from 'react';
import { Trash2, ChevronDown, ChevronUp, Clock, User, Receipt, Package } from 'lucide-react';
import { Order } from '../App';

interface OrdersPageProps {
  orders: Order[];
  onDeleteOrder: (orderId: string) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onDeleteOrder }) => {
  const [expandedOrders, setExpandedOrders] = React.useState<Set<string>>(new Set());

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex h-12 w-12 rounded-full bg-red-50 items-center justify-center">
                    <Receipt size={24} className="text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <h3 className="text-lg font-semibold">{order.customerName}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock size={14} />
                      <p>{formatTime(order.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-red-600 text-lg">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.reduce((sum:any, item:any) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteOrder(order.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedOrders.has(order.id) && (
                <div className="border-t border-gray-100">
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">
                      Ordered on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {order.items.map((item:any) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-4">
                            <div className="relative group">
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Quantity: {item.quantity}
                              </p>
                              {item.comment && (
                                <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                                  {item.comment}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Items</p>
                        <p className="font-medium">
                          {order.items.reduce((sum:any, item:any) => sum + item.quantity, 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Total</p>
                        <p className="text-xl font-bold text-red-600">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;