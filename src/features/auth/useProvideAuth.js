import { useState, useEffect } from 'react';
import { supabase, recordLogin } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasRecordedLogin, setHasRecordedLogin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          if (!hasRecordedLogin && currentUser.email) {
            try {
              await recordLogin(currentUser.email, import.meta.env.VITE_PUBLIC_APP_ENV);
              setHasRecordedLogin(true);
            } catch (error) {
              console.error('Failed to record login:', error);
              Sentry.captureException(error);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Sentry.captureException(error);
      } finally {
        setAuthLoading(false);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (!hasRecordedLogin && session.user.email) {
          recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
            .then(() => setHasRecordedLogin(true))
            .catch((error) => {
              console.error('Failed to record login:', error);
              Sentry.captureException(error);
            });
        }
      } else {
        setUser(null);
        setHasRecordedLogin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [hasRecordedLogin]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setHasRecordedLogin(false);
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

  return { user, authLoading, signOut };
}