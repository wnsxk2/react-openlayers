// Types
export type ResponseDTO<T> = {
  success: boolean;
  data: T;
};

export type ErrorResponseDTO = {
  success: boolean;
  error: {
    message: string;
    code?: number;
  };
};

export type Signup = {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
};

export type Login = {
  id: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
