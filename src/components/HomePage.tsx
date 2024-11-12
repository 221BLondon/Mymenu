import React from 'react';
import { 
  Utensils, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Globe,
  ChevronRight
} from 'lucide-react';
import { RestaurantSettings } from '../types';

interface HomePageProps {
  settings: RestaurantSettings;
}

const HomePage: React.FC<HomePageProps> = ({ settings }) => {
  const getCurrentDayHours = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return settings.openingHours[today];
  };

  const isCurrentlyOpen = () => {
    const hours = getCurrentDayHours();
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const openTime = parseInt(hours.open.replace(':', ''));
    const closeTime = parseInt(hours.close.replace(':', ''));
    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
          alt="Restaurant hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{settings.name}</h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">{settings.description}</p>
          </div>
        </div>
      </div>

      {/* Status and Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock size={24} className="text-red-600" />
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isCurrentlyOpen() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCurrentlyOpen() ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Today's Hours</h3>
          <p className="text-gray-600">
            {getCurrentDayHours().open} - {getCurrentDayHours().close}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <Phone size={24} className="text-red-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Phone</h3>
          <a 
            href={`tel:${settings.phone}`} 
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            {settings.phone}
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <Mail size={24} className="text-red-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <a 
            href={`mailto:${settings.email}`}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            {settings.email}
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <MapPin size={24} className="text-red-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <p className="text-gray-600">{settings.address}</p>
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.offers.map((offer) => (
            <div 
              key={offer.id}
              className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {offer.image && (
                <div className="relative h-48">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
                  </div>
                </div>
              )}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  {offer.code && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Code: {offer.code}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.locations.map((location) => (
            <div 
              key={location.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-start">
                  <MapPin size={20} className="mr-2 flex-shrink-0 text-red-600" />
                  {location.address}
                </p>
                <p className="flex items-center">
                  <Phone size={20} className="mr-2 text-red-600" />
                  {location.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {settings.socialLinks.facebook && (
            <a
              href={settings.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Facebook size={24} className="text-blue-600 mr-3" />
              <span className="text-gray-600 group-hover:text-gray-900">Facebook</span>
              <ChevronRight size={20} className="ml-auto text-gray-400 group-hover:text-gray-600" />
            </a>
          )}
          {settings.socialLinks.instagram && (
            <a
              href={settings.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Instagram size={24} className="text-pink-600 mr-3" />
              <span className="text-gray-600 group-hover:text-gray-900">Instagram</span>
              <ChevronRight size={20} className="ml-auto text-gray-400 group-hover:text-gray-600" />
            </a>
          )}
          {settings.socialLinks.twitter && (
            <a
              href={settings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Twitter size={24} className="text-blue-400 mr-3" />
              <span className="text-gray-600 group-hover:text-gray-900">Twitter</span>
              <ChevronRight size={20} className="ml-auto text-gray-400 group-hover:text-gray-600" />
            </a>
          )}
          {settings.socialLinks.website && (
            <a
              href={settings.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Globe size={24} className="text-gray-600 mr-3" />
              <span className="text-gray-600 group-hover:text-gray-900">Website</span>
              <ChevronRight size={20} className="ml-auto text-gray-400 group-hover:text-gray-600" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;