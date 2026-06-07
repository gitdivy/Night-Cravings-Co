import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface StoreSettings {
  store_open: boolean;
  minimum_order: number;
  free_delivery_threshold: number;
  delivery_fee_small: number;
  delivery_fee_medium: number;
}

const defaultSettings: StoreSettings = {
  store_open: false,
  minimum_order: 149,
  free_delivery_threshold: 249,
  delivery_fee_small: 49,
  delivery_fee_medium: 29
};

export function useStoreSettings() {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch from database
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from('store_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error("Error fetching store settings:", error.message);
          return;
        }

        if (data) {
          console.log("Fetched new store settings:", data);
          setSettings({
            store_open: data.store_open,
            minimum_order: data.minimum_order,
            free_delivery_threshold: data.free_delivery_threshold,
            delivery_fee_small: data.delivery_fee_small,
            delivery_fee_medium: data.delivery_fee_medium
          });
        }
      } catch (err) {
        console.error("Unexpected error fetching store settings:", err);
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch
    fetchSettings();

    // Fallback polling (every 30 seconds) in case Realtime fails
    const pollInterval = setInterval(fetchSettings, 30000);

    // Subscribe to real-time changes on store_settings
    const channel = supabase
      .channel('store_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'store_settings',
        },
        (payload) => {
          console.log('Store settings changed realtime event:', payload);
          // Always re-fetch to ensure we get the full, correct row data 
          // (mitigates issues if Replica Identity isn't FULL)
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  return { settings, loading };
}
