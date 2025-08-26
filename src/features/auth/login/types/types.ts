export type LoginRequest = {
  id: string;
  password: string;
};

export type LoginSuccessResponse = {
  success: true;
  data: {
    id: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type LoginErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};