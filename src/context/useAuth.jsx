import { useContext } from "react";
import { AuthContext } from "./authContextStore.js";

export function useAuth() {
  return useContext(AuthContext);
}
