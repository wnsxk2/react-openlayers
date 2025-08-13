export interface IdCheckRequest {
  id: string;
}

export interface IdCheckResponse {
  success: true;
  data: {
    id: string;
    message: string;
    available: boolean;
  };
}

export interface SignUpRequest {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
}

export interface SignUpSuccessResponse {
  success: true;
  data: {
    id: string;
    username: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
