import { useState, useCallback } from 'react';
import { eventRegistrations } from '../mock-data/mock-events';

const useEventRegistrations = () => {
  const [registrations, setRegistrations] = useState(eventRegistrations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const updateRegistrationStatus = useCallback(async (id, statusData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegistrations(prev => prev.map(registration => 
        registration.id === id 
          ? { 
              ...registration, 
              ...statusData,
              processedBy: "Admin User",
              processedDate: new Date().toISOString()
            }
          : registration
      ));
      
      const updatedRegistration = registrations.find(registration => registration.id === id);
      return { ...updatedRegistration, ...statusData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [registrations]);

  const approveRegistration = useCallback(async (id, notes) => {
    return updateRegistrationStatus(id, { 
      status: 'confirmed', 
      notes: notes || 'Registration approved' 
    });
  }, [updateRegistrationStatus]);

  const rejectRegistration = useCallback(async (id, reason) => {
    return updateRegistrationStatus(id, { 
      status: 'cancelled', 
      notes: reason || 'Registration rejected by admin' 
    });
  }, [updateRegistrationStatus]);

  const markAsCompleted = useCallback(async (id, notes) => {
    return updateRegistrationStatus(id, { 
      status: 'completed',
      notes: notes || 'Event participation completed'
    });
  }, [updateRegistrationStatus]);

  const updatePaymentStatus = useCallback(async (id, paymentStatus, notes) => {
    return updateRegistrationStatus(id, { 
      paymentStatus,
      notes: notes || `Payment status updated to ${paymentStatus}`
    });
  }, [updateRegistrationStatus]);

  const deleteRegistration = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegistrations(prev => prev.filter(registration => registration.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshRegistrations = useCallback(() => {
    setError(null);
  }, []);

  return {
    registrations,
    loading,
    error,
    updateRegistrationStatus,
    approveRegistration,
    rejectRegistration,
    markAsCompleted,
    updatePaymentStatus,
    deleteRegistration,
    refreshRegistrations
  };
};

export default useEventRegistrations;