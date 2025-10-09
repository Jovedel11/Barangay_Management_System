import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      customRequest({
        path: "/api/auth/check-session",
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading && data?.response?.user) {
      setUser(data.response.user);
    }
  }, [data, isLoading]);

  return (
    <AuthContext.Provider value={{ user, refetch, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export { useAuth, AuthProvider };
