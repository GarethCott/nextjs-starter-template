/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Amplify } from 'aws-amplify';
import {
  confirmResetPassword,
  confirmSignUp,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { amplifyConfig } from '@/utils/amplify-config';

// Configure Amplify
Amplify.configure(amplifyConfig, {
  ssr: true,
});

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (code: string, newPassword: string) => Promise<any>;
  confirmSignUp: (email: string, code: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    if (isSignedIn) {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    }

    return nextStep;
  };

  const handleSignUp = async (email: string, password: string) => {
    return signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleForgotPassword = async (email: string) => {
    return resetPassword({ username: email });
  };

  const handleResetPassword = async (code: string, newPassword: string) => {
    return confirmResetPassword({
      username: user?.username || '',
      confirmationCode: code,
      newPassword,
    });
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    return confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  };

  const value = {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    confirmSignUp: handleConfirmSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
