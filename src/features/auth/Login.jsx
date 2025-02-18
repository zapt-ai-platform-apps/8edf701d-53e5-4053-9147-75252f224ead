import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../../supabaseClient';

/**
 * Login component for user authentication.
 * Displays "Sign in with ZAPT" text and a link to ZAPT marketing site.
 * @returns {JSX.Element} Login component.
 */
export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">AI Friend in Your Pocket</h1>
      <p className="mb-2 font-medium">Sign in with ZAPT</p>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 text-blue-600 underline"
      >
        Visit ZAPT
      </a>
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: 'light' }}
          providers={['google', 'facebook', 'apple']}
        />
      </div>
    </div>
  );
}