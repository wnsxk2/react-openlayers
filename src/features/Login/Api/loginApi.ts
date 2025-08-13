import axios from 'axios';
import {
  type LoginRequest,
  type LoginSuccessResponse,
  type LoginErrorResponse,
} from '../Types/types';

export const loginApi = {
  login: async (credentials: LoginRequest): Promise<LoginSuccessResponse> => {
    try {
      const response = await axios.post<LoginSuccessResponse>(
        '/api/v1/auth/login',
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as LoginErrorResponse; // LoginErrorResponse 형태로 throw
      }
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  },
};
