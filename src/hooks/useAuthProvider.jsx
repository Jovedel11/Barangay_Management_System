import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const publicRoutes = useMemo(() => ["/login", "/signup"], []);

  const roleBasePaths = useMemo(
    () => ({
      resident: "/resident",
      admin: "/admin",
    }),
    []
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
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    const currentPath = location.pathname;
    const currentUser = data?.response?.user;
    if (currentUser && !user) {
      setUser(currentUser);
    } else if (!currentUser && user) {
      setUser(null);
    }
    if (!currentUser) {
      if (
        !publicRoutes.includes(currentPath) &&
        !currentPath.includes("/signup")
      ) {
        navigate("/login", { replace: true });
      }
    } else {
      const userRole = currentUser.role;
      const userBasePath = roleBasePaths[userRole];
      if (publicRoutes.includes(currentPath)) {
        navigate(`${userBasePath}/dashboard`, { replace: true });
        return;
      }
      if (userRole === "admin" && currentPath.startsWith("/resident")) {
        navigate("/admin/dashboard", { replace: true });
      } else if (userRole === "resident" && currentPath.startsWith("/admin")) {
        navigate("/resident/dashboard", { replace: true });
      }
      if (currentPath === "/" || currentPath === "") {
        navigate(`${userBasePath}/dashboard`, { replace: true });
      }
    }
  }, [
    data,
    isLoading,
    location.pathname,
    navigate,
    publicRoutes,
    roleBasePaths,
    user,
  ]);

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
