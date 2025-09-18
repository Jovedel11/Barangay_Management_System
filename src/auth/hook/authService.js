import supabase from "@/lib/supabaseClient";

export const authService = {
  async signUpWithEmail(userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify/email`,
        }
      });

      if (error) throw error;

      return {
        success: true,
        data: data.user,
        message: 'Please check your email to verify your account.'
      };

    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: error.message || 'Failed to create account',
        message: 'Sign up failed. Please try again.'
      };
    }
  },

  async verifyEmail(token) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Email verified successfully. You can now complete your profile.'
      };

    } catch (error) {
      console.error("Email verification error:", error);
      return {
        success: false,
        error: error.message || 'Email verification failed',
        message: 'Verification failed. Please request a new verification email.'
      };
    }
  },

  async loginWithEmailPassword(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Login successful.'
      };

    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || 'Login failed',
        message: 'Invalid email or password. Please try again.'
      };
    }
  },


  async loginWithEmailOtp(email) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-otp`,
        }
      });

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'OTP sent to your email. Please check your inbox.'
      };

    } catch (error) {
      console.error("OTP send error:", error);
      return {
        success: false,
        error: error.message || 'Failed to send OTP',
        message: 'Could not send OTP. Please try again.'
      };
    }
  },

  async verifyOtp(email, code) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'OTP verified successfully.'
      };

    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        error: error.message || 'OTP verification failed',
        message: 'Invalid or expired OTP. Please try again.'
      };
    }
  },

  async createProfile(profileData) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase.rpc('create_user_profile', {
        user_id: session.user.id,
        user_email: session.user.email,
        profile_data: profileData
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to create profile');
      }

      return {
        success: true,
        data,
        message: 'Profile created successfully. Your account is now pending admin approval.'
      };

    } catch (error) {
      console.error("Create profile error:", error);
      return {
        success: false,
        error: error.message || 'Failed to create profile',
        message: 'Could not create profile. Please try again.'
      };
    }
  },

  async getCurrentUser() {
    try {
      const { data, error } = await supabase.rpc('get_current_user');

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to load user data');
      }

      return {
        success: true,
        data: {
          user: data.user,
          profile: data.profile
        }
      };

    } catch (error) {
      console.error("Get current user error:", error);
      return {
        success: false,
        error: error.message || 'Failed to load user data'
      };
    }
  },

  async updateProfile(updates) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', session.user.id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Profile updated successfully.'
      };

    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        error: error.message || 'Failed to update profile',
        message: 'Could not update profile. Please try again.'
      };
    }
  },

  async logOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { 
        success: true, 
        message: 'Logged out successfully.' 
      };

    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: error.message || 'Logout failed',
        message: 'Could not log out. Please try again.'
      };
    }
  },

  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      return {
        success: true,
        data
      };

    } catch (error) {
      console.error("Refresh session error:", error);
      return {
        success: false,
        error: error.message || 'Failed to refresh session'
      };
    }
  },

  // admin functions
  async approveUser(userId) {
    try {
      const { data, error } = await supabase.rpc('approve_user', {
        target_user_id: userId
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to approve user');
      }

      return {
        success: true,
        data,
        message: 'User approved successfully.'
      };

    } catch (error) {
      console.error("Approve user error:", error);
      return {
        success: false,
        error: error.message || 'Failed to approve user',
        message: 'Could not approve user. Please try again.'
      };
    }
  },

  async rejectUser(userId, reason = null) {
    try {
      const { data, error } = await supabase.rpc('reject_user', {
        target_user_id: userId,
        reason: reason
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to reject user');
      }

      return {
        success: true,
        data,
        message: 'User rejected successfully.'
      };

    } catch (error) {
      console.error("Reject user error:", error);
      return {
        success: false,
        error: error.message || 'Failed to reject user',
        message: 'Could not reject user. Please try again.'
      };
    }
  },

  async getPendingUsers() {
    try {
      const { data, error } = await supabase.rpc('get_pending_users');

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch pending users');
      }

      return {
        success: true,
        data: data.data
      };

    } catch (error) {
      console.error("Get pending users error:", error);
      return {
        success: false,
        error: error.message || 'Failed to fetch pending users'
      };
    }
  }
};