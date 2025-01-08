import axios from 'axios';
import { apiURL } from '@/utils/baseurl';
interface LoginResponse {
  token?: string;
  message?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      apiURL+'auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || 'Login failed' };
    } else {
      return { message: 'An error occurred while logging in.' };
    }
  }
};
