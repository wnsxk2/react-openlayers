import axios, { isAxiosError } from 'axios';
import type { RequestLogin } from '@/entities/auth/model/types';
import type { ApiResponse } from '@/shared/types';

export interface PostLogin {
  id: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

async function postLogin(body: RequestLogin): Promise<PostLogin> {
  try {
    const response = await axios.post<ApiResponse<PostLogin>>(
      '/api/v1/auth/login',
      body
    );

    if (!response.data.success) {
      throw new Error(
        response.data.error?.message || 'API 요청 처리 중 에러가 발생했습니다.'
      );
    }

    return response.data.data!;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.error.message ||
          'API 요청 처리 중 에러가 발생했습니다.'
      );
    } else {
      throw error;
    }
  }
}

export { postLogin };
