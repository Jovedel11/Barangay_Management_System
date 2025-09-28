import { useState, useCallback } from 'react';
import { itemBookings as mockItemBookings } from '../mock-data/mock-items';

const useItemBookings = () => {
  const [bookings, setBookings] = useState(mockItemBookings); // mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const updateBookingStatus = useCallback(async (id, statusData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookings(prev => prev.map(booking => 
        booking.id === id 
          ? { 
              ...booking, 
              ...statusData,
              processedBy: "Admin User",
              processedDate: new Date().toISOString()
            }
          : booking
      ));
      
      const updatedBooking = bookings.find(booking => booking.id === id);
      return { ...updatedBooking, ...statusData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [bookings]);

  const cancelBooking = useCallback(async (id, reason) => {
    return updateBookingStatus(id, { 
      status: 'cancelled', 
      notes: reason || 'Booking cancelled by admin' 
    });
  }, [updateBookingStatus]);

  const approveBooking = useCallback(async (id, notes) => {
    return updateBookingStatus(id, { 
      status: 'confirmed', 
      notes: notes || 'Booking approved' 
    });
  }, [updateBookingStatus]);

  const markAsReturned = useCallback(async (id, returnDate, notes) => {
    return updateBookingStatus(id, { 
      status: 'returned',
      actualReturnDate: returnDate || new Date().toISOString().split('T')[0],
      notes: notes || 'Item returned successfully'
    });
  }, [updateBookingStatus]);

  const refreshBookings = useCallback(() => {
    setError(null);
  }, []);

  return {
    bookings,
    loading,
    error,
    updateBookingStatus,
    cancelBooking,
    approveBooking,
    markAsReturned,
    refreshBookings
  };
};

export default useItemBookings;