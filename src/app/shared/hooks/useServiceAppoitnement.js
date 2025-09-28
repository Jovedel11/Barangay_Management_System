import { useState, useCallback } from 'react';
import { mockServiceAppointments } from '../mock-data/mock-service';

const useServiceAppointments = () => {
  const [appointments, setAppointments] = useState(mockServiceAppointments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const updateAppointmentStatus = useCallback(async (id, statusData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAppointments(prev => prev.map(appointment => 
        appointment.id === id 
          ? { 
              ...appointment, 
              ...statusData,
              processedBy: "Admin User",
              processedDate: new Date().toISOString()
            }
          : appointment
      ));
      
      const updatedAppointment = appointments.find(appointment => appointment.id === id);
      return { ...updatedAppointment, ...statusData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [appointments]);

  const approveAppointment = useCallback(async (id, notes) => {
    return updateAppointmentStatus(id, { 
      status: 'confirmed', 
      notes: notes || 'Appointment approved' 
    });
  }, [updateAppointmentStatus]);

  const cancelAppointment = useCallback(async (id, reason) => {
    return updateAppointmentStatus(id, { 
      status: 'cancelled', 
      notes: reason || 'Appointment cancelled by admin' 
    });
  }, [updateAppointmentStatus]);

  const markAsCompleted = useCallback(async (id, notes) => {
    return updateAppointmentStatus(id, { 
      status: 'completed',
      notes: notes || 'Service completed successfully'
    });
  }, [updateAppointmentStatus]);

  const markAsNoShow = useCallback(async (id, notes) => {
    return updateAppointmentStatus(id, { 
      status: 'no_show',
      notes: notes || 'Resident did not show up for appointment'
    });
  }, [updateAppointmentStatus]);

  const rescheduleAppointment = useCallback(async (id, newDate, newTime, notes) => {
    return updateAppointmentStatus(id, { 
      appointmentDate: newDate,
      appointmentTime: newTime,
      notes: notes || 'Appointment rescheduled'
    });
  }, [updateAppointmentStatus]);

  const deleteAppointment = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAppointments = useCallback(() => {
    setError(null);
  }, []);

  return {
    appointments,
    loading,
    error,
    updateAppointmentStatus,
    approveAppointment,
    cancelAppointment,
    markAsCompleted,
    markAsNoShow,
    rescheduleAppointment,
    deleteAppointment,
    refreshAppointments
  };
};

export default useServiceAppointments;