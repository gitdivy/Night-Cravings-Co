import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Combo } from '../data';

export function useCombos() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCombos() {
      try {
        const { data, error } = await supabase
          .from("combo's")
          .select('*')
          .eq('active', true);

        if (error) {
          console.error('Error fetching combos:', error);
          return;
        }

        if (data && data.length > 0) {
          const formattedCombos = data.map((item, index) => ({
            id: String(item.id),
            name: item.title || '',
            price: item.price || 0,
            description: item.description || '',
            items: item.items || [],
            image: item.image_url || '',
            label: item.label || 'Trending',
          }));
          setCombos(formattedCombos);
        }
      } catch (err) {
        console.error('Failed to fetch combos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCombos();

    const channel = supabase
      .channel('combos_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: "combo's" },
        () => {
          fetchCombos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { combos, loading };
}
