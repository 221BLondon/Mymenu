import React from 'react';
import { Utensils } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <Utensils size={64} className="mx-auto text-red-600 mb-4" />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Tasty Bites</h1>
      <p className="text-lg sm:text-xl mb-8">Delicious food, delivered to your doorstep</p>
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Delicious food spread"
        className="rounded-lg shadow-lg mx-auto mb-8 w-full max-w-2xl"
      />
      <p className="text-base sm:text-lg mb-4">
        Explore our menu and place your order for a culinary adventure!
      </p>
    </div>
  );
};

export default HomePage;