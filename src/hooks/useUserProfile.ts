
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useUserProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user) return;

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
    };

    fetchOrCreateProfile();
  }, [user]);

  return profile;
};
