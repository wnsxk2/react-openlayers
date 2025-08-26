import axios from 'axios';
import {
  type IdCheckRequest,
  type IdCheckResponse,
  type SignUpSuccessResponse,
  type SignUpRequest,
  type ApiErrorResponse,
} from 'entities/sign-up';

export const signUpApi = {
  idCheck: async (request: IdCheckRequest): Promise<IdCheckResponse> => {
    try {
      const response = await axios.post<IdCheckResponse>(
        '/api/v1/auth/id',
        request
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  },

  signUp: async (request: SignUpRequest): Promise<SignUpSuccessResponse> => {
    try {
      const response = await axios.post<SignUpSuccessResponse>(
        '/api/v1/auth/signup',
        request
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiErrorResponse;
      }
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  },
};
