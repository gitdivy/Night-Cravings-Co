import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MenuItem, fallbackMenuItems } from '../data';

export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Standardise categories (Burgers, Sandwiches, Fries, Maggi, Pizza, Beverages)
          const standardizeCategory = (cat: string) => {
            if (!cat) return 'Specials';
            const lower = cat.toLowerCase().trim();
            if (lower.includes('burger')) return 'Burgers';
            if (lower.includes('sandwich')) return 'Sandwiches';
            if (lower.includes('frie')) return 'Fries';
            if (lower.includes('maggi') || lower.includes('maggie')) return 'Maggi';
            if (lower.includes('pizza')) return 'Pizza';
            if (lower.includes('beverage') || lower.includes('drink')) return 'Beverages';
            return cat;
          };

          const formattedItems = data.map(item => ({
            id: String(item.id),
            name: item.name || '',
            price: item.price || 0,
            description: item.description || '',
            category: standardizeCategory(item.category),
            image: item.image || item.image_url || '',
            isPopular: item.isPopular || item.is_popular || false,
          }));

          console.log(`Total fetched items: ${formattedItems.length}`);
          const categoryCounts = formattedItems.reduce((acc: any, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {});
          console.log('Grouped category counts:', categoryCounts);

          setItems(formattedItems);
        } else {
          setItems([]);
        }
      } catch (err: any) {
        console.error('Error fetching menu items from Supabase:', err.message);
        setError(err.message);
        setItems([]); // Fallback on error to empty array
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return { items, loading, error };
}
