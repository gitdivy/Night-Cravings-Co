export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isPopular?: boolean;
}

export interface Combo {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  image: string;
  label: string;
}

export const CATEGORIES = ['All', 'Burgers', 'Sandwiches', 'Fries', 'Maggi', 'Pizza', 'Beverages'];

export const fallbackMenuItems: MenuItem[] = [
  // Burgers
  {
    id: 'b1',
    name: 'Veg Crispy Burger',
    price: 99,
    description: 'Crunchy, satisfying, and completely worth the guilt.',
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  },
  {
    id: 'b2',
    name: 'Cheese Burst Veg Burger',
    price: 149,
    description: 'Because regular amounts of cheese simply aren\'t enough.',
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    isPopular: true,
  },
  // Sandwiches
  {
    id: 's1',
    name: 'Veg Grilled Sandwich',
    price: 109,
    description: 'Ol\' reliable. Never fails you.',
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
  },
  {
    id: 's2',
    name: 'Paneer Grill Sandwich',
    price: 149,
    description: 'Protein, but make it a midnight snack.',
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
  },
  // Fries
  {
    id: 'f1',
    name: 'French Fries',
    price: 79,
    description: 'The universal language of late-night cravings.',
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1576107246549-fb24009a7b53?w=400&q=80',
  },
  {
    id: 'f2',
    name: 'Peri Peri Fries',
    price: 99,
    description: 'Spicy potato sticks of absolute joy.',
    category: 'Fries',
    image: 'https://images.unsplash.com/photo-1576107246549-fb24009a7b53?w=400&q=80',
    isPopular: true,
  },
  // Maggi
  {
    id: 'm1',
    name: 'Classic Plain Maggi',
    price: 69,
    description: '2 minutes? Try 2 AM.',
    category: 'Maggi',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe01f7c8ec1?w=400&q=80',
  },
  {
    id: 'm2',
    name: 'Cheese Maggi',
    price: 89,
    description: 'Cheese heals emotional damage.',
    category: 'Maggi',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe01f7c8ec1?w=400&q=80',
    isPopular: true,
  },
  // Pizza
  {
    id: 'p1',
    name: 'Veg Delight Mini Pizza',
    price: 129,
    description: 'Just a little slice of heaven.',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  },
  {
    id: 'p2',
    name: 'Cheese Burst Mini Pizza',
    price: 149,
    description: 'Diet starts tomorrow. Promise.',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  },
  // Beverages
  {
    id: 'bev1',
    name: 'Special Night Tea',
    price: 20,
    description: 'Keeping you awake since right now.',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
  },
  {
    id: 'bev2',
    name: 'Sprite',
    price: 40,
    description: 'Crisp spicy water.',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80',
  },
];
