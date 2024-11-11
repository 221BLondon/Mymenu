import { RestaurantSettings } from "../types";


export const defaultSettings: RestaurantSettings = {
  name: "Tasty Bites",
  description: "Delicious food, delivered to your doorstep",
  logo: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  phone: "+1 (555) 123-4567",
  email: "contact@tastybites.com",
  address: "123 Foodie Street, Cuisine City, FC 12345",
  openingHours: {
    monday: { open: "09:00", close: "22:00" },
    tuesday: { open: "09:00", close: "22:00" },
    wednesday: { open: "09:00", close: "22:00" },
    thursday: { open: "09:00", close: "22:00" },
    friday: { open: "09:00", close: "23:00" },
    saturday: { open: "10:00", close: "23:00" },
    sunday: { open: "10:00", close: "22:00" }
  },
  socialLinks: {
    facebook: "https://facebook.com/tastybites",
    instagram: "https://instagram.com/tastybites",
    twitter: "https://twitter.com/tastybites",
    website: "https://tastybites.com"
  },
  offers: [
    {
      id: "1",
      title: "Happy Hour Special",
      description: "20% off on all main courses between 3 PM and 5 PM",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      code: "HAPPY20"
    },
    {
      id: "2",
      title: "Family Weekend",
      description: "Free dessert with family meals on weekends",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      code: "FAMSWEET"
    }
  ],
  locations: [
    {
      id: "1",
      name: "Downtown",
      address: "123 Foodie Street, Cuisine City, FC 12345",
      phone: "+1 (555) 123-4567",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: "2",
      name: "Uptown",
      address: "456 Gourmet Avenue, Cuisine City, FC 12346",
      phone: "+1 (555) 987-6543",
      coordinates: { lat: 40.7829, lng: -73.9654 }
    }
  ]
};