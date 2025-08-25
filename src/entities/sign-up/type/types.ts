export type IdCheckRequest = {
  id: string;
};

export type IdCheckResponse = {
  success: true;
  data: {
    id: string;
    message: string;
    available: boolean;
  };
};

export type SignUpRequest = {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
};

export type SignUpSuccessResponse = {
  success: true;
  data: {
    id: string;
    username: string;
  };
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};