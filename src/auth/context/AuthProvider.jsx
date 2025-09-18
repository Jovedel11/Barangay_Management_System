import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import supabase from "@/lib/supabaseClient";
import { authService } from "../hook/authService";

// user authentication and profile states
export const AUTH_STATES = {
  LOADING: "loading", // initial state, checking session
  UNAUTHENTICATED: "unauthenticated", // no session
  EMAIL_UNVERIFIED: "email_unverified", // signed up, needs email verification
  PROFILE_INCOMPLETE: "profile_incomplete", // email verified, needs profile creation
  PENDING_APPROVAL: "pending_approval", // profile created, awaiting admin approval
  ACTIVE: "active", // fully approved and active user
  REJECTED: "rejected", // admin rejected the application
  SUSPENDED: "suspended", // admin suspended the account
};

export const USER_ROLES = {
  ADMIN: "admin",
  RESIDENT: "resident",
};

// auth context default values
const AuthContext = createContext({
  // State
  user: null,
  session: null,
  profile: null,
  authState: AUTH_STATES.LOADING,
  loading: true,
  error: null,

  signUp: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginWithOtp: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
  createProfile: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refreshSession: () => Promise.resolve(),
  clearError: () => {},

  isAuthenticated: false,
  isAdmin: false,
  isActive: false,
  isPending: false,
  canAccess: () => false,
});

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    session: null,
    profile: null,
    authState: AUTH_STATES.LOADING,
    loading: true,
    error: null,
  });

  const mounted = useRef(true);

  const updateState = useCallback((updates) => {
    if (mounted.current) {
      setState((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  const setError = useCallback(
    (error) => {
      updateState({
        error: error?.message || error || null,
        loading: false,
      });
    },
    [updateState]
  );
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  const determineAuthState = useCallback((session, userData, profileData) => {
    if (!session) return AUTH_STATES.UNAUTHENTICATED;
    if (!session.user.email_confirmed_at) return AUTH_STATES.EMAIL_UNVERIFIED;
    if (!userData) return AUTH_STATES.PROFILE_INCOMPLETE;
    if (!profileData) return AUTH_STATES.PROFILE_INCOMPLETE;

    switch (userData.status) {
      case "pending":
        return AUTH_STATES.PENDING_APPROVAL;
      case "active":
        return AUTH_STATES.ACTIVE;
      case "rejected":
        return AUTH_STATES.REJECTED;
      case "suspended":
        return AUTH_STATES.SUSPENDED;
      default:
        return AUTH_STATES.PENDING_APPROVAL;
    }
  }, []);

  const loadUserData = useCallback(
    async (userId) => {
      try {
        updateState({ loading: true, error: null });

        const result = await authService.getCurrentUser();

        if (!result.success) {
          throw new Error(result.error || "Failed to load user data");
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        const authState = determineAuthState(
          session,
          result.data.user,
          result.data.profile
        );

        updateState({
          user: result.data.user,
          profile: result.data.profile,
          session,
          authState,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Load user data error:", error);
        setError(error);
      }
    },
    [updateState, setError, determineAuthState]
  );

  useEffect(() => {
    let authSubscription;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          updateState({
            authState: AUTH_STATES.UNAUTHENTICATED,
            loading: false,
          });
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state change:", event, session?.user?.id);

          if (!mounted.current) return;

          switch (event) {
            case "SIGNED_IN":
              if (session?.user) {
                await loadUserData(session.user.id);
              }
              break;
            case "SIGNED_OUT":
              updateState({
                user: null,
                profile: null,
                session: null,
                authState: AUTH_STATES.UNAUTHENTICATED,
                loading: false,
                error: null,
              });
              break;
            case "TOKEN_REFRESHED":
              if (session?.user) {
                await loadUserData(session.user.id);
              }
              break;
            default:
              break;
          }
        });

        authSubscription = subscription;
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError(error);
      }
    };

    initializeAuth();

    return () => {
      mounted.current = false;
      authSubscription?.unsubscribe();
    };
  }, [loadUserData, updateState, setError]);

  const signUp = useCallback(
    async (userData) => {
      updateState({ loading: true, error: null });

      const result = await authService.signUpWithEmail(userData);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      updateState({ loading: false });
      return result;
    },
    [updateState, setError]
  );

  const verifyEmail = useCallback(
    async (token) => {
      updateState({ loading: true, error: null });

      const result = await authService.verifyEmail(token);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      return result;
    },
    [updateState, setError]
  );

  const login = useCallback(
    async (email, password) => {
      updateState({ loading: true, error: null });

      const result = await authService.loginWithEmailPassword(email, password);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      return result;
    },
    [updateState, setError]
  );

  const loginWithOtp = useCallback(
    async (email) => {
      updateState({ loading: true, error: null });

      const result = await authService.loginWithEmailOtp(email);

      updateState({ loading: false });

      if (!result.success) {
        setError(result.error);
      }

      return result;
    },
    [updateState, setError]
  );

  const verifyOtp = useCallback(
    async (email, code) => {
      updateState({ loading: true, error: null });

      const result = await authService.verifyOtp(email, code);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      return result;
    },
    [updateState, setError]
  );

  const createProfile = useCallback(
    async (profileData) => {
      updateState({ loading: true, error: null });

      const result = await authService.createProfile(profileData);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserData(session.user.id);
      }

      return result;
    },
    [updateState, setError, loadUserData]
  );

  const updateProfile = useCallback(
    async (updates) => {
      updateState({ loading: true, error: null });

      const result = await authService.updateProfile(updates);

      if (!result.success) {
        setError(result.error);
        return result;
      }

      updateState({
        profile: { ...state.profile, ...result.data },
        loading: false,
      });

      return result;
    },
    [updateState, setError, state.profile]
  );

  const logout = useCallback(async () => {
    updateState({ loading: true, error: null });

    const result = await authService.logOut();

    if (!result.success) {
      setError(result.error);
    }

    return result;
  }, [updateState, setError]);

  const refreshSession = useCallback(async () => {
    const result = await authService.refreshSession();

    if (result.success && result.data?.session?.user) {
      await loadUserData(result.data.session.user.id);
    }

    return result;
  }, [loadUserData]);

  const isAuthenticated = state.session !== null;
  const isAdmin = state.user?.role === USER_ROLES.ADMIN;
  const isActive =
    state.user?.status === "active" && state.authState === AUTH_STATES.ACTIVE;
  const isPending =
    state.user?.status === "pending" ||
    state.authState === AUTH_STATES.PENDING_APPROVAL;

  const canAccess = useCallback(
    (permission) => {
      if (!isActive) return false;

      const adminPermissions = [
        "manage_users",
        "approve_requests",
        "view_analytics",
        "manage_inventory",
      ];
      const residentPermissions = [
        "create_requests",
        "view_own_data",
        "update_profile",
      ];

      if (isAdmin) {
        return (
          adminPermissions.includes(permission) ||
          residentPermissions.includes(permission)
        );
      }

      return residentPermissions.includes(permission);
    },
    [isActive, isAdmin]
  );

  const contextValue = {
    // State
    ...state,

    // Actions
    signUp,
    verifyEmail,
    login,
    loginWithOtp,
    verifyOtp,
    createProfile,
    updateProfile,
    logout,
    refreshSession,
    clearError,

    // Computed properties
    isAuthenticated,
    isAdmin,
    isActive,
    isPending,
    canAccess,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
