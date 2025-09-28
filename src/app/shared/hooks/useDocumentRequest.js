import { useState, useCallback } from 'react';
import { mockDocumentRequests } from '../mock-data/mock-documents';

const useDocumentRequests = () => {
  const [requests, setRequests] = useState(mockDocumentRequests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const updateRequestStatus = useCallback(async (id, statusData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => prev.map(request => 
        request.id === id 
          ? { 
              ...request, 
              ...statusData,
              processedBy: "Admin User",
              processedDate: new Date().toISOString()
            }
          : request
      ));
      
      const updatedRequest = requests.find(request => request.id === id);
      return { ...updatedRequest, ...statusData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [requests]);

  const approveRequest = useCallback(async (id, notes) => {
    return updateRequestStatus(id, { 
      status: 'processing', 
      notes: notes || 'Request approved and processing started' 
    });
  }, [updateRequestStatus]);

  const rejectRequest = useCallback(async (id, reason) => {
    return updateRequestStatus(id, { 
      status: 'rejected', 
      notes: reason || 'Request rejected by admin' 
    });
  }, [updateRequestStatus]);

  const markAsReady = useCallback(async (id, notes) => {
    return updateRequestStatus(id, { 
      status: 'ready_for_pickup',
      notes: notes || 'Document ready for pickup'
    });
  }, [updateRequestStatus]);

  const markAsOutForDelivery = useCallback(async (id, notes) => {
    return updateRequestStatus(id, { 
      status: 'out_for_delivery',
      notes: notes || 'Document out for delivery'
    });
  }, [updateRequestStatus]);

  const markAsCompleted = useCallback(async (id, notes) => {
    return updateRequestStatus(id, { 
      status: 'completed',
      notes: notes || 'Document successfully delivered/picked up'
    });
  }, [updateRequestStatus]);

  const deleteRequest = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => prev.filter(request => request.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshRequests = useCallback(() => {
    setError(null);
  }, []);

  return {
    requests,
    loading,
    error,
    updateRequestStatus,
    approveRequest,
    rejectRequest,
    markAsReady,
    markAsOutForDelivery,
    markAsCompleted,
    deleteRequest,
    refreshRequests
  };
};

export default useDocumentRequests;