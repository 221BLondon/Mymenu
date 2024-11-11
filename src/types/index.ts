export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    images: string[];
    video?: string;
    ingredients: string[];
    allergens: string[];
    category: string;
    spicyLevel?: 1 | 2 | 3;
    dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
    comment?: string;
  }
  
  export interface Order {
    id: string;
    customerName: string;
    items: CartItem[];
    total: number;
    date: Date;
  }
  
  export interface RestaurantSettings {
    name: string;
    description: string;
    logo: string;
    phone: string;
    email: string;
    address: string;
    openingHours: {
      [key: string]: { open: string; close: string };
    };
    socialLinks: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      website?: string;
    };
    offers: {
      id: string;
      title: string;
      description: string;
      validUntil: string;
      image?: string;
      code?: string;
    }[];
    locations: {
      id: string;
      name: string;
      address: string;
      phone: string;
      coordinates: { lat: number; lng: number };
    }[];
  }