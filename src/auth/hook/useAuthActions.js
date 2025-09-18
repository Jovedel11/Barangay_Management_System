import { useCallback } from 'react';
import { useAuth } from '../context/AuthProvider';
import { authService } from '../hook/authService';

export const useAuthActions = () => {
  const { user, isAdmin } = useAuth();

  const approveUser = useCallback(async (userId) => {
    if (!isAdmin) {
      throw new Error('Admin privileges required');
    }

    return await authService.approveUser(userId);
  }, [isAdmin]);

  const rejectUser = useCallback(async (userId, reason) => {
    if (!isAdmin) {
      throw new Error('Admin privileges required');
    }

    return await authService.rejectUser(userId, reason);
  }, [isAdmin]);

  const getPendingUsers = useCallback(async () => {
    if (!isAdmin) {
      throw new Error('Admin privileges required');
    }

    return await authService.getPendingUsers();
  }, [isAdmin]);

  return {
    approveUser,
    rejectUser,
    getPendingUsers,
    canManageUsers: isAdmin
  };
};