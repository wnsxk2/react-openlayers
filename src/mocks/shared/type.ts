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
