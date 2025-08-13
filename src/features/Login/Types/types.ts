// 요청 타입
export interface LoginRequest {
  id: string;
  password: string;
}

// 응답 타입
export interface LoginSuccessResponse {
  success: true;
  data: {
    id: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface LoginErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
