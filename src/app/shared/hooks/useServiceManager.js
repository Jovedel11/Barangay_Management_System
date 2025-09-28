import { useState, useCallback } from 'react';
import { mockServices } from '../mock-data/mock-service';

const useServiceManagement = () => {
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const createService = useCallback(async (serviceData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newService = {
        id: Date.now(),
        ...serviceData,
        addedBy: "Admin User",
        addedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalAppointments: 0,
        activeAppointments: 0,
        completedThisMonth: 0,
      };
      
      setServices(prev => [newService, ...prev]);
      return newService;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateService = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(prev => prev.map(service => 
        service.id === id 
          ? { 
              ...service, 
              ...updates, 
              lastUpdated: new Date().toISOString()
            }
          : service
      ));
      
      const updatedService = services.find(service => service.id === id);
      return { ...updatedService, ...updates };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services]);

  const deleteService = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(prev => prev.filter(service => service.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleServiceStatus = useCallback(async (id) => {
    const service = services.find(service => service.id === id);
    if (service) {
      return updateService(id, { isActive: !service.isActive });
    }
  }, [services, updateService]);

  const refreshServices = useCallback(() => {
    setError(null);
  }, []);

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
    refreshServices
  };
};

export default useServiceManagement;