import { useState, useEffect, createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { User } from "@/types";
import { userCtrl } from "@/api/user";
import { IAuthResponse } from "@/types/AuthResponse";


interface AuthContextData {
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => void;
  updateUser: (key: string, value: any) => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
});


interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  //const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await login();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const login = async () => {
    try {
      const response = await userCtrl.me();
      setUser(response);
      console.log("response", JSON.stringify(response));
      setIsAdmin(response.isAdmin === true);
      setLoading(false);
      return response;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    //authCtrl.logout();
    router.push("/");
  };

  const updateUser = (key: string, value: any) => {
    setUser((prevUser:any) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const data: AuthContextData = {
    user,
    isAdmin,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
