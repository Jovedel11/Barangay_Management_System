import { useState, useCallback } from 'react';
import { barangayEvents } from '../mock-data/mock-events';

const useEventManagement = () => {
  const [events, setEvents] = useState(barangayEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent = {
        id: Date.now(),
        ...eventData,
        createdBy: "Admin User",
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalRegistrations: 0,
        confirmedRegistrations: 0,
        pendingRegistrations: 0,
        budget: eventData.budget || "₱0",
        isActive: true,
      };
      
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.map(event => 
        event.id === id 
          ? { 
              ...event, 
              ...updates, 
              lastUpdated: new Date().toISOString()
            }
          : event
      ));
      
      const updatedEvent = events.find(event => event.id === id);
      return { ...updatedEvent, ...updates };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [events]);

  const deleteEvent = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prev => prev.filter(event => event.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleEventStatus = useCallback(async (id) => {
    const event = events.find(event => event.id === id);
    if (event) {
      return updateEvent(id, { isActive: !event.isActive });
    }
  }, [events, updateEvent]);

  const updateEventStatus = useCallback(async (id, status) => {
    return updateEvent(id, { status });
  }, [updateEvent]);

  const toggleFeaturedStatus = useCallback(async (id) => {
    const event = events.find(event => event.id === id);
    if (event) {
      return updateEvent(id, { featured: !event.featured });
    }
  }, [events, updateEvent]);

  const refreshEvents = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleEventStatus,
    updateEventStatus,
    toggleFeaturedStatus,
    refreshEvents
  };
};

export default useEventManagement;