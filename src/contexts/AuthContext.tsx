import { useState, useEffect, createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { userCtrl } from "@/api/user";
import { IAuthResponse } from "@/types/AuthResponse";
import { UserResponse } from "@/types/user.response";


interface AuthContextData {
  user: UserResponse | null;
  isAdmin: boolean;
  isSeller: boolean;
  login: () => Promise<void>;
  logout: () => void;
  updateUser: (key: string, value: any) => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isAdmin: false,
  isSeller: false,
  login: async () => { },
  logout: () => { },
  updateUser: () => { },
});


interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  //const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
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
      const isAdmin = response.roles.some((role) => role === "ROLE_ADMIN");
      const isSeller = response.roles.some((role) => role === "ROLE_SELLER");

      setIsAdmin(isAdmin);
      setIsSeller(isSeller);
      console.log("IS_ADMIN", isAdmin)
      console.log("IS_SELLER", isSeller)

      setLoading(false);

      return response;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    
    router.push("/");
  };

  const updateUser = (key: string, value: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const data: AuthContextData = {
    user,
    isAdmin,
    isSeller,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
