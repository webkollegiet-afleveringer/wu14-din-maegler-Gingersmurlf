import { useMemo, useState } from "react";
import { AuthContext } from "./authContextStore.js";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("dinmaegler_logged_in") === "true";
  });
  const [favoriteIds, setFavoriteIds] = useState(() => {
    return JSON.parse(localStorage.getItem("dinmaegler_favorites") || "[]");
  });

  const login = () => {
    localStorage.setItem("dinmaegler_logged_in", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem("dinmaegler_logged_in", "false");
    setIsLoggedIn(false);
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((current) => {
      const exists = current.includes(id);
      const updated = exists ? current.filter((currentId) => currentId !== id) : [...current, id];
      localStorage.setItem("dinmaegler_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const value = useMemo(() => ({
    isLoggedIn,
    favoriteIds,
    login,
    logout,
    toggleFavorite,
  }), [isLoggedIn, favoriteIds]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
