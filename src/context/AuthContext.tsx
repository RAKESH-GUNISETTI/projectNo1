import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  credits: number;
  is_premium: boolean;
};

interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bytebolt_user';
const PROFILE_STORAGE_KEY = 'bytebolt_profile';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing user and profile in localStorage
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setProfile(parsedProfile);
        } else {
          // Create a default profile if none exists
          const defaultProfile: Profile = {
            id: parsedUser.id,
            username: parsedUser.username || parsedUser.email.split('@')[0],
            avatar_url: null,
            credits: 0,
            is_premium: false
          };
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
          setProfile(defaultProfile);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!profile) {
        throw new Error('No profile found');
      }

      const updatedProfile = {
        ...profile,
        ...updates
      };

      // Update localStorage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);

      // Update user if username was changed
      if (updates.username && user) {
        const updatedUser = {
          ...user,
          username: updates.username
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simple validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Simple email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll create a simple user object
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username: email.split('@')[0],
        created_at: new Date().toISOString()
      };

      // Store user in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      
      // Create or load profile
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        const defaultProfile: Profile = {
          id: userData.id,
          username: userData.username,
          avatar_url: null,
          credits: 0,
          is_premium: false
        };
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
        setProfile(defaultProfile);
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      setIsLoading(true);
      
      // Simple validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Simple email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Simple password validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll create a simple user object
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username: username || email.split('@')[0],
        created_at: new Date().toISOString()
      };

      // Store user in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      
      // Create a default profile
      const defaultProfile: Profile = {
        id: userData.id,
        username: userData.username,
        avatar_url: null,
        credits: 0,
        is_premium: false
      };
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
      setProfile(defaultProfile);

      toast({
        title: "Account created!",
        description: "You've successfully signed up.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message || "Please try again with a different email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Remove user and profile from localStorage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setUser(null);
      setProfile(null);
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
