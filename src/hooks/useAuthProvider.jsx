import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const RolePath = useMemo(
    () => ({
      resident: () => navigate("/resident/dashboard"),
      admin: () => navigate("/admin/dashboard"),
      default: () => navigate("/login"),
    }),
    [navigate]
  );

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
      if (user) return;
      const currentUser = data.response.user;
      setUser(currentUser);

      if (currentUser?.role && !location.pathname.includes("signup")) {
        return RolePath[currentUser.role ?? "default"]();
      }
    }
  }, [data, isLoading, RolePath, location, user]);

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
