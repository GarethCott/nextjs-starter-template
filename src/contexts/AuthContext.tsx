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

import logger from '@/lib/logger';

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
  resetPassword: (
    email: string,
    code: string,
    newPassword: string,
  ) => Promise<any>;
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
      logger.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(email: string, password: string) {
    const result = await signIn({ username: email, password });
    await checkUser();
    return result;
  }

  async function handleSignUp(email: string, password: string) {
    return signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
  }

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      logger.error('Error signing out:', error);
      throw error;
    }
  }

  async function handleForgotPassword(email: string) {
    return resetPassword({ username: email });
  }

  async function handleResetPassword(
    email: string,
    code: string,
    newPassword: string,
  ) {
    return confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  }

  async function handleConfirmSignUp(email: string, code: string) {
    return confirmSignUp({ username: email, confirmationCode: code });
  }

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
