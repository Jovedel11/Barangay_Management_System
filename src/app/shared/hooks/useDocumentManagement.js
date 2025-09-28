import { useState, useCallback } from 'react';
import { mockDocumentTypes } from '../mock-data/mock-documents';

const useDocumentManagement = () => {
  const [documentTypes, setDocumentTypes] = useState(mockDocumentTypes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace mock functions with real API calls

  // Mock functions that will be replaced with API calls
  const createDocumentType = useCallback(async (docTypeData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocumentType = {
        id: Date.now(),
        ...docTypeData,
        totalRequests: 0,
        pendingRequests: 0,
        createdBy: "Admin User",
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      
      setDocumentTypes(prev => [newDocumentType, ...prev]);
      return newDocumentType;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDocumentType = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocumentTypes(prev => prev.map(docType => 
        docType.id === id 
          ? { 
              ...docType, 
              ...updates, 
              lastUpdated: new Date().toISOString()
            }
          : docType
      ));
      
      const updatedDocType = documentTypes.find(docType => docType.id === id);
      return { ...updatedDocType, ...updates };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documentTypes]);

  const deleteDocumentType = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocumentTypes(prev => prev.filter(docType => docType.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleDocumentTypeStatus = useCallback(async (id) => {
    const docType = documentTypes.find(docType => docType.id === id);
    if (docType) {
      return updateDocumentType(id, { isActive: !docType.isActive });
    }
  }, [documentTypes, updateDocumentType]);

  const refreshDocumentTypes = useCallback(() => {
    setError(null);
  }, []);

  return {
    documentTypes,
    loading,
    error,
    createDocumentType,
    updateDocumentType,
    deleteDocumentType,
    toggleDocumentTypeStatus,
    refreshDocumentTypes
  };
};

export default useDocumentManagement;