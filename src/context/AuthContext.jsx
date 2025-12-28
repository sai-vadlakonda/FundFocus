import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Auto-login when app reloads
    useEffect(() => {
        const storedUser = localStorage.getItem("focusfund_user");
        const token = localStorage.getItem("focusfund_token");

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 📝 Register
    const register = async (username, password, role, parentCode) => {
        await axios.post(`${API_URL}/register`, {
            username,
            password,
            role,
            parentCode,
        });
    };

    // 🔐 Login
    const login = async (username, password) => {
        const res = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });

        const { token, role, userId } = res.data;

        const userData = { username, role, id: userId };

        localStorage.setItem("focusfund_token", token);
        localStorage.setItem("focusfund_user", JSON.stringify(userData));

        setUser(userData);
    };


    // 🚪 Logout
    const logout = () => {
        localStorage.removeItem("focusfund_token");
        localStorage.removeItem("focusfund_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
