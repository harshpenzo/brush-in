
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { createClient } from '@supabase/supabase-js';

// Set fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useUserProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          // Create profile if not exists
          const newProfile = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.fullName || user.firstName || 'User',
              last_login: new Date().toISOString()
            })
            .select()
            .single();

          setProfile(newProfile.data);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching or creating profile:", error);
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  return profile;
};
