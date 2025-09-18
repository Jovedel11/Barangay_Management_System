import React, { useState, useEffect } from "react";
import { useAuthActions } from "@/auth/hook/useAuthActions";

const UserManagement = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getPendingUsers, approveUser, rejectUser, canManageUsers } =
    useAuthActions();

  useEffect(() => {
    if (canManageUsers) {
      loadPendingUsers();
    }
  }, [canManageUsers]);

  const loadPendingUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPendingUsers();
      if (result.success) {
        setPendingUsers(result.data || []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    if (!confirm("Are you sure you want to approve this user?")) return;

    setLoading(true);
    const result = await approveUser(userId);

    if (result.success) {
      alert(result.message);
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleReject = async (userId) => {
    const reason = prompt("Please provide a reason for rejection (optional):");
    if (reason === null) return; // User cancelled

    setLoading(true);
    const result = await rejectUser(userId, reason);

    if (result.success) {
      alert(result.message);
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  if (!canManageUsers) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">
          Access denied. Admin privileges required.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No pending users found
                </td>
              </tr>
            ) : (
              pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.full_name || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {user.id.slice(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleApprove(user.id)}
                      disabled={loading}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      disabled={loading}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
