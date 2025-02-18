'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode<User>(token);
                    const currentTime = Date.now() / 1000;
                    if ((decoded as any).exp && (decoded as any).exp < currentTime) {
                        await logout();
                    } else {
                        setUser(decoded);
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    await logout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (token: string) => {
        try {
            const decoded = jwtDecode<User>(token);
            localStorage.setItem('token', token);
            setUser(decoded);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid token provided');
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        setUser,
        login,
        logout,
        isLoading
    };

    if (isLoading) {
        return null; 
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};