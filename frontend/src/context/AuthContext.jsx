import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      try {
        const { data } = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "LOGIN", payload: data });
      } catch (err) {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", payload: data });
      return data;
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response?.data?.message || "Login failed",
      });
      throw err;
    }
  };

  const register = async (userData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await axios.post("/api/auth/register", userData);
      localStorage.setItem("token", data.token);
      dispatch({ type: "REGISTER", payload: data });
      return data;
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response?.data?.message || "Registration failed",
      });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = async (userData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("/api/users/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "UPDATE_PROFILE", payload: data });
      return data;
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response?.data?.message || "Profile update failed",
      });
      throw err;
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
