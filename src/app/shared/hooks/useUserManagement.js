import { useState, useEffect, useCallback } from 'react';
import { mockResidents, mockPendingSignups } from '@/app/shared/mock-data/mock-users';

export const useManageUsers = () => {
  // State management
  const [residents, setResidents] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingSignups, setPendingSignups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAge, setFilterAge] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [activeTab, setActiveTab] = useState('residents');

  // API integration functions
  const fetchResidents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock API simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setResidents(mockResidents);
      
      // Generate users from residents with accounts
      const registeredUsers = mockResidents
        .filter(resident => resident.hasAccount)
        .map(resident => ({
          ...resident,
          userId: `USER-${resident.id}`,
          username: resident.email?.split('@')[0] || `user${resident.id}`,
          role: 'resident',
          accountCreated: resident.registeredDate,
          lastLogin: '2024-01-20T08:30:00Z',
          loginCount: Math.floor(Math.random() * 100) + 10,
          isEmailVerified: true,
          isTwoFactorEnabled: false,
          permissions: [
            'view_events',
            'request_documents',
            'book_services',
            'borrow_items'
          ]
        }));
      
      setUsers(registeredUsers);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching residents:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPendingSignups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      
      // Mock API simulation
      await new Promise(resolve => setTimeout(resolve, 300));
      setPendingSignups(mockPendingSignups);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pending signups:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // CRUD Operations
  const createResident = useCallback(async (residentData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newResident = {
        ...residentData,
        id: residents.length + 1,
        fullName: `${residentData.firstName} ${residentData.middleName} ${residentData.lastName}`,
        age: calculateAge(residentData.dateOfBirth),
        hasAccount: false,
        accountStatus: null,
        registeredDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      setResidents(prev => [...prev, newResident]);
      return newResident;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [residents.length]);

  const updateResident = useCallback(async (id, residentData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedResident = {
        ...residentData,
        id,
        fullName: `${residentData.firstName} ${residentData.middleName} ${residentData.lastName}`,
        age: calculateAge(residentData.dateOfBirth),
        lastUpdated: new Date().toISOString()
      };
      
      setResidents(prev => prev.map(resident => 
        resident.id === id ? updatedResident : resident
      ));
      
      // Update users if resident has account
      if (updatedResident.hasAccount) {
        setUsers(prev => prev.map(user => 
          user.id === id ? { ...user, ...updatedResident } : user
        ));
      }
      
      return updatedResident;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteResident = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResidents(prev => prev.filter(resident => resident.id !== id));
      setUsers(prev => prev.filter(user => user.id !== id));
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId, userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prev => prev.map(user => 
        user.userId === userId ? { ...user, ...userData, lastUpdated: new Date().toISOString() } : user
      ));
      
      // Also update resident data
      const user = users.find(u => u.userId === userId);
      if (user) {
        setResidents(prev => prev.map(resident => 
          resident.id === user.id ? { ...resident, ...userData, lastUpdated: new Date().toISOString() } : resident
        ));
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [users]);

  const processPendingSignup = useCallback(async (signupId, action, notes = '', reason = '') => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingSignups(prev => prev.map(signup => 
        signup.id === signupId 
          ? { 
              ...signup, 
              status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'under_review',
              verificationNotes: notes,
              processedDate: new Date().toISOString()
            }
          : signup
      ));
      
      // If approved, create user account
      if (action === 'approve') {
        const signup = pendingSignups.find(s => s.id === signupId);
        if (signup) {
          // TODO : Call API to create user account
          console.log('Creating new user account for:', signup.email);
        }
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [pendingSignups]);

  const suspendUser = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(user => 
        user.userId === userId 
          ? { ...user, accountStatus: 'suspended', lastUpdated: new Date().toISOString() }
          : user
      ));
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetUserPassword = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In real implementation, this would send password reset email
      console.log('Password reset email sent for user:', userId);
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtering functions
  const getFilteredResidents = useCallback(() => {
    return residents.filter(resident => {
      const matchesSearch = 
        resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.occupation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        filterStatus === 'all' || resident.accountStatus === filterStatus;

      const matchesAge = 
        filterAge === 'all' ||
        (filterAge === 'minor' && resident.age < 18) ||
        (filterAge === 'adult' && resident.age >= 18 && resident.age < 60) ||
        (filterAge === 'senior' && resident.age >= 60);

      const matchesGender = 
        filterGender === 'all' || resident.gender === filterGender;

      return matchesSearch && matchesStatus && matchesAge && matchesGender;
    });
  }, [residents, searchTerm, filterStatus, filterAge, filterGender]);

  const getFilteredUsers = useCallback(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        filterStatus === 'all' || user.accountStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, filterStatus]);

  const getFilteredPendingSignups = useCallback(() => {
    return pendingSignups.filter(signup => {
      const matchesSearch = 
        signup.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signup.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signup.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        filterStatus === 'all' || signup.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [pendingSignups, searchTerm, filterStatus]);

  // Statistics
  const getStats = useCallback(() => {
    const totalResidents = residents.length;
    const registeredUsers = users.length;
    const pendingApprovals = pendingSignups.filter(p => p.status === 'pending_approval').length;
    const seniorCitizens = residents.filter(r => r.isSenior).length;

    return [
      {
        title: 'Total Residents',
        value: totalResidents,
        description: 'All barangay residents',
        icon: 'Users',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20'
      },
      {
        title: 'Registered Users',
        value: registeredUsers,
        description: 'Residents with accounts',
        icon: 'UserCheck',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20'
      },
      {
        title: 'Pending Signups',
        value: pendingApprovals,
        description: 'Awaiting approval',
        icon: 'UserPlus',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20'
      },
      {
        title: 'Senior Citizens',
        value: seniorCitizens,
        description: '60+ years old',
        icon: 'Heart',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20'
      }
    ];
  }, [residents, users, pendingSignups]);

  // Utility functions
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Initialize data
  useEffect(() => {
    fetchResidents();
    fetchPendingSignups();
  }, [fetchResidents, fetchPendingSignups]);

  return {
    // Data
    residents: getFilteredResidents(),
    users: getFilteredUsers(),
    pendingSignups: getFilteredPendingSignups(),
    stats: getStats(),
    
    // State
    isLoading,
    error,
    searchTerm,
    filterStatus,
    filterAge,
    filterGender,
    activeTab,
    
    // Actions
    setSearchTerm,
    setFilterStatus,
    setFilterAge,
    setFilterGender,
    setActiveTab,
    
    // CRUD Operations
    createResident,
    updateResident,
    deleteResident,
    updateUser,
    processPendingSignup,
    suspendUser,
    resetUserPassword,
    
    // Refresh
    refreshData: () => {
      fetchResidents();
      fetchPendingSignups();
    }
  };
};