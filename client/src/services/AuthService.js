import { AppState } from "@/AppState";
import { api } from "@/services/AxiosService";
import { bucketService } from "./BucketService.js";

export const checkAuthentication = async () => {
  // Check if token exists in localStorage
  const token = sessionStorage.getItem('auth_token');

  if (token) {
    // Set the token in the AppState
    AppState.auth_token = token;
    // AppState.isAuthenticated = true;

    // Optionally, try to fetch the user profile to validate the token
    try {
      const res = await api.get('api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      AppState.account = res.data;
      await bucketService.getBuckets()
    } catch (error) {
      // If the token is invalid or expired, log out
      console.error('Token validation failed:', error);
      logout();
    }
  }
  const logout = () => {
    // Clear the auth token from localStorage and AppState
    sessionStorage.removeItem('auth_token');
    AppState.auth_token = null;
    AppState.account = null;
  }
};