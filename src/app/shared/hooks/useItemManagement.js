import { useState, useCallback } from 'react';
import { itemsInventory as mockItemsInventory } from '../mock-data/mock-items';

const useItemManagement = () => {
  const [items, setItems] = useState(mockItemsInventory); // mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const createItem = useCallback(async (itemData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem = {
        id: Date.now(),
        ...itemData,
        addedBy: "Admin User",
        addedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        totalBookings: 0,
        activeBookings: 0,
        overdueBookings: 0,
        borrowed: itemData.total - itemData.available,
      };
      
      setItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              ...updates, 
              lastUpdated: new Date().toISOString(),
              borrowed: updates.total ? updates.total - updates.available : item.borrowed
            }
          : item
      ));
      
      const updatedItem = items.find(item => item.id === id);
      return { ...updatedItem, ...updates };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [items]);

  const deleteItem = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setItems(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleItemStatus = useCallback(async (id) => {
    const item = items.find(item => item.id === id);
    if (item) {
      return updateItem(id, { isActive: !item.isActive });
    }
  }, [items, updateItem]);

  const refreshItems = useCallback(() => {
    setError(null);
  }, []);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    toggleItemStatus,
    refreshItems
  };
};

export default useItemManagement;